import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function PettyCash() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Petty Cash</h1><p className="page-subtitle">Cash withdrawal and replenishment tracking</p></div></div>
    <div className="stat-cards" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
      <div className="stat-card"><div className="stat-icon green"><span style={{fontWeight:700}}>₹</span></div><div className="stat-content"><div className="stat-label">Current Balance</div><div className="stat-value">₹8,500</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><span style={{fontWeight:700}}>₹</span></div><div className="stat-content"><div className="stat-label">Spent This Month</div><div className="stat-value">₹6,500</div></div></div>
      <div className="stat-card"><div className="stat-icon blue"><span style={{fontWeight:700}}>₹</span></div><div className="stat-content"><div className="stat-label">Imprest Limit</div><div className="stat-value">₹15,000</div></div></div>
    </div>
    <div className="grid-2">
      <div className="card"><h4 style={{marginBottom:16}}>Record Petty Cash Expense</h4>
        <div className="form-group"><label className="form-label">Expense Description <span className="required">*</span></label><input className="form-input" placeholder="e.g. Tea for meeting"/></div>
        <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="₹"/></div><div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date"/></div></div>
        <div className="form-group"><label className="form-label">Head</label><select className="form-input form-select"><option>Office Supplies</option><option>Tea/Refreshments</option><option>Transportation</option><option>Miscellaneous</option></select></div>
        <button className="btn btn-primary" onClick={()=>setToast('Petty cash expense of ₹250 recorded.')}>Record Expense</button>
      </div>
      <div className="card"><h4 style={{marginBottom:16}}>Recent Transactions</h4>
        {[['Tea for committee meeting','₹250','01-Apr'],['Courier charges','₹180','31-Mar'],['Stationery purchase','₹450','30-Mar'],['Auto fare — bank visit','₹120','29-Mar'],['Printing charges','₹350','28-Mar']].map(([d,a,dt],i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--gray-100)',fontSize:'0.875rem'}}><span>{d}</span><div><span style={{fontWeight:600,marginRight:12}}>{a}</span><span style={{color:'var(--gray-400)',fontSize:'0.75rem'}}>{dt}</span></div></div>))}
      </div>
    </div>
  </div>);
}