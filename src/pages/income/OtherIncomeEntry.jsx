import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function OtherIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Other Income</h1><p className="page-subtitle">Miscellaneous income not covered under other categories</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Income Category <span className="required">*</span></label><select className="form-input form-select"><option value="">Select category...</option><option>Interest Income</option><option>Masjid Donation Box</option><option>Scrap Sale</option><option>Insurance Claim</option><option>Miscellaneous</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Cash</option><option>UPI</option><option>Bank Transfer</option></select></div><div className="form-group"><label className="form-label">Received From</label><input className="form-input" placeholder="Payer name (if applicable)"/></div></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Other income recorded.')}>Save Entry</button>
    </div>
  </div>);
}