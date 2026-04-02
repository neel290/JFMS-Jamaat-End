import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, Plus, Eye, Edit, History, X, CheckCircle2 } from 'lucide-react';
export default function UsersList() {
  const navigate = useNavigate();
  const [showAudit, setShowAudit] = useState(false);
  const users = [
    {name:'Husain Johar',its:'30412587',role:'Treasurer',status:'Active',login:'01-Apr-2026 10:30 AM'},
    {name:'Mufaddal Saifuddin',its:'30415623',role:'Secretary',status:'Active',login:'01-Apr-2026 09:15 AM'},
    {name:'Taher Bhai Rangwala',its:'30418901',role:'Accountant',status:'Active',login:'31-Mar-2026 04:45 PM'},
    {name:'Burhanuddin Hakimuddin',its:'30422456',role:'Accountant',status:'Active',login:'31-Mar-2026 02:00 PM'},
    {name:'Abdeali Bhaisaheb',its:'30425789',role:'Viewer',status:'Inactive',login:'15-Mar-2026'},
    {name:'Qaidjohar Ezzi',its:'30429012',role:'Accountant',status:'Pending Approval',login:'Never'},
  ];
  return (<div>
    <div className="page-header">
      <div><h1 className="page-title">User Management</h1><p className="page-subtitle">Manage users, roles, and permissions</p></div>
      <div className="page-actions">
        <button className="btn btn-secondary" onClick={() => setShowAudit(true)}><History size={16} /> Audit Trail</button>
        <button className="btn btn-primary" onClick={() => navigate('/admin/users/add')}><Plus size={16} /> Add New User</button>
      </div>
    </div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar">
        <div className="search-box"><Search size={16} /><input placeholder="Search by name or ITS ID..." /></div>
        <button className="filter-btn"><Filter size={14} /> Role</button>
        <button className="filter-btn"><Filter size={14} /> Status</button>
        <div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button></div>
      </div>
      <table className="data-table">
        <thead><tr><th>Name</th><th>ITS ID</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
        <tbody>{users.map((u, i) => (
          <tr key={i} className="clickable" onClick={() => navigate('/admin/users/' + i)}>
            <td style={{fontWeight: 500}}>{u.name}</td><td>{u.its}</td><td>{u.role}</td>
            <td><span className={'badge badge-' + (u.status === 'Active' ? 'active' : u.status === 'Inactive' ? 'inactive' : 'pending')}>{u.status}</span></td>
            <td>{u.login}</td>
            <td onClick={e => e.stopPropagation()}>
              <button className="btn btn-ghost btn-sm"><Eye size={14} /></button>
              <button className="btn btn-ghost btn-sm"><Edit size={14} /></button>
            </td>
          </tr>
        ))}</tbody>
      </table>
      <div className="table-pagination"><span>Showing 1-6 of 6 users</span><span>Page 1 of 1</span></div>
    </div>
    {showAudit && (<><div className="drawer-overlay" onClick={() => setShowAudit(false)} /><div className="drawer"><div className="drawer-header"><h3 style={{fontWeight:600}}>Audit Trail</h3><button className="modal-close" onClick={() => setShowAudit(false)}><X size={18} /></button></div><div className="drawer-body">{[{a:'Qaidjohar Ezzi added (Pending)',u:'Taher Bhai',t:'01-Apr-2026 10:30'},{a:'Abdeali deactivated',u:'Husain Johar',t:'15-Mar-2026 11:00'},{a:'Burhanuddin role updated',u:'Secretary',t:'01-Mar-2026 09:00'}].map((x,i) => (<div className="audit-item" key={i}><div className="audit-dot" /><div className="audit-content"><div className="audit-action">{x.a}</div><div className="audit-meta">{x.u} · {x.t}</div></div></div>))}</div></div></>)}
  </div>);
}