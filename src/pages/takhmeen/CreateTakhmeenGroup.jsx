import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
export default function CreateTakhmeenGroup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Create Takhmeen Group</h1><p className="page-subtitle">Step-by-step wizard</p></div></div>
    <div className="wizard-steps">{['Name & Year','Define Structure','Select Sabeels','Review & Submit'].map((s,i)=>(
      <div key={i} className={'wizard-step '+(i+1<step?'completed':i+1===step?'active':'')}><div className="wizard-step-number">{i+1<step?'✓':i+1}</div><span className="wizard-step-label">{s}</span></div>
    ))}</div>
    <div className="card" style={{maxWidth:640}}>
      {step===1&&<div><div className="form-group"><label className="form-label">Group Name <span className="required">*</span></label><input className="form-input" placeholder="e.g. Standard Takhmeen 1445H"/></div><div className="form-group"><label className="form-label">Takhmeen Year</label><select className="form-input form-select"><option>1445H (2024-2025)</option></select></div><button className="btn btn-primary" onClick={()=>setStep(2)}>Next: Define Structure</button></div>}
      {step===2&&<div><h4 style={{marginBottom:16}}>Income Purposes & Amounts</h4>{[['Wajebaat','₹30,000'],['Fitra','₹5,000'],['Zakat','₹15,000']].map(([pu,am],i)=>(<div key={i} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}><input className="form-input" value={pu} readOnly style={{flex:1}}/><input className="form-input" value={am} style={{width:150}} readOnly/><button className="btn btn-ghost btn-sm"><X size={14}/></button></div>))}<button className="btn btn-secondary btn-sm" style={{marginBottom:16}}>+ Add Purpose</button><div style={{display:'flex',gap:12}}><button className="btn btn-secondary" onClick={()=>setStep(1)}>Back</button><button className="btn btn-primary" onClick={()=>setStep(3)}>Next</button></div></div>}
      {step===3&&<div><h4 style={{marginBottom:16}}>Select Sabeel Nos</h4>{['101 — Shabbir Bhai','102 — Mustafa Bhai','103 — Yusuf Bhai','104 — Hatim Bhai','105 — Juzer Bhai'].map(s=>(<label key={s} className="form-checkbox" style={{marginBottom:8}}><input type="checkbox" defaultChecked/>{s}</label>))}<div style={{display:'flex',gap:12,marginTop:16}}><button className="btn btn-secondary" onClick={()=>setStep(2)}>Back</button><button className="btn btn-primary" onClick={()=>setStep(4)}>Next: Review</button></div></div>}
      {step===4&&<div><h4 style={{marginBottom:16}}>Review Summary</h4><div style={{background:'var(--gray-50)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}>{[['Group','Standard Takhmeen 1445H'],['Year','1445H'],['Purposes','Wajebaat, Fitra, Zakat'],['Sabeels','5'],['Total','₹2,50,000']].map(([l,v])=>(<div key={l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}><span style={{color:'var(--gray-500)',fontSize:'0.875rem'}}>{l}</span><span style={{fontWeight:600,fontSize:'0.875rem'}}>{v}</span></div>))}</div><div style={{display:'flex',gap:12}}><button className="btn btn-secondary" onClick={()=>setStep(3)}>Back</button><button className="btn btn-primary" onClick={()=>{setToast('Group submitted for approval');setTimeout(()=>navigate('/takhmeen/groups'),1500)}}>Submit for Approval</button></div></div>}
    </div>
  </div>);
}