import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
export default function AddUser() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [itsId, setItsId] = useState('');
  const [name, setName] = useState('');
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16} /> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Add New User</h1><p className="page-subtitle">Add a user to this environment by their ITS ID</p></div></div>
    <div className="card" style={{maxWidth: 640}}>
      <div className="form-group">
        <label className="form-label">ITS ID <span className="required">*</span></label>
        <input type="text" className="form-input" placeholder="Enter 8-digit ITS ID" maxLength={8} value={itsId} onChange={e => { setItsId(e.target.value); if (e.target.value.length === 8) setName('Qaidjohar Ezzi'); else setName(''); }} />
        <div className="form-hint">Name will auto-populate from ITS system</div>
      </div>
      {name && <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-input" value={name} readOnly style={{background:'var(--gray-50)'}} /></div>}
      <div className="form-group"><label className="form-label">Role <span className="required">*</span></label><select className="form-input form-select"><option value="">Select role...</option><option>Secretary</option><option>Treasurer</option><option>Accountant</option><option>Viewer</option></select></div>
      <div className="card" style={{background:'var(--gray-50)', border:'1px solid var(--gray-200)', marginTop:16}}>
        <h4 style={{marginBottom:12, fontSize:'0.875rem'}}>Permission Overrides (Optional)</h4>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
          {['Dashboard','Income Entry','Payments','Approvals','Reports','Admin','Takhmeen','Reconciliation'].map(perm => (
            <label key={perm} className="form-checkbox"><input type="checkbox" defaultChecked />{perm}</label>
          ))}
        </div>
      </div>
      <div style={{display:'flex', gap:12, marginTop:24}}>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/users')}>Cancel</button>
        <button className="btn btn-primary" onClick={() => { setToast('User added (Pending Approval)'); setTimeout(() => navigate('/admin/users'), 1500); }}>Save User</button>
      </div>
    </div>
  </div>);
}