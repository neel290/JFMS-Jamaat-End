import { Check, X, Eye } from 'lucide-react';
export default function SuspenseManagement() {
  const items = [['IMPS/2026/03/112233','30-Mar-2026','₹8,200','SBI ****4521','Unmatched bank credit — no corresponding income entry found'],['NEFT/2026/03/445566','28-Mar-2026','₹3,000','BOB ****7890','Partial match — amount mismatch with REC-2026-0440']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Suspense Entry Management</h1><p className="page-subtitle">Unmatched bank credits awaiting resolution</p></div></div>
    <div className="stat-cards" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
      <div className="stat-card"><div className="stat-icon amber"><span style={{fontWeight:700}}>2</span></div><div className="stat-content"><div className="stat-label">Pending Suspense</div><div className="stat-value">₹11,200</div></div></div>
      <div className="stat-card"><div className="stat-icon green"><span style={{fontWeight:700}}>8</span></div><div className="stat-content"><div className="stat-label">Resolved This Month</div><div className="stat-value">₹42,500</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><span style={{fontWeight:700}}>0</span></div><div className="stat-content"><div className="stat-label">Aged (30+ days)</div><div className="stat-value">₹0</div></div></div>
    </div>
    <div className="data-table-wrapper"><table className="data-table"><thead><tr><th>Bank Reference</th><th>Date</th><th>Amount</th><th>Bank</th><th>Reason</th><th>Actions</th></tr></thead>
      <tbody>{items.map(([ref,dt,amt,bank,reason],i)=>(<tr key={i}><td style={{fontWeight:600,fontSize:'0.8125rem'}}>{ref}</td><td>{dt}</td><td style={{fontWeight:600}}>{amt}</td><td>{bank}</td><td style={{fontSize:'0.8125rem',color:'var(--gray-500)'}}>{reason}</td><td style={{display:'flex',gap:4}}><button className="btn btn-success btn-sm"><Check size={14}/> Resolve</button><button className="btn btn-ghost btn-sm"><Eye size={14}/></button></td></tr>))}</tbody>
    </table></div>
  </div>);
}