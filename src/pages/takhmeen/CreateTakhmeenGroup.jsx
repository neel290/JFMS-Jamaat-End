import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function CreateTakhmeenGroup() {
  const navigate = useNavigate();
  const { createTakhmeenGroup, incomePurposes, sabeels } = useStore();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);

  const [groupDetails, setGroupDetails] = useState({ name: '', year: '1445H', purposes: [] });
  const [selectedSabeels, setSelectedSabeels] = useState([]);
  const [tempPurpose, setTempPurpose] = useState('');
  const [tempAmount, setTempAmount] = useState('');
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Create Takhmeen Group</h1><p className="page-subtitle">Step-by-step wizard</p></div></div>
    <div className="wizard-steps">{['Name & Year','Define Structure','Select Sabeels','Review & Submit'].map((s,i)=>(
      <div key={i} className={'wizard-step '+(i+1<step?'completed':i+1===step?'active':'')}><div className="wizard-step-number">{i+1<step?'✓':i+1}</div><span className="wizard-step-label">{s}</span></div>
    ))}</div>
    <div className="card" style={{maxWidth:640}}>
      {step===1 && <div>
        <div className="form-group"><label className="form-label">Group Name <span className="required">*</span></label><input className="form-input" placeholder="e.g. Standard Takhmeen 1445H" value={groupDetails.name} onChange={e => setGroupDetails(prev => ({...prev, name: e.target.value}))}/></div>
        <div className="form-group"><label className="form-label">Takhmeen Year</label><select className="form-input form-select" value={groupDetails.year} onChange={e => setGroupDetails(prev => ({...prev, year: e.target.value}))}><option value="1445H">1445H (2024-2025)</option><option value="1446H">1446H (2025-2026)</option></select></div>
        <button className="btn btn-primary" disabled={!groupDetails.name} onClick={()=>setStep(2)}>Next: Define Structure</button>
      </div>}
      {step===2 && <div>
        <h4 style={{marginBottom:16}}>Income Purposes & Amounts</h4>
        {groupDetails.purposes.map((p,i) => {
          const matched = incomePurposes.find(ip => ip.id === p.purposeId);
          return (<div key={i} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}><input className="form-input" value={matched?.name || ''} readOnly style={{flex:1}}/><input className="form-input" value={'₹' + p.amount.toLocaleString('en-IN')} style={{width:150}} readOnly/><button className="btn btn-ghost btn-sm" onClick={() => setGroupDetails(prev => ({...prev, purposes: prev.purposes.filter((_, idx) => idx !== i)}))}><X size={14}/></button></div>);
        })}
        
        <div style={{display:'flex', gap: 12, marginBottom: 16, alignItems: 'flex-end'}}>
          <div className="form-group" style={{flex: 1, marginBottom: 0}}>
            <select className="form-input form-select" value={tempPurpose} onChange={e => setTempPurpose(e.target.value)}>
              <option value="">Select Purpose</option>
              {incomePurposes.filter(ip => ip.allowTakhmeen).map(ip => <option key={ip.id} value={ip.id}>{ip.name}</option>)}
            </select>
          </div>
          <div className="form-group" style={{width: 150, marginBottom: 0}}>
            <input type="number" className="form-input" placeholder="Amount" value={tempAmount} onChange={e => setTempAmount(e.target.value)} />
          </div>
          <button className="btn btn-secondary" onClick={() => {
            if(tempPurpose && tempAmount) {
              setGroupDetails(p => ({...p, purposes: [...p.purposes, { purposeId: tempPurpose, amount: Number(tempAmount) }]}));
              setTempPurpose(''); setTempAmount('');
            }
          }}>Add</button>
        </div>

        <div style={{display:'flex',gap:12}}><button className="btn btn-secondary" onClick={()=>setStep(1)}>Back</button><button className="btn btn-primary" onClick={()=>setStep(3)}>Next</button></div>
      </div>}
      {step===3 && <div>
        <h4 style={{marginBottom:16}}>Select Sabeel Nos</h4>
        <div style={{maxHeight: 250, overflowY: 'auto', marginBottom: 16}}>
          {sabeels.map(s => (
            <label key={s.id} className="form-checkbox" style={{marginBottom:8, display:'block'}}>
              <input type="checkbox" checked={selectedSabeels.includes(s.id)} onChange={e => {
                if(e.target.checked) setSelectedSabeels(p => [...p, s.id]);
                else setSelectedSabeels(p => p.filter(id => id !== s.id));
              }}/>
              {s.sabeelNo}
            </label>
          ))}
        </div>
        <div style={{display:'flex',gap:12,marginTop:16}}><button className="btn btn-secondary" onClick={()=>setStep(2)}>Back</button><button className="btn btn-primary" onClick={()=>setStep(4)}>Next: Review</button></div>
      </div>}

      {step===4 && <div>
        <h4 style={{marginBottom:16}}>Review Summary</h4>
        <div style={{background:'var(--gray-50)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}>
          {[['Group', groupDetails.name],
            ['Year', groupDetails.year],
            ['Purposes', groupDetails.purposes.map(p => (incomePurposes.find(ip => ip.id === p.purposeId)?.name)).join(', ')],
            ['Sabeels', selectedSabeels.length.toString()],
            ['Total Amount', '₹' + (groupDetails.purposes.reduce((s,p) => s + p.amount, 0) * selectedSabeels.length).toLocaleString('en-IN')]
          ].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}>
              <span style={{color:'var(--gray-500)',fontSize:'0.875rem'}}>{l}</span>
              <span style={{fontWeight:600,fontSize:'0.875rem'}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:12}}>
          <button className="btn btn-secondary" onClick={()=>setStep(3)}>Back</button>
          <button className="btn btn-primary" onClick={()=>{
            createTakhmeenGroup(groupDetails, selectedSabeels);
            setToast('Group submitted for approval');
            setTimeout(()=>navigate('/takhmeen/groups'),1500)
          }}>Submit for Approval</button>
        </div>
      </div>}
    </div>
  </div>);
}