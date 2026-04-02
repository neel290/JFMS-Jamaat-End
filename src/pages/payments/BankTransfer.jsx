import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function BankTransfer() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Bank to Bank Transfer</h1><p className="page-subtitle">Transfer funds between Jamaat bank accounts</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group"><label className="form-label">From Account <span className="required">*</span></label><select className="form-input form-select"><option>SBI ****4521 (Current) — Balance: ₹12,45,678</option><option>BOB ****7890 (Savings) — Balance: ₹8,32,450</option></select></div>
      <div className="form-group"><label className="form-label">To Account <span className="required">*</span></label><select className="form-input form-select"><option>BOB ****7890 (Savings) — Balance: ₹8,32,450</option><option>SBI ****4521 (Current) — Balance: ₹12,45,678</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Transfer Amount <span className="required">*</span></label><input className="form-input" placeholder="₹"/></div><div className="form-group"><label className="form-label">Transfer Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-group"><label className="form-label">Transfer Mode</label><select className="form-input form-select"><option>NEFT</option><option>RTGS</option><option>IMPS</option></select></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2} placeholder="Reason for transfer..."/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Bank transfer submitted for approval.')}>Submit Transfer</button>
    </div>
  </div>);
}