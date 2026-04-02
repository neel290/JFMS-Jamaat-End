import { Search, Filter, Download } from 'lucide-react';
export default function PaymentListing() {
  const payments = [['01-Apr','PAY-2026-0088','Bohra Plumbing','Plumbing','₹12,000','₹12,000','Bank Transfer','Approved'],['31-Mar','PAY-2026-0087','Green Landscaping','Landscaping','₹8,500','₹8,500','Cheque','Approved'],['30-Mar','PAY-2026-0086','Ahmed Electricals','Electrical Work','₹25,000','₹24,750','NEFT','Approved'],['28-Mar','PAY-2026-0085','Star Caterers','Niyaz Catering','₹45,000','₹45,000','Bank Transfer','Approved'],['25-Mar','PAY-2026-0084','Salary — Staff','Salary','₹1,20,000','₹1,08,000','NEFT','Processed']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">All Payments</h1><p className="page-subtitle">Complete payment records</p></div></div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search by voucher, vendor..."/></div><button className="filter-btn"><Filter size={14}/> Date</button><button className="filter-btn"><Filter size={14}/> Type</button><div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14}/> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Date</th><th>Voucher</th><th>Payee</th><th>Head</th><th>Gross</th><th>Net</th><th>Mode</th><th>Status</th></tr></thead>
        <tbody>{payments.map(([dt,v,p,h,g,n,m,s],i)=>(<tr key={i}><td>{dt}</td><td style={{fontWeight:600,fontSize:'0.8125rem'}}>{v}</td><td>{p}</td><td>{h}</td><td>{g}</td><td style={{fontWeight:600}}>{n}</td><td>{m}</td><td><span className="badge badge-approved">{s}</span></td></tr>))}</tbody>
      </table><div className="table-pagination"><span>Showing 1-5 of 5</span><span>Page 1 of 1</span></div>
    </div>
  </div>);
}