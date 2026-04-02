import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function OrgIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Organization Income</h1><p className="page-subtitle">Record income from organizations and trusts</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Organization Name <span className="required">*</span></label><select className="form-input form-select"><option value="">Select organization...</option><option>Burhani Charitable Trust</option><option>Saifee Hospital Trust</option><option>Burhani Foundation</option><option>Aljamea-tus-Saifiyah</option></select></div>
      <div className="form-group"><label className="form-label">Income Purpose <span className="required">*</span></label><select className="form-input form-select"><option value="">Select purpose...</option><option>Annual Grant</option><option>Project Funding</option><option>Event Sponsorship</option><option>Miscellaneous</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Reference No</label><input className="form-input" placeholder="Transfer reference"/></div><div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer</option><option>Cheque</option><option>DD</option></select></div></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Organization income recorded successfully.')}>Save Entry</button>
    </div>
  </div>);
}