import React from 'react';
import { useStore } from '../../store/useStore';
import { TrendingUp, TrendingDown, IndianRupee, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OperationalDashboard() {
  const navigate = useNavigate();
  const { currentUser, currentEnv, receipts, payments, banks } = useStore();

  const incomeTotal = receipts.reduce((sum, r) => sum + r.total, 0);
  const expenseTotal = payments.filter(p => p.status === 'Processed').reduce((sum, p) => sum + p.amount, 0);
  
  const sbiBank = banks.find(b => b.id === 'B1');
  const hdfcBank = banks.find(b => b.id === 'B2'); // Corpus

  const cashFlow = incomeTotal - expenseTotal;
  const tdsLiability = payments.reduce((sum, p) => sum + (p.tdsAmount || 0), 0);

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

      <div className="grid-2" style={{ marginTop: 24 }}>
         <div className="card">
            <h3 className="card-title" style={{marginBottom: 16}}>Quick Actions</h3>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
               <button className="btn btn-secondary" style={{justifyContent:'flex-start', padding: 12}} onClick={() => navigate('/income')}><span style={{background:'var(--env-color-light)', color:'var(--env-color)', padding: 8, borderRadius: 8}}>➕</span> Record Income</button>
               <button className="btn btn-secondary" style={{justifyContent:'flex-start', padding: 12}} onClick={() => navigate('/payments/vendor')}><span style={{background:'var(--color-warning-light)', color:'var(--color-warning)', padding: 8, borderRadius: 8}}>📤</span> Make Payment</button>
               <button className="btn btn-secondary" style={{justifyContent:'flex-start', padding: 12}} onClick={() => navigate('/journal/entry')}><span style={{background:'var(--color-info-light)', color:'var(--color-info)', padding: 8, borderRadius: 8}}>📝</span> Journal Entry</button>
               <button className="btn btn-secondary" style={{justifyContent:'flex-start', padding: 12}} onClick={() => navigate('/deposits/entry')}><span style={{background:'var(--color-success-light)', color:'var(--color-success)', padding: 8, borderRadius: 8}}>🏦</span> Record Deposit</button>
            </div>
         </div>
         <div className="card">
            <h3 className="card-title" style={{marginBottom: 16}}>Recent Activity</h3>
            <div style={{display:'flex', flexDirection:'column', gap: 16}}>
               <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid var(--gray-100)', paddingBottom: 12}}>
                 <div><div style={{fontWeight:500}}>Income Receipt REC-0453</div><div style={{fontSize:'0.75rem', color:'var(--gray-500)'}}>Shabbir Bhai Cyclewala</div></div>
                 <div style={{fontWeight:600, color:'var(--color-success)'}}>+₹20,000</div>
               </div>
               <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid var(--gray-100)', paddingBottom: 12}}>
                 <div><div style={{fontWeight:500}}>Vendor Payment VP-112</div><div style={{fontSize:'0.75rem', color:'var(--gray-500)'}}>A1 Catering Services</div></div>
                 <div style={{fontWeight:600, color:'var(--color-error)'}}>-₹45,000</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
