import React from 'react';
import { IndianRupee, TrendingUp, TrendingDown } from 'lucide-react';

const ieData = {
  income: [
    { head: 'Wajebaat - Takhmeen', amount: 485000 },
    { head: 'Fitra Collection', amount: 125000 },
    { head: 'Voluntary Contributions', amount: 75000 },
    { head: 'Organization Income', amount: 35000 },
    { head: 'Interest / Bank Income', amount: 8500 },
  ],
  expense: [
    { head: 'Salaries & Wages', amount: 120000 },
    { head: 'Property Maintenance', amount: 85000 },
    { head: 'Vendor Payments', amount: 95000 },
    { head: 'Utilities (Electricity/Water)', amount: 35000 },
    { head: 'Dawat Remittance', amount: 50000 },
    { head: 'Petty Cash / Miscellaneous', amount: 12000 },
  ]
};
const totalIncome = ieData.income.reduce((s, i) => s + i.amount, 0);
const totalExpense = ieData.expense.reduce((s, i) => s + i.amount, 0);
const surplus = totalIncome - totalExpense;

export default function IEStatement() {
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income & Expenditure Statement</h1><p className="page-subtitle">For the period ending 31-Mar-2026 (Draft)</p></div></div>

    <div className="stat-cards" style={{gridTemplateColumns:'repeat(3,1fr)', marginBottom:24}}>
      <div className="stat-card"><div className="stat-icon green"><TrendingUp size={20}/></div><div className="stat-content"><div className="stat-label">Total Income</div><div className="stat-value">₹{totalIncome.toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><TrendingDown size={20}/></div><div className="stat-content"><div className="stat-label">Total Expenditure</div><div className="stat-value">₹{totalExpense.toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className={"stat-icon " + (surplus >= 0 ? 'green' : 'red')}><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">{surplus >= 0 ? 'Surplus' : 'Deficit'}</div><div className="stat-value">₹{Math.abs(surplus).toLocaleString('en-IN')}</div></div></div>
    </div>

    <div className="grid-2" style={{alignItems:'start'}}>
      <div className="card">
        <h3 className="card-title" style={{marginBottom:16, color:'var(--green-700)'}}>Income</h3>
        {ieData.income.map(i => (<div key={i.head} style={{display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid var(--gray-100)'}}>
          <span style={{fontSize:'0.875rem'}}>{i.head}</span><span style={{fontWeight:600, fontSize:'0.875rem', color:'var(--green-600)'}}>₹{i.amount.toLocaleString('en-IN')}</span>
        </div>))}
        <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0', fontWeight:700, borderTop:'2px solid var(--gray-300)'}}><span>Total Income</span><span style={{color:'var(--green-700)'}}>₹{totalIncome.toLocaleString('en-IN')}</span></div>
      </div>
      <div className="card">
        <h3 className="card-title" style={{marginBottom:16, color:'var(--red-700)'}}>Expenditure</h3>
        {ieData.expense.map(i => (<div key={i.head} style={{display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid var(--gray-100)'}}>
          <span style={{fontSize:'0.875rem'}}>{i.head}</span><span style={{fontWeight:600, fontSize:'0.875rem', color:'var(--red-600)'}}>₹{i.amount.toLocaleString('en-IN')}</span>
        </div>))}
        <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0', fontWeight:700, borderTop:'2px solid var(--gray-300)'}}><span>Total Expenditure</span><span style={{color:'var(--red-700)'}}>₹{totalExpense.toLocaleString('en-IN')}</span></div>
      </div>
    </div>

    <div className="card" style={{marginTop:24, textAlign:'center', padding:24, background: surplus >= 0 ? '#F0FDF4' : '#FEF2F2', border: surplus >= 0 ? '1px solid var(--green-200)' : '1px solid var(--red-200)'}}>
      <h2 style={{color: surplus >= 0 ? 'var(--green-700)' : 'var(--red-700)', marginBottom:4}}>Net {surplus >= 0 ? 'Surplus' : 'Deficit'}: ₹{Math.abs(surplus).toLocaleString('en-IN')}</h2>
      <p style={{fontSize:'0.8125rem', color:'var(--gray-500)'}}>Subject to audit verification</p>
    </div>
  </div>);
}