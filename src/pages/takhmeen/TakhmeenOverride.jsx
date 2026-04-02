import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function TakhmeenOverride() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Individual Takhmeen Override</h1><p className="page-subtitle">Override Takhmeen for a specific Sabeel</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group"><label className="form-label">Sabeel No <span className="required">*</span></label><input className="form-input" defaultValue="101"/></div>
      <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}><h4 style={{marginBottom:4}}>Shabbir Bhai Cyclewala (Sabeel 101)</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Group: Standard Takhmeen 1445H</p></div>
      <h4 style={{marginBottom:12}}>Current Structure</h4>
      {[['Wajebaat','₹30,000'],['Fitra','₹5,000'],['Zakat','₹15,000']].map(([pu,am],i)=>(<div key={i} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}><span style={{flex:1,fontSize:'0.875rem'}}>{pu}</span><input className="form-input" defaultValue={am} style={{width:150}}/></div>))}
      <div className="form-group" style={{marginTop:16}}><label className="form-label">Override Reason <span className="required">*</span></label><textarea className="form-input" rows={3} placeholder="Reason for override..."/></div>
      <button className="btn btn-primary" onClick={()=>setToast('Override submitted for approval')}>Submit for Approval</button>
    </div>
  </div>);
}