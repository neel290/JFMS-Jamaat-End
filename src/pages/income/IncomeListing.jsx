import { Search, Filter, Download, History } from 'lucide-react';
export default function IncomeListing() {
  const entries = [['01-Apr-2026','101','30410123','Shabbir Bhai','Wajebaat','₹15,000','UPI','REC-2026-0451','Confirmed'],['01-Apr-2026','102','30410456','Mustafa Bhai','Fitra','₹5,000','Cash','REC-2026-0452','Confirmed'],['31-Mar-2026','103','30410789','Yusuf Bhai','Zakat','₹25,000','Cheque','REC-2026-0450','Confirmed'],['31-Mar-2026','104','30411012','Hatim Bhai','Niyaz','₹2,000','Cash','REC-2026-0449','Confirmed'],['30-Mar-2026','105','30411345','Juzer Bhai','Wajebaat','₹10,000','Bank Transfer','REC-2026-0448','Confirmed'],['30-Mar-2026','107','30411901','Taiyeb Bhai','Sabeel','₹3,500','UPI','REC-2026-0447','Pending']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income Listing</h1><p className="page-subtitle">All income entries recorded</p></div></div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search by Sabeel, ITS, Receipt No..."/></div><button className="filter-btn"><Filter size={14}/> Date Range</button><button className="filter-btn"><Filter size={14}/> Purpose</button><button className="filter-btn"><Filter size={14}/> Mode</button><div style={{marginLeft:'auto',display:'flex',gap:8}}><button className="btn btn-secondary btn-sm"><History size={16}/></button><button className="btn btn-secondary btn-sm"><Download size={14}/> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Date</th><th>Sabeel</th><th>ITS</th><th>Name</th><th>Purpose</th><th>Amount</th><th>Mode</th><th>Receipt</th><th>Status</th></tr></thead>
        <tbody>{entries.map(([dt,sn,its,nm,p,a,m,r,s],i)=>(<tr key={i} className="clickable"><td>{dt}</td><td style={{fontWeight:600}}>{sn}</td><td>{its}</td><td>{nm}</td><td>{p}</td><td style={{fontWeight:600}}>{a}</td><td>{m}</td><td style={{fontSize:'0.8125rem'}}>{r}</td><td><span className={'badge badge-'+(s==='Confirmed'?'approved':'pending')}>{s}</span></td></tr>))}</tbody>
      </table><div className="table-pagination"><span>Showing 1-6 of 6</span><span>Page 1 of 1</span></div>
    </div>
  </div>);
}