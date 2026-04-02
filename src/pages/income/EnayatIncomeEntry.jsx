import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function EnayatIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Enayat Income</h1><p className="page-subtitle">Record income from Enayat organizations</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Enayat Organization <span className="required">*</span></label><select className="form-input form-select"><option value="">Select organization...</option><option>Saifee Burhani Upliftment Trust</option><option>Burhani Foundation</option><option>Dawat-e-Hadiyah</option></select></div>
      <div className="form-group"><label className="form-label">Enayat Type <span className="required">*</span></label><select className="form-input form-select"><option>Monthly Enayat</option><option>Special Enayat</option><option>Project Enayat</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Period</label><select className="form-input form-select"><option>Apr 2026</option><option>Mar 2026</option><option>Feb 2026</option></select></div></div>
      <div className="form-group"><label className="form-label">Reference No</label><input className="form-input" placeholder="Enayat reference number"/></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Enayat income recorded.')}>Save Entry</button>
    </div>
  </div>);
}