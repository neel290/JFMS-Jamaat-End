import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function TakhmeenIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Record Takhmeen Payment</h1><p className="page-subtitle">Search Sabeel and record Takhmeen contribution</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Search Sabeel No or ITS ID <span className="required">*</span></label><input className="form-input" defaultValue="101" placeholder="Enter Sabeel No or ITS ID..."/></div>
      <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:20}}><h4 style={{marginBottom:4}}>Shabbir Bhai Cyclewala</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Sabeel: 101 · ITS: 30410123 · Mauze: Dholka</p></div>
      <h4 style={{marginBottom:12}}>Outstanding Takhmeen Purposes</h4>
      {[['Wajebaat','₹30,000','₹15,000','₹15,000',true],['Fitra','₹5,000','₹0','₹5,000',false],['Zakat','₹15,000','₹15,000','₹0',false]].map(([pu,as,pd,due,chk],i)=>(
        <label key={i} className="form-checkbox" style={{padding:12,marginBottom:8,background:'var(--gray-50)',borderRadius:'var(--radius-md)',display:'flex',gap:12}}>
          <input type="checkbox" defaultChecked={chk}/><div style={{flex:1}}><div style={{fontWeight:600}}>{pu}</div><div style={{fontSize:'0.75rem',color:'var(--gray-500)'}}>Assigned: {as} · Paid: {pd} · Due: {due}</div></div>
        </label>
      ))}
      <div className="form-row" style={{marginTop:16}}><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" defaultValue="15,000"/></div><div className="form-group"><label className="form-label">Payment Mode <span className="required">*</span></label><select className="form-input form-select"><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option></select></div></div>
      <div style={{background:'var(--gray-50)',padding:12,borderRadius:'var(--radius-md)',marginBottom:16,fontSize:'0.8125rem'}}><strong>Mapped Bank:</strong> State Bank of India ****4521</div>
      <label className="form-checkbox" style={{marginBottom:16}}><input type="checkbox" defaultChecked/> Generate Receipt</label>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Entry saved. Receipt REC-2026-0453 generated.')}>Save Entry</button>
    </div>
  </div>);
}