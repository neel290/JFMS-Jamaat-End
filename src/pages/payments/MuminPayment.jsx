import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function MuminPayment() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Payment to Mumineen</h1><p className="page-subtitle">Welfare payments, scholarships, and assistance</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Payment Category <span className="required">*</span></label><select className="form-input form-select"><option value="">Select category...</option><option>Welfare Assistance</option><option>Education Scholarship</option><option>Medical Aid</option><option>Marriage Assistance</option><option>Razaa Disbursement</option></select></div>
      <div className="form-group"><label className="form-label">Beneficiary (Sabeel No or ITS ID) <span className="required">*</span></label><input className="form-input" placeholder="Search by Sabeel No or ITS ID..." defaultValue="104"/></div>
      <div style={{background:'var(--env-color-light)',padding:12,borderRadius:'var(--radius-md)',marginBottom:16}}><h4 style={{fontSize:'0.875rem'}}>Hatim Bhai Jamali — Sabeel 104</h4></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer</option><option>UPI</option><option>Cash</option><option>Cheque</option></select></div></div>
      <div className="form-group"><label className="form-label">Purpose / Narration <span className="required">*</span></label><textarea className="form-input" rows={2} placeholder="Describe the reason for payment..."/></div>
      <div className="form-group"><label className="form-label">Bank Account (Debit From)</label><select className="form-input form-select"><option>SBI ****4521 (Current)</option><option>BOB ****7890 (Savings)</option></select></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Payment to Mumin submitted for approval.')}>Submit for Approval</button>
    </div>
  </div>);
}