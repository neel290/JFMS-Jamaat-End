import { Check, X } from 'lucide-react';
export default function TakhmeenApproval() {
  const items = [['Group','New Members 1445H — 8 Sabeels','Taher Bhai','30-Mar-2026'],['Override','Sabeel 101 — Wajebaat → ₹35,000','Taher Bhai','31-Mar-2026'],['Override','Sabeel 105 — Added Niyaz purpose','Burhanuddin','01-Apr-2026']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Takhmeen Approval Queue</h1><p className="page-subtitle">Approve or reject pending changes</p></div></div>
    <div className="data-table-wrapper"><table className="data-table">
      <thead><tr><th>Type</th><th>Details</th><th>Submitted By</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>{items.map(([t,d,u,dt],i)=>(<tr key={i}><td><span className="badge badge-draft">{t}</span></td><td style={{fontSize:'0.875rem'}}>{d}</td><td>{u}</td><td>{dt}</td><td style={{display:'flex',gap:8}}><button className="btn btn-success btn-sm"><Check size={14}/> Approve</button><button className="btn btn-danger btn-sm"><X size={14}/> Reject</button></td></tr>))}</tbody>
    </table></div>
  </div>);
}