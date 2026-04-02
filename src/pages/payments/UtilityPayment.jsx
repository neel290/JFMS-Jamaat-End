import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function UtilityPayment() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Utility Payments</h1><p className="page-subtitle">Pay electricity, water, internet, and other utility bills</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Utility Type <span className="required">*</span></label><select className="form-input form-select"><option value="">Select utility...</option><option>Electricity — Gujarat EB</option><option>Water Supply — Municipality</option><option>Internet / WiFi</option><option>Telephone</option><option>Gas</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Consumer / Account No</label><input className="form-input" placeholder="Bill account number"/></div><div className="form-group"><label className="form-label">Bill Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Bill Date</label><input className="form-input" type="date"/></div><div className="form-group"><label className="form-label">Due Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Online Payment</option><option>Bank Transfer</option><option>Cheque</option><option>Cash</option></select></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Utility payment recorded: ₹18,750 for Electricity.')}>Save Payment</button>
    </div>
  </div>);
}