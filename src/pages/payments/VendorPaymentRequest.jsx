import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Upload } from 'lucide-react';
export default function VendorPaymentRequest() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Vendor Payment Request</h1><p className="page-subtitle">Create a new vendor payment request</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Vendor Name <span className="required">*</span></label><select className="form-input form-select"><option value="">Select vendor...</option><option>Ahmed Electricals</option><option>Bohra Plumbing Services</option><option>Star Caterers</option><option>Green Landscaping Co.</option></select></div>
      <div className="form-group"><label className="form-label">Expense Head <span className="required">*</span></label><select className="form-input form-select"><option value="">Select expense head...</option><option>Masjid Maintenance</option><option>Electrical Work</option><option>Plumbing</option><option>Catering</option><option>Landscaping</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Invoice Amount <span className="required">*</span></label><input className="form-input" placeholder="₹"/></div><div className="form-group"><label className="form-label">Invoice Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">TDS Applicable?</label><select className="form-input form-select"><option>No</option><option>Yes — 1%</option><option>Yes — 2%</option><option>Yes — 10%</option></select></div><div className="form-group"><label className="form-label">Net Payable</label><input className="form-input" value="₹45,000" readOnly style={{background:'var(--gray-50)'}}/></div></div>
      <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer (NEFT/RTGS)</option><option>Cheque</option><option>UPI</option></select></div>
      <div className="form-group"><label className="form-label">Bank Account</label><select className="form-input form-select"><option>SBI ****4521 (Current)</option><option>BOB ****7890 (Savings)</option></select></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2} placeholder="Payment description..."/></div>
      <div className="form-group"><label className="form-label">Attach Invoice</label><div style={{border:'2px dashed var(--gray-300)',borderRadius:'var(--radius-md)',padding:24,textAlign:'center',color:'var(--gray-400)',cursor:'pointer'}}><Upload size={24}/><p style={{marginTop:8,fontSize:'0.8125rem'}}>Click or drag to upload invoice (PDF, JPG)</p></div></div>
      <div style={{display:'flex',gap:12,marginTop:16}}>
        <button className="btn btn-secondary" onClick={()=>navigate('/payments')}>Cancel</button>
        <button className="btn btn-primary" onClick={()=>{setToast('Payment request submitted for approval');setTimeout(()=>navigate('/payments'),1500)}}>Submit for Approval</button>
      </div>
    </div>
  </div>);
}