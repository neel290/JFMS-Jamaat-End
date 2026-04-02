import { Check, X, Eye } from 'lucide-react';
export default function PaymentApproval() {
  const items = [['PAY-2026-0089','Ahmed Electricals','Masjid Maintenance','₹45,000','₹44,550','Bank Transfer','Taher Bhai','01-Apr-2026'],['PAY-2026-0090','Star Caterers','Catering — Niyaz','₹28,000','₹28,000','Cheque','Burhanuddin','01-Apr-2026']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Payment Approval Queue</h1><p className="page-subtitle">Approve or reject pending payment requests</p></div></div>
    <div className="data-table-wrapper"><table className="data-table">
      <thead><tr><th>Voucher</th><th>Vendor</th><th>Head</th><th>Gross</th><th>Net</th><th>Mode</th><th>Requested By</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>{items.map(([v,vn,h,g,n,m,u,d],i)=>(<tr key={i}><td style={{fontSize:'0.8125rem',fontWeight:600}}>{v}</td><td>{vn}</td><td>{h}</td><td>{g}</td><td style={{fontWeight:600}}>{n}</td><td>{m}</td><td>{u}</td><td>{d}</td><td style={{display:'flex',gap:4}}><button className="btn btn-ghost btn-sm"><Eye size={14}/></button><button className="btn btn-success btn-sm"><Check size={14}/></button><button className="btn btn-danger btn-sm"><X size={14}/></button></td></tr>))}</tbody>
    </table></div>
  </div>);
}