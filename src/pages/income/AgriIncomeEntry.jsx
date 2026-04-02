import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function AgriIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Agriculture Income</h1><p className="page-subtitle">Income from Jamaat-owned agricultural land</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Land / Property Description <span className="required">*</span></label><select className="form-input form-select"><option value="">Select property...</option><option>Survey No. 123 — Dholka (5 Acres)</option><option>Survey No. 456 — Bavla (3 Acres)</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Season</label><select className="form-input form-select"><option>Kharif 2025-26</option><option>Rabi 2025-26</option></select></div><div className="form-group"><label className="form-label">Crop</label><input className="form-input" placeholder="e.g. Cotton, Wheat"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Income Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer</option><option>Cash</option><option>Cheque</option></select></div></div>
      <div className="form-group"><label className="form-label">Tenant / Buyer Name</label><input className="form-input" placeholder="Name of buyer or lessee"/></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Agriculture income recorded.')}>Save Entry</button>
    </div>
  </div>);
}