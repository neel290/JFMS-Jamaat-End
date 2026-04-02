import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
export default function DepositEntry() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Record Deposit</h1><p className="page-subtitle">Create a bank deposit slip</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group"><label className="form-label">Bank Account <span className="required">*</span></label><select className="form-input form-select"><option>SBI ****4521 (Current)</option><option>BOB ****7890 (Savings)</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Deposit Amount <span className="required">*</span></label><input className="form-input" placeholder="₹"/></div><div className="form-group"><label className="form-label">Deposit Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-group"><label className="form-label">Deposit Mode</label><select className="form-input form-select"><option>Cash Deposit</option><option>Cheque Deposit</option><option>DD Deposit</option></select></div>
      <div className="form-group"><label className="form-label">Reference / Slip No</label><input className="form-input" placeholder="Bank deposit slip number"/></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <div style={{display:'flex',gap:12}}><button className="btn btn-secondary" onClick={()=>navigate('/deposits')}>Cancel</button><button className="btn btn-primary" onClick={()=>{setToast('Deposit recorded: DEP-2026-0034');setTimeout(()=>navigate('/deposits'),1500)}}>Save Deposit</button></div>
    </div>
  </div>);
}