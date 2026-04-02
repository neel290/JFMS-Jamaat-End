import { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle } from 'lucide-react';
export default function ReceiptCancellation() {
  const [toast, setToast] = useState(null);
  const [found, setFound] = useState(false);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Receipt Cancellation</h1><p className="page-subtitle">Request cancellation or data correction for a receipt</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Receipt Number <span className="required">*</span></label><div style={{display:'flex',gap:8}}><input className="form-input" placeholder="e.g. REC-2026-0451" defaultValue="REC-2026-0451"/><button className="btn btn-secondary" onClick={()=>setFound(true)}><Search size={16}/> Find</button></div></div>
      {found && (<>
        <div style={{background:'var(--color-warning-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16,display:'flex',gap:12,alignItems:'flex-start'}}><AlertTriangle size={20} style={{color:'var(--color-warning)',flexShrink:0,marginTop:2}}/><div><h4 style={{fontSize:'0.875rem',marginBottom:4}}>Receipt Found — REC-2026-0451</h4><div style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}><div>Sabeel: 101 — Shabbir Bhai Cyclewala</div><div>Purpose: Wajebaat · Amount: ₹15,000 · Mode: UPI</div><div>Date: 01-Apr-2026 · Status: Confirmed</div></div></div></div>
        <div className="form-group"><label className="form-label">Cancellation Type <span className="required">*</span></label><select className="form-input form-select"><option>Full Cancellation</option><option>Partial Reversal</option><option>Data Correction</option></select></div>
        <div className="form-group"><label className="form-label">Reason <span className="required">*</span></label><textarea className="form-input" rows={3} placeholder="Provide detailed reason..."/></div>
        <div className="form-group"><label className="form-label">Supporting Document</label><div style={{border:'2px dashed var(--gray-300)',padding:24,textAlign:'center',borderRadius:'var(--radius-md)',color:'var(--gray-400)',cursor:'pointer',fontSize:'0.8125rem'}}>Click to upload supporting document (PDF, JPG)</div></div>
        <button className="btn btn-primary" onClick={()=>setToast('Cancellation request submitted for Secretary approval.')}>Submit for Approval</button>
      </>)}
    </div>
  </div>);
}