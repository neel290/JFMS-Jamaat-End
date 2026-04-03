import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function AddUser() {
  const navigate = useNavigate();
  const { addUser } = useStore();
  const [toast, setToast] = useState(null);
  const [isMumin, setIsMumin] = useState(true);
  const [itsId, setItsId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16} /> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Add New User</h1><p className="page-subtitle">Add a user to this environment by their ITS ID</p></div></div>
    <div className="card" style={{maxWidth: 640}}>
      <div style={{display:'flex', gap:16, marginBottom: 16}}>
        <label className="form-checkbox">
          <input type="radio" checked={isMumin} onChange={() => {setIsMumin(true); setItsId(''); setName('');}} /> Mumin (via ITS)
        </label>
        <label className="form-checkbox">
          <input type="radio" checked={!isMumin} onChange={() => {setIsMumin(false); setItsId(''); setName('');}} /> Non-Mumin (Phone/Email)
        </label>
      </div>

      {isMumin ? (
        <>
          <div className="form-group">
            <label className="form-label">ITS ID <span className="required">*</span></label>
            <input type="text" className="form-input" placeholder="Enter 8-digit ITS ID" maxLength={8} value={itsId} onChange={e => { setItsId(e.target.value); if (e.target.value.length === 8) setName('Qaidjohar Ezzi'); else setName(''); }} />
            <div className="form-hint">Name will auto-populate from ITS system</div>
          </div>
          {name && <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-input" value={name} readOnly style={{background:'var(--gray-50)'}} /></div>}
        </>
      ) : (
        <>
          <div className="form-group">
            <label className="form-label">Full Name <span className="required">*</span></label>
            <input type="text" className="form-input" placeholder="Enter Full Name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div style={{display:'flex', gap:16}}>
            <div className="form-group" style={{flex:1}}>
              <label className="form-label">Phone <span className="required">*</span></label>
              <input type="text" className="form-input" placeholder="+91 9999999999" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="form-group" style={{flex:1}}>
              <label className="form-label">Email <span className="required">*</span></label>
              <input type="email" className="form-input" placeholder="user@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
        </>
      )}
      <div className="form-group"><label className="form-label">Role <span className="required">*</span></label><select className="form-input form-select" value={role} onChange={e => setRole(e.target.value)}><option value="">Select role...</option><option value="R2">Secretary</option><option value="R3">Accountant</option><option value="R4">Viewer</option></select></div>
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
        <button className="btn btn-primary" onClick={() => { 
          if (!name || !role) { setToast('Please fill all required fields'); return; }
          addUser({ name, itsId: isMumin ? itsId : null, phone, email, roleId: role });
          setToast('User added (Pending Approval)');
          setTimeout(() => navigate('/admin/users'), 1500); 
        }}>Save User</button>
      </div>
    </div>
  </div>);
}