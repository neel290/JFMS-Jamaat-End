import { useState } from 'react';
import { Settings, CheckCircle2, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function IncomePurposeMapping() {
  const { incomePurposes, banks, updatePurposeBank } = useStore(state => ({
    incomePurposes: state.incomePurposes,
    banks: state.banks,
    updatePurposeBank: (pid, bid) => {
      // Temporary store logic added for completeness in prototype
      state.incomePurposes = state.incomePurposes.map(p => p.id === pid ? {...p, bankId: bid} : p);
    }
  }));
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState('');
  return (<div>
    {toast && <div className="toast toast-success" style={{zIndex: 9999}}><CheckCircle2 size={16} /> {toast}</div>}
    <div className="page-header">
      <div><h1 className="page-title">Income Purpose to Bank Mapping</h1><p className="page-subtitle">Configure which bank account receives funds</p></div>
      <div className="page-actions"><button className="btn btn-primary" onClick={() => setIsEditing(true)}><Settings size={16} /> Manage Mapping</button></div>
    </div>
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead><tr><th>Income Purpose</th><th>Corpus Type</th><th>Mapped Bank Account</th><th>Status</th></tr></thead>
        <tbody>
          {incomePurposes.map((p, i) => {
            const bank = banks.find(b => b.id === p.bankId) || { name: 'Unassigned', isCorpus: false };
            return (
              <tr key={i}>
                <td style={{fontWeight:500}}>{p.name}</td>
                <td><span className={'badge badge-' + (p.isCorpus ? 'critical' : 'basic')}>{p.isCorpus ? 'Corpus' : 'Non-Corpus'}</span></td>
                <td>{bank.name}</td>
                <td><span className={'badge badge-' + (p.active ? 'active' : 'inactive')}>{p.active ? 'Active' : 'Inactive'}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {isEditing && (
      <div className="drawer-overlay" onClick={() => setIsEditing(false)}>
        <div className="drawer" onClick={e => e.stopPropagation()}>
          <div className="drawer-header"><h3 style={{fontWeight:600}}>Manage Mapping</h3><button className="modal-close" onClick={() => setIsEditing(false)}><X size={18} /></button></div>
          <div className="drawer-body">
            {errorMsg && <div style={{color:'red', marginBottom:16, fontSize:'0.875rem', background:'#ffebeb', padding:12, borderRadius:4}}>{errorMsg}</div>}
            
            <div className="form-group">
              <label className="form-label">Select Income Purpose</label>
              <select className="form-input form-select" value={selectedPurpose} onChange={e => { setSelectedPurpose(e.target.value); setErrorMsg(''); }}>
                <option value="">-- Choose Purpose --</option>
                {incomePurposes.map(p => <option key={p.id} value={p.id}>{p.name} ({p.isCorpus ? 'Corpus' : 'Non-Corpus'})</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Map to Bank Account</label>
              <select className="form-input form-select" value={selectedBank} onChange={e => { setSelectedBank(e.target.value); setErrorMsg(''); }}>
                <option value="">-- Choose Bank --</option>
                {banks.map(b => <option key={b.id} value={b.id}>{b.name} ({b.isCorpus ? 'Corpus' : 'Non-Corpus'})</option>)}
              </select>
            </div>

            <button className="btn btn-primary" style={{width:'100%', marginTop:16}} onClick={() => {
              if(!selectedPurpose || !selectedBank) return;
              
              const purpose = incomePurposes.find(p => p.id === selectedPurpose);
              const bank = banks.find(b => b.id === selectedBank);
              
              if(purpose.isCorpus !== bank.isCorpus) {
                setErrorMsg(`Validation Error: Cannot mix Corpus and Non-Corpus funds. Setup requires matching statuses.`);
                return;
              }
              
              updatePurposeBank(selectedPurpose, selectedBank);
              setToast('Mapping request submitted for Maker-Checker Approval');
              setIsEditing(false);
              setTimeout(() => setToast(''), 3000);
            }}>Submit for Approval</button>
          </div>
        </div>
      </div>
    )}
  </div>);
}