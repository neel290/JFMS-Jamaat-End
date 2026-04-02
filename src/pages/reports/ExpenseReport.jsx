import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IndianRupee, TrendingDown } from 'lucide-react';

const data = [
  { category: 'Maintenance', amount: 85000 },
  { category: 'Salaries', amount: 120000 },
  { category: 'Utilities', amount: 35000 },
  { category: 'Vendor Payments', amount: 95000 },
  { category: 'Dawat Remittance', amount: 50000 },
  { category: 'Petty Cash', amount: 12000 },
];
const total = data.reduce((s, d) => s + d.amount, 0);

export default function ExpenseReport() {
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Expense Report</h1><p className="page-subtitle">Category-wise expense breakdown for current fiscal year</p></div></div>

    <div className="stat-cards" style={{gridTemplateColumns:'repeat(3,1fr)', marginBottom:24}}>
      <div className="stat-card"><div className="stat-icon red"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Total Expenses</div><div className="stat-value">₹{total.toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className="stat-icon amber"><TrendingDown size={20}/></div><div className="stat-content"><div className="stat-label">Largest Category</div><div className="stat-value">Salaries</div></div></div>
      <div className="stat-card"><div className="stat-icon blue"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Avg Monthly</div><div className="stat-value">₹{Math.round(total/6).toLocaleString('en-IN')}</div></div></div>
    </div>

    <div className="grid-2">
      <div className="chart-container"><div className="chart-header"><span className="chart-title">Expense by Category</span></div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
            <XAxis type="number" tickFormatter={v=>"₹"+(v/1000)+"k"}/><YAxis dataKey="category" type="category" width={120} tick={{fontSize:12}}/>
            <Tooltip formatter={v=>"₹"+v.toLocaleString('en-IN')}/><Bar dataKey="amount" fill="#DC2626" radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="card"><h3 className="card-title" style={{marginBottom:16}}>Detailed Breakdown</h3>
        {data.map(d => (<div key={d.category} style={{display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid var(--gray-100)'}}>
          <span style={{fontSize:'0.875rem'}}>{d.category}</span><span style={{fontWeight:600, fontSize:'0.875rem'}}>₹{d.amount.toLocaleString('en-IN')}</span>
        </div>))}
        <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0', fontWeight:700}}><span>Grand Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
      </div>
    </div>
  </div>);
}