import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, X } from 'lucide-react';
export default function UserDetail() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  return (<div>
    <div className="page-header">
      <div><h1 className="page-title">Husain Johar</h1><p className="page-subtitle">ITS ID: 30412587 · Role: Treasurer</p></div>
      <div className="page-actions">
        <button className="btn btn-secondary"><Edit size={16} /> Edit</button>
        <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>Deactivate</button>
      </div>
    </div>
    <div className="grid-2">
      <div className="card">
        <h3 className="card-title" style={{marginBottom:16}}>Profile Information</h3>
        {[['Full Name','Husain Johar'],['ITS ID','30412587'],['Role','Treasurer'],['Email','husain.johar@example.com'],['Phone','+91 98765 43210'],['Status','Active'],['Last Login','01-Apr-2026 10:30 AM']].map(([l,v]) => (
          <div key={l} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--gray-100)'}}>
            <span style={{color:'var(--gray-500)', fontSize:'0.875rem'}}>{l}</span>
            <span style={{fontWeight:500, fontSize:'0.875rem'}}>{v}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="card-title" style={{marginBottom:16}}>Permissions</h3>
        {[['Dashboard','Basic',true],['Income Entry','Standard',true],['Payments','Critical',true],['Approvals','Critical',true],['Reports','Standard',true],['Admin','Critical',false],['Takhmeen','Standard',true],['Reconciliation','Standard',true]].map(([m,c,on]) => (
          <div key={m} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px', background:'var(--gray-50)', borderRadius:'var(--radius-sm)', marginBottom:4}}>
            <span style={{fontSize:'0.875rem'}}>{m}</span>
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <span className={'badge badge-' + (c==='Critical'?'critical':c==='Standard'?'standard':'basic')}>{c}</span>
              <div className={'toggle-switch' + (on?' active':'')} />
            </div>
          </div>
        ))}
      </div>
    </div>
    {showConfirm && (<div className="modal-overlay" onClick={() => setShowConfirm(false)}><div className="modal" onClick={e => e.stopPropagation()}>
      <div className="modal-header"><h3 className="modal-title">Deactivate User</h3><button className="modal-close" onClick={() => setShowConfirm(false)}><X size={18} /></button></div>
      <p style={{color:'var(--gray-600)', fontSize:'0.875rem'}}>Are you sure you want to deactivate Husain Johar? They will lose access to this environment.</p>
      <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button><button className="btn btn-danger" onClick={() => { setShowConfirm(false); navigate('/admin/users'); }}>Deactivate</button></div>
    </div></div>)}
  </div>);
}