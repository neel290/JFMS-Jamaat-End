const fs = require('fs'), p = require('path');
const B = './src/pages';
function w(r, c) { fs.writeFileSync(p.join(B, r), c); console.log('RICH:' + r); }

// ============ ADMIN PAGES ============

w('admin/UsersList.jsx', `import { useState } from 'react';
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
}`);

w('admin/AddUser.jsx', `import { useState } from 'react';
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
}`);

w('admin/UserDetail.jsx', `import { useState } from 'react';
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
}`);

w('admin/RolePermissions.jsx', `export default function RolePermissions() {
  const roles = ['Secretary','Treasurer','Accountant','Viewer'];
  const crits = ['Critical','Critical','Standard','Basic'];
  const mods = ['Dashboard','Income Entry','Payments','Approvals','Reports','Administration','Takhmeen','Reconciliation'];
  const perms = [[1,1,1,1],[1,1,1,0],[1,1,1,0],[1,1,0,0],[1,1,1,1],[1,0,0,0],[1,1,0,0],[1,1,1,0]];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Role Permissions</h1><p className="page-subtitle">View predefined role permission matrix</p></div></div>
    <div className="data-table-wrapper"><table className="data-table">
      <thead><tr><th>Module</th>{roles.map((r,i) => <th key={r}><div>{r}</div><span className={'badge badge-' + (crits[i]==='Critical'?'critical':crits[i]==='Standard'?'standard':'basic')}>{crits[i]}</span></th>)}</tr></thead>
      <tbody>{mods.map((mod, mi) => (
        <tr key={mod}><td style={{fontWeight:500}}>{mod}</td>
          {perms[mi].map((ok, j) => <td key={j} style={{textAlign:'center', color:ok?'var(--color-success)':'var(--gray-300)', fontSize:'1.25rem'}}>{ok ? '✓' : '✗'}</td>)}
        </tr>
      ))}</tbody>
    </table></div>
  </div>);
}`);

w('admin/SabeelMaster.jsx', `import { Search, Filter, Download, Plus, Upload } from 'lucide-react';
export default function SabeelMaster() {
  const rows = [['101','Shabbir Bhai Cyclewala','30410123','Dholka',5,'Active'],['102','Mustafa Bhai Bohra','30410456','Dholka',4,'Active'],['103','Yusuf Bhai Udaipurwala','30410789','Dholka',6,'Active'],['104','Hatim Bhai Jamali','30411012','Dholka',3,'Active'],['105','Juzer Bhai Shikari','30411345','Dholka',7,'Active'],['106','Amil Bhai Contractor','30411678','Dholka',2,'Inactive'],['107','Taiyeb Bhai Kapasi','30411901','Dholka',4,'Active'],['108','Quresh Bhai Badri','30412234','Dholka',5,'Active']];
  return (<div>
    <div className="page-header">
      <div><h1 className="page-title">Sabeel No Master</h1><p className="page-subtitle">Manage Sabeel household records</p></div>
      <div className="page-actions"><button className="btn btn-secondary"><Upload size={16} /> Bulk Import</button><button className="btn btn-primary"><Plus size={16} /> Add Sabeel No</button></div>
    </div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16} /><input placeholder="Search by Sabeel No or ITS ID..." /></div><button className="filter-btn"><Filter size={14} /> Status</button><div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Sabeel No</th><th>Head of Household</th><th>ITS ID</th><th>Mauze</th><th>Members</th><th>Status</th></tr></thead>
        <tbody>{rows.map(([no,hd,its,mz,mem,st], i) => (<tr key={i}><td style={{fontWeight:600}}>{no}</td><td>{hd}</td><td>{its}</td><td>{mz}</td><td>{mem}</td><td><span className={'badge badge-' + (st==='Active'?'active':'inactive')}>{st}</span></td></tr>))}</tbody>
      </table>
      <div className="table-pagination"><span>Showing 1-8 of 8</span><span>Page 1 of 1</span></div>
    </div>
  </div>);
}`);

w('admin/BankAccounts.jsx', `import { useState } from 'react';
import { Search, Filter, Download, Plus, History, X } from 'lucide-react';
export default function BankAccounts() {
  const [showAudit, setShowAudit] = useState(false);
  const accts = [['State Bank of India','****4521','SBIN0001234','Current','₹12,45,678','Active'],['Bank of Baroda','****7890','BARB0DHOLKA','Savings','₹8,32,450','Active'],['HDFC Bank','****3456','HDFC0002345','Current','₹0','Pending Approval']];
  return (<div>
    <div className="page-header">
      <div><h1 className="page-title">Bank Accounts</h1><p className="page-subtitle">Manage bank accounts linked to this environment</p></div>
      <div className="page-actions"><button className="btn btn-secondary" onClick={() => setShowAudit(true)}><History size={16} /> Audit Trail</button><button className="btn btn-primary"><Plus size={16} /> Add Bank Account</button></div>
    </div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16} /><input placeholder="Search..." /></div><button className="filter-btn"><Filter size={14} /> Status</button><div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Bank Name</th><th>Account No</th><th>IFSC</th><th>Type</th><th>Balance</th><th>Status</th></tr></thead>
        <tbody>{accts.map(([b,a,ifsc,t,bal,s], i) => (<tr key={i}><td style={{fontWeight:500}}>{b}</td><td>{a}</td><td>{ifsc}</td><td>{t}</td><td style={{fontWeight:600}}>{bal}</td><td><span className={'badge badge-' + (s==='Active'?'active':'pending')}>{s}</span></td></tr>))}</tbody>
      </table>
    </div>
    {showAudit && (<><div className="drawer-overlay" onClick={() => setShowAudit(false)} /><div className="drawer"><div className="drawer-header"><h3 style={{fontWeight:600}}>Audit Trail</h3><button className="modal-close" onClick={() => setShowAudit(false)}><X size={18} /></button></div><div className="drawer-body">{[{a:'HDFC account added (Pending)',t:'01-Apr-2026'},{a:'BOB balance updated',t:'31-Mar-2026'},{a:'SBI account verified',t:'01-Jan-2026'}].map((x,i) => (<div className="audit-item" key={i}><div className="audit-dot" /><div className="audit-content"><div className="audit-action">{x.a}</div><div className="audit-meta">{x.t}</div></div></div>))}</div></div></>)}
  </div>);
}`);

w('admin/IncomePurposeMapping.jsx', `import { Settings } from 'lucide-react';
export default function IncomePurposeMapping() {
  const rows = [['Takhmeen — Wajebaat','SBI ****4521','Active'],['Takhmeen — Fitra','SBI ****4521','Active'],['Takhmeen — Zakat','BOB ****7890','Active'],['Niyaz','SBI ****4521','Active'],['Sabeel','SBI ****4521','Active'],['Anjuman Fund','BOB ****7890','Active'],['Masjid Maintenance','BOB ****7890','Active'],['Madrasah Donation','BOB ****7890','Pending Approval']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income Purpose to Bank Mapping</h1><p className="page-subtitle">Configure which bank account receives funds</p></div><div className="page-actions"><button className="btn btn-primary"><Settings size={16} /> Manage Mapping</button></div></div>
    <div className="data-table-wrapper"><table className="data-table"><thead><tr><th>Income Purpose</th><th>Mapped Bank Account</th><th>Status</th></tr></thead>
      <tbody>{rows.map(([p,b,s], i) => (<tr key={i}><td style={{fontWeight:500}}>{p}</td><td>{b}</td><td><span className={'badge badge-' + (s==='Active'?'active':'pending')}>{s}</span></td></tr>))}</tbody>
    </table></div>
  </div>);
}`);

w('admin/AccessControl.jsx', `import { useState } from 'react';
export default function AccessControl() {
  const [t1, setT1] = useState(true); const [t2, setT2] = useState(true); const [t3, setT3] = useState(false);
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Data & Notification Access Control</h1><p className="page-subtitle">Control data access and notification preferences</p></div></div>
    <div className="grid-2">
      <div className="card"><h3 className="card-title" style={{marginBottom:16}}>Notification Settings</h3>
        {[['Transactional Notifications',t1,setT1],['Payment Reminders',t2,setT2],['Marketing Notifications',t3,setT3]].map(([l,v,s]) => (
          <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid var(--gray-100)'}}><span style={{fontSize:'0.875rem'}}>{l}</span><div className={'toggle-switch' + (v?' active':'')} onClick={() => s(!v)} /></div>
        ))}
      </div>
      <div className="card"><h3 className="card-title" style={{marginBottom:16}}>Data Access Scope</h3>
        <p style={{color:'var(--gray-500)',fontSize:'0.875rem',marginBottom:16}}>Control which Sabeel households can view financial data through the Mumin portal.</p>
        <div style={{padding:12,background:'var(--color-success-light)',borderRadius:'var(--radius-md)'}}><span style={{color:'var(--color-success)',fontWeight:600,fontSize:'0.875rem'}}>All 108 Sabeel households have data access enabled</span></div>
      </div>
    </div>
  </div>);
}`);

console.log('Admin pages enriched successfully');
