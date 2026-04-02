import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function DawatPayment() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Payment to Dawat</h1><p className="page-subtitle">Dawat organization payments and remittances</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Dawat Entity <span className="required">*</span></label><select className="form-input form-select"><option value="">Select entity...</option><option>Dawat-e-Hadiyah (Central)</option><option>Aljamea-tus-Saifiyah</option><option>Saifee Mahal</option></select></div>
      <div className="form-group"><label className="form-label">Payment Purpose <span className="required">*</span></label><select className="form-input form-select"><option>Wajebaat Remittance</option><option>Nazraan</option><option>Special Contribution</option><option>Annual Dues</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Reference Period</label><select className="form-input form-select"><option>Q4 — Jan-Mar 2026</option><option>Q3 — Oct-Dec 2025</option></select></div></div>
      <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer (NEFT/RTGS)</option><option>Cheque</option></select></div>
      <div className="form-group"><label className="form-label">Bank Account</label><select className="form-input form-select"><option>SBI ****4521 (Current)</option></select></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Dawat payment submitted for Secretary approval.')}>Submit for Approval</button>
    </div>
  </div>);
}