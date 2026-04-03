import { useState } from 'react';
import { CheckCircle2, Download, Upload, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function TakhmeenOverride() {
  const { sabeels, takhmeens, takhmeenGroups, incomePurposes, editTakhmeen } = useStore();
  const [toast, setToast] = useState(null);
  const [sabeelQuery, setSabeelQuery] = useState('');
  
  const [foundSabeel, setFoundSabeel] = useState(null);
  const [foundTakhmeen, setFoundTakhmeen] = useState(null);
  const [overrideData, setOverrideData] = useState([]);
  const [reason, setReason] = useState('');
  const [isSignedDataUploaded, setIsSignedDataUploaded] = useState(false);
  const handleSearch = () => {
    const s = sabeels.find(x => x.sabeelNo === sabeelQuery);
    if(s) {
      setFoundSabeel(s);
      const t = takhmeens.find(x => x.sabeelId === s.id && x.year === '1445H');
      setFoundTakhmeen(t);
      if(t) setOverrideData(t.purposes.map(p => ({...p})));
    } else {
      setFoundSabeel(null);
      setFoundTakhmeen(null);
      setOverrideData([]);
    }
  };

  return (<div>
    {toast && <div className="toast toast-success" style={{zIndex:9999}}><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Individual Takhmeen Override</h1><p className="page-subtitle">Override Takhmeen for a specific Sabeel</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group" style={{display:'flex', gap:8, alignItems:'flex-end'}}>
        <div style={{flex:1}}>
          <label className="form-label">Search Sabeel No <span className="required">*</span></label>
          <input className="form-input" value={sabeelQuery} onChange={e => setSabeelQuery(e.target.value)} placeholder="e.g. A-101" />
        </div>
        <button className="btn btn-secondary" onClick={handleSearch}>Search</button>
      </div>

      {foundSabeel && (
        <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}>
          <h4 style={{marginBottom:4}}>Sabeel {foundSabeel.sabeelNo}</h4>
          <p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Member ITS: {foundSabeel.hofIts}</p>
        </div>
      )}

      {foundSabeel && !foundTakhmeen && (
        <div style={{color:'var(--gray-500)'}}>No active Takhmeen found for 1445H. You can create a standalone Takhmeen here.</div>
      )}

      {foundTakhmeen && (
        <>
          <h4 style={{marginBottom:12}}>Current Structure</h4>
          {overrideData.map((p, i) => {
            const matched = incomePurposes.find(ip => ip.id === p.purposeId);
            return (
              <div key={i} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
                <span style={{flex:1,fontSize:'0.875rem'}}>{matched?.name || 'Unknown Purpose'}</span>
                <input type="number" className="form-input" value={p.amount} onChange={e => {
                  const val = Number(e.target.value);
                  setOverrideData(prev => prev.map((x, idx) => idx === i ? {...x, amount: val} : x));
                }} style={{width:150}}/>
              </div>
            );
          })}
          
          <div style={{display:'flex', gap: 12, marginTop: 16, marginBottom: 16, background:'var(--gray-50)', padding: 16, borderRadius: 8}}>
            <button className="btn btn-secondary btn-sm" style={{flex: 1}} onClick={() => {
              setToast('Downloading Acknowledgement PDF...');
              setTimeout(() => setToast(''), 2000);
            }}><Download size={14}/> Download Acknowledgement</button>
            <button className="btn btn-secondary btn-sm" style={{flex: 1}} onClick={() => {
              setIsSignedDataUploaded(true);
              setToast('Signed Document Uploaded (Simulated)');
              setTimeout(() => setToast(''), 2000);
            }}>
              <Upload size={14}/> Upload Signed Copy
            </button>
          </div>

          <div className="form-group" style={{marginTop:16}}>
            <label className="form-label">Override Reason <span className="required">*</span></label>
            <textarea className="form-input" rows={3} placeholder="Reason for override..." value={reason} onChange={e => setReason(e.target.value)}/>
          </div>
          <button className="btn btn-primary" onClick={() => {
            if(!reason) { setToast('Reason is required'); return; }
            if(!isSignedDataUploaded) { setToast('Please upload signed acknowledgement first.'); return; }
            editTakhmeen(foundTakhmeen.id, overrideData, reason);
            setToast('Override submitted for Aamil Saheb approval');
            setTimeout(() => {setToast(''); setFoundSabeel(null); setFoundTakhmeen(null);}, 2000);
          }}>Submit for Approval</button>
        </>
      )}
    </div>
  </div>);
}