import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, IndianRupee, Clock, AlertTriangle, FileText, Landmark, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#0B6E4F', '#14A76C', '#2563EB', '#D97706'];

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, currentEnv, receipts, payments, banks, takhmeenGroups, takhmeens, deposits, suspense } = useStore();

  // Basic derivation logic for Prototype Demo 
  // (In real app, we would use Date filtering. Here we simulate using all records for visuals)
  const incomeTotal = receipts.reduce((sum, r) => sum + r.total, 0);
  const expenseTotal = payments.filter(p => p.status === 'Processed').reduce((sum, p) => sum + p.amount, 0);
  
  const sbiBank = banks.find(b => b.id === 'B1');
  const hdfcBank = banks.find(b => b.id === 'B2'); // Corpus

  const cashFlow = incomeTotal - expenseTotal;
  const tdsLiability = payments.reduce((sum, p) => sum + (p.tdsAmount || 0), 0);
  
  const unreconciledCount = deposits.filter(d => d.status !== 'Reconciled').length + payments.filter(p => p.status === 'Processed' && p.status !== 'Reconciled').length;

  // Collection by Payment Mode Pie Chart
  const modeData = {};
  receipts.forEach(r => {
     modeData[r.mode] = (modeData[r.mode] || 0) + r.total;
  });
  const pieData = Object.keys(modeData).map(k => ({ name: k, value: modeData[k] }));

  // Build automatic pendency actions
  const pendingActions = [];
  
  const pendingPayments = payments.filter(p => p.status === 'Pending Approval');
  if (pendingPayments.length > 0) {
     pendingActions.push({
        id: 'PA1',
        icon: Clock, color: 'amber', module: 'Payments',
        text: `${pendingPayments.length} vendor payments awaiting execution`,
        onClick: () => navigate('/payments')
     });
  }

  const draftTakhmeens = takhmeens.filter(t => t.status === 'Draft' || t.status === 'Pending Approval');
  if (draftTakhmeens.length > 0) {
     pendingActions.push({
        id: 'PA2',
        icon: FileText, color: 'blue', module: 'Takhmeen',
        text: `${draftTakhmeens.length} Takhmeens awaiting Aamil approval`,
        onClick: () => navigate('/takhmeen/approval')
     });
  }

  const unresolvedSuspense = suspense.filter(s => s.status === 'Unresolved');
  if (unresolvedSuspense.length > 0) {
     pendingActions.push({
        id: 'PA3',
        icon: AlertTriangle, color: 'red', module: 'Compliance',
        text: `${unresolvedSuspense.length} unresolved suspense entries require attention`,
        onClick: () => navigate('/income/suspense')
     });
  }

  // Pre-fill a nice looking bar chart since we only have small amount of mock data
  const monthlyData = [
    { month: 'Oct', income: 285000, expense: 195000 },
    { month: 'Nov', income: 320000, expense: 210000 },
    { month: 'Dec', income: 415000, expense: 280000 },
    { month: 'Jan', income: 350000, expense: 225000 },
    { month: 'Feb', income: 290000, expense: 185000 },
    { month: 'Mar', income: incomeTotal > 200000 ? incomeTotal : 385000, expense: expenseTotal > 150000 ? expenseTotal : 245000 },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Operational Dashboard</h1>
          <p className="page-subtitle">Welcome back, {currentUser?.name}. Live {currentEnv.name} metrics.</p>
        </div>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-icon green"><IndianRupee size={22} /></div>
          <div className="stat-content">
            <div className="stat-label">System Income</div>
            <div className="stat-value">₹{incomeTotal.toLocaleString('en-IN')}</div>
            <div className="stat-trend up"><TrendingUp size={12} /> Syncing live receipts</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><IndianRupee size={22} /></div>
          <div className="stat-content">
            <div className="stat-label">System Expenses</div>
            <div className="stat-value">₹{expenseTotal.toLocaleString('en-IN')}</div>
            <div className="stat-trend down"><TrendingDown size={12} /> Executed payments</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Landmark size={22} /></div>
          <div className="stat-content">
            <div className="stat-label">SBI Balance (General)</div>
            <div className="stat-value">₹{sbiBank?.balance?.toLocaleString('en-IN') || 0}</div>
            <div className="stat-trend" style={{ color: 'var(--gray-500)' }}>{sbiBank?.accountNo}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber"><Landmark size={22} /></div>
          <div className="stat-content">
            <div className="stat-label">HDFC Balance (Corpus)</div>
            <div className="stat-value">₹{hdfcBank?.balance?.toLocaleString('en-IN') || 0}</div>
            <div className="stat-trend" style={{ color: 'var(--red-600)' }}>Corpus Restricted</div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 24, gridTemplateColumns: '2fr 1fr' }}>
        
        <div style={{display:'flex', flexDirection:'column', gap: 24}}>
           {/* CHARTS CONTAINER */}
           <div className="chart-container">
             <div className="chart-header">
               <span className="chart-title">Income vs Expense Trend</span>
             </div>
             <ResponsiveContainer width="100%" height={280}>
               <BarChart data={monthlyData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                 <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                 <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                 <Tooltip formatter={v => `₹${v.toLocaleString('en-IN')}`} />
                 <Bar dataKey="income" fill="var(--color-success)" radius={[4,4,0,0]} name="Income" />
                 <Bar dataKey="expense" fill="var(--color-error)" radius={[4,4,0,0]} name="Expense" />
               </BarChart>
             </ResponsiveContainer>
           </div>
           
           {/* SECONDARY ROW */}
           <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="stat-card" style={{ borderLeft: '3px solid var(--color-success)' }}>
                <div className="stat-content">
                  <div className="stat-label">Net Cash Flow</div>
                  <div className="stat-value" style={{ fontSize: '1.25rem', color: 'var(--color-success)' }}>₹{cashFlow.toLocaleString('en-IN')}</div>
                </div>
              </div>
              <div className="stat-card" style={{ borderLeft: '3px solid var(--color-warning)' }}>
                <div className="stat-content">
                  <div className="stat-label">TDS Pending Remittance</div>
                  <div className="stat-value" style={{ fontSize: '1.25rem', color: 'var(--color-warning)' }}>₹{tdsLiability.toLocaleString('en-IN')}</div>
                </div>
              </div>
              <div className="stat-card" style={{ borderLeft: '3px solid var(--color-error)' }}>
                <div className="stat-content">
                  <div className="stat-label">Unreconciled Bank Lines</div>
                  <div className="stat-value" style={{ fontSize: '1.25rem', color: 'var(--color-error)' }}>{unreconciledCount}</div>
                </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{display:'flex', flexDirection:'column', gap: 24}}>
           {/* PENDING ACTIONS WIDGET */}
           <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
             <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)', background: '#F8FAFC' }}>
               <h3 className="card-title">Pending Action Items</h3>
               <span className="badge badge-pending">{pendingActions.length} Queue</span>
             </div>
             <div>
               {pendingActions.length === 0 ? (
                  <div style={{padding: 40, textAlign:'center', color:'var(--gray-500)'}}>No pending actions. You're all caught up!</div>
               ) : (
                  pendingActions.map((item) => (
                    <div key={item.id} onClick={item.onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--gray-100)', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#F1F5F9'} onMouseOut={e=>e.currentTarget.style.background='white'}>
                      <div className={`stat-icon ${item.color}`} style={{ width: 36, height: 36, flexShrink:0 }}>
                        <item.icon size={18} />
                      </div>
                      <div style={{ flex: 1, display:'flex', flexDirection:'column', gap:4 }}>
                         <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.text}</span>
                         <span style={{ fontSize: '0.75rem', color:'var(--gray-500)' }}>Click to resolve</span>
                      </div>
                      <span className="badge badge-pending" style={{fontSize:'0.65rem'}}>{item.module}</span>
                      <ArrowUpRight size={16} style={{ color: 'var(--gray-400)' }} />
                    </div>
                  ))
               )}
             </div>
           </div>
           
           {/* PIE CHART WIDGET */}
           {pieData.length > 0 && (
             <div className="card">
               <div className="chart-header">
                 <span className="chart-title">Collection by Mode</span>
               </div>
               <ResponsiveContainer width="100%" height={220}>
                 <PieChart>
                   <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" label={false} paddingAngle={2}>
                     {pieData.map((_, index) => (
                       <Cell key={index} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip formatter={v => `₹${v.toLocaleString('en-IN')}`} />
                 </PieChart>
               </ResponsiveContainer>
               <div style={{display:'flex', gap: 8, flexWrap:'wrap', justifyContent:'center'}}>
                  {pieData.map((entry, index) => (
                     <div key={entry.name} style={{display:'flex', alignItems:'center', gap:4, fontSize:'0.75rem'}}>
                        <span style={{display:'inline-block', width:8, height:8, borderRadius:'50%', background:COLORS[index % COLORS.length]}}></span>
                        {entry.name}
                     </div>
                  ))}
               </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
