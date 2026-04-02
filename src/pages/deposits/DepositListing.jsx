import { Search, Filter, Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function DepositListing() {
  const navigate = useNavigate();
  const deposits = [['01-Apr','DEP-2026-0034','SBI ****4521','₹65,000','Cash Deposit','Confirmed'],['31-Mar','DEP-2026-0033','BOB ****7890','₹42,500','Cheque Deposit','Confirmed'],['28-Mar','DEP-2026-0032','SBI ****4521','₹28,000','Cash Deposit','Confirmed'],['25-Mar','DEP-2026-0031','SBI ****4521','₹55,000','Cash + Cheque','Confirmed']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Deposits Listing</h1><p className="page-subtitle">All deposit slips</p></div>
      <div className="page-actions"><button className="btn btn-primary" onClick={()=>navigate('/deposits/entry')}><Plus size={16}/> New Deposit</button></div></div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search..."/></div><button className="filter-btn"><Filter size={14}/> Bank</button><div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14}/> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Date</th><th>Slip No</th><th>Bank Account</th><th>Amount</th><th>Mode</th><th>Status</th></tr></thead>
        <tbody>{deposits.map(([dt,s,b,a,m,st],i)=>(<tr key={i}><td>{dt}</td><td style={{fontWeight:600}}>{s}</td><td>{b}</td><td style={{fontWeight:600}}>{a}</td><td>{m}</td><td><span className="badge badge-approved">{st}</span></td></tr>))}</tbody>
      </table>
    </div>
  </div>);
}