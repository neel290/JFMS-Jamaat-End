import React from 'react';
import { useStore } from '../../store/useStore';
import { Landmark, IndianRupee, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function BankSummary() {
  const { banks, receipts, payments } = useStore();
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Bank Summary Report</h1><p className="page-subtitle">Consolidated view of all bank account balances and transaction volumes</p></div></div>

    <div className="stat-cards" style={{gridTemplateColumns:'repeat(3,1fr)', marginBottom:24}}>
      <div className="stat-card"><div className="stat-icon blue"><Landmark size={20}/></div><div className="stat-content"><div className="stat-label">Total Accounts</div><div className="stat-value">{banks.length}</div></div></div>
      <div className="stat-card"><div className="stat-icon green"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Aggregate Balance</div><div className="stat-value">₹{banks.reduce((s,b)=>s+b.balance,0).toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className="stat-icon amber"><Landmark size={20}/></div><div className="stat-content"><div className="stat-label">H2H Enabled</div><div className="stat-value">{banks.filter(b=>b.h2hEnabled).length}</div></div></div>
    </div>

    <div className="card" style={{padding:0, overflow:'hidden'}}>
      <div className="data-table-wrapper"><table className="data-table">
        <thead><tr><th>Bank Name</th><th>Account No</th><th>Type</th><th>H2H</th><th style={{textAlign:'right'}}>Current Balance</th><th style={{textAlign:'right'}}>Inflows</th><th style={{textAlign:'right'}}>Outflows</th><th>Status</th></tr></thead>
        <tbody>{banks.map(b => {
          const inflow = receipts.filter(r=>r.bankId===b.id).reduce((s,r)=>s+r.total,0);
          const outflow = payments.filter(p=>p.bankId===b.id && p.status==='Processed').reduce((s,p)=>s+p.amount,0);
          return (<tr key={b.id}>
            <td style={{fontWeight:600}}><Landmark size={14} style={{marginRight:6, verticalAlign:'middle'}}/>{b.name}</td>
            <td>{b.accountNo}</td>
            <td><span className={"badge badge-" + (b.isCorpus ? 'pending' : 'active')}>{b.isCorpus ? 'Corpus' : 'General'}</span></td>
            <td>{b.h2hEnabled ? '✓' : '—'}</td>
            <td style={{textAlign:'right', fontWeight:600}}>₹{b.balance.toLocaleString('en-IN')}</td>
            <td style={{textAlign:'right', color:'var(--green-600)'}}><ArrowDownRight size={12}/> ₹{inflow.toLocaleString('en-IN')}</td>
            <td style={{textAlign:'right', color:'var(--red-600)'}}><ArrowUpRight size={12}/> ₹{outflow.toLocaleString('en-IN')}</td>
            <td><span className="badge badge-active">{b.status}</span></td>
          </tr>);
        })}</tbody>
      </table></div>
    </div>
  </div>);
}