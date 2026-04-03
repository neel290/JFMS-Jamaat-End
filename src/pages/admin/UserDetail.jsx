import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { users, deactivateUser, updateUserPermissions } = useStore();
  const user = users.find(u => u.id === id) || users[0]; // fallback
  const [showConfirm, setShowConfirm] = useState(false);
  return (<div>
    <div className="page-header">
      <div><h1 className="page-title">{user.name}</h1><p className="page-subtitle">ITS ID: {user.itsId || 'N/A'} · Role: {user.roleId}</p></div>
      <div className="page-actions">
        <button className="btn btn-secondary"><Edit size={16} /> Edit</button>
        {user.active !== false && <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>Deactivate</button>}
      </div>
    </div>
    <div className="grid-2">
      <div className="card">
        <h3 className="card-title" style={{marginBottom:16}}>Profile Information</h3>
        {[['Full Name',user.name],['ITS ID',user.itsId || 'Non-Mumin'],['Role',user.roleId],['Email',user.email || 'N/A'],['Phone',user.phone || 'N/A'],['Status',user.status],['Last Login',user.lastLogin || 'Never']].map(([l,v]) => (
          <div key={l} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--gray-100)'}}>
            <span style={{color:'var(--gray-500)', fontSize:'0.875rem'}}>{l}</span>
            <span style={{fontWeight:500, fontSize:'0.875rem'}}>{v}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="card-title" style={{marginBottom:16}}>Permissions</h3>
        {[['Dashboard','Basic','view_dashboard'],['Income Entry','Standard','enter_receipts'],['Payments','Critical','initiate_payments'],['Approvals','Critical','approve_payments'],['Reports','Standard','view_all'],['Admin','Critical','manage_users'],['Takhmeen','Standard','approve_takhmeen'],['Reconciliation','Standard','reconciliation'],['Export to PDF','Data','export_pdf'],['Export to Excel','Data','export_excel']].map(([m,c,permId]) => {
          const isOn = user.customPermissions ? user.customPermissions.includes(permId) : false;
          return (
            <div key={m} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px', background:'var(--gray-50)', borderRadius:'var(--radius-sm)', marginBottom:4}}>
              <span style={{fontSize:'0.875rem'}}>{m}</span>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <span className={'badge badge-' + (c==='Critical'?'critical':c==='Standard'?'standard':c==='Data'?'data':'basic')}>{c}</span>
                <div className={'toggle-switch' + (isOn?' active':'')} onClick={() => {
                  let perms = user.customPermissions ? [...user.customPermissions] : [];
                  if (isOn) perms = perms.filter(p => p !== permId);
                  else perms.push(permId);
                  updateUserPermissions(user.id, perms);
                }} style={{cursor:'pointer'}} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
    {showConfirm && (<div className="modal-overlay" onClick={() => setShowConfirm(false)}><div className="modal" onClick={e => e.stopPropagation()}>
      <div className="modal-header"><h3 className="modal-title">Deactivate User</h3><button className="modal-close" onClick={() => setShowConfirm(false)}><X size={18} /></button></div>
      <p style={{color:'var(--gray-600)', fontSize:'0.875rem'}}>Are you sure you want to deactivate {user.name}? They will decline access to this environment.</p>
      <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button><button className="btn btn-danger" onClick={() => { deactivateUser(user.id); setShowConfirm(false); navigate('/admin/users'); }}>Deactivate</button></div>
    </div></div>)}
  </div>);
}