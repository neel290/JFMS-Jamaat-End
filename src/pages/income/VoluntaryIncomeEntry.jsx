import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function VoluntaryIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Record Voluntary Contribution</h1><p className="page-subtitle">Non-Takhmeen voluntary donation from Mumineen</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Contributor (Sabeel No or ITS ID) <span className="required">*</span></label><input className="form-input" placeholder="Search by Sabeel No or ITS ID..." defaultValue="103"/></div>
      <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}><h4 style={{marginBottom:4}}>Yusuf Bhai Udaipurwala</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Sabeel: 103 · ITS: 30410789 · Mauze: Dholka</p></div>
      <div className="form-group"><label className="form-label">Income Purpose <span className="required">*</span></label><select className="form-input form-select"><option value="">Select purpose...</option><option>Niyaz</option><option>Sabeel</option><option>Anjuman Fund</option><option>Masjid Maintenance</option><option>Madrasah Donation</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Payment Mode <span className="required">*</span></label><select className="form-input form-select"><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option></select></div></div>
      <div className="form-group"><label className="form-label">Bank Account (Auto-mapped)</label><input className="form-input" value="SBI ****4521 (Current)" readOnly style={{background:'var(--gray-50)'}}/></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2} placeholder="Optional description..."/></div>
      <label className="form-checkbox" style={{marginBottom:16}}><input type="checkbox" defaultChecked/> Generate Receipt</label>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Voluntary contribution saved. Receipt REC-2026-0454 generated.')}>Save Entry</button>
    </div>
  </div>);
}