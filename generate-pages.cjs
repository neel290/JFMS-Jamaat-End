const fs = require('fs');
const path = require('path');
const base = 'c:/Office/JFMS/src/pages';

function w(rel, code) {
  const fp = path.join(base, rel);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, code, 'utf8');
  console.log('Created: ' + rel);
}

// Reusable page wrapper
function pg(name, title, subtitle, bodyJsx) {
  return `import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Filter, Download, Plus, Eye, Edit, X, Clock, History, CheckCircle2, ArrowRight, FileText, IndianRupee, AlertTriangle, Upload, Trash2, Check } from 'lucide-react';

export default function ${name}() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 3000); };

  return (
    <div>
      {toast && <div className="toast toast-success"><CheckCircle2 size={16} /> {toast}</div>}

      <div className="page-header">
        <div>
          <h1 className="page-title">${title}</h1>
          <p className="page-subtitle">${subtitle}</p>
        </div>
      </div>

      ${bodyJsx}

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Confirm Action</h3>
              <button className="modal-close" onClick={() => setShowConfirm(false)}><X size={18} /></button>
            </div>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>Are you sure you want to proceed? This action cannot be undone.</p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { setShowConfirm(false); showToast('Action completed successfully'); }}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showAudit && (
        <>
          <div className="drawer-overlay" onClick={() => setShowAudit(false)} />
          <div className="drawer">
            <div className="drawer-header">
              <h3 style={{ fontWeight: 600 }}>Audit Trail</h3>
              <button className="modal-close" onClick={() => setShowAudit(false)}><X size={18} /></button>
            </div>
            <div className="drawer-body">
              {[
                { a: 'Record created', u: 'Taher Bhai Rangwala', t: '01-Apr-2026 10:30 AM' },
                { a: 'Submitted for approval', u: 'Taher Bhai Rangwala', t: '01-Apr-2026 10:32 AM' },
                { a: 'Approved by Treasurer', u: 'Husain Johar', t: '01-Apr-2026 11:15 AM' },
              ].map((x, i) => (
                <div className="audit-item" key={i}>
                  <div className="audit-dot" />
                  <div className="audit-content">
                    <div className="audit-action">{x.a}</div>
                    <div className="audit-meta">{x.u} &middot; {x.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}`;
}

// ======== ADMIN ========
w('admin/RolePermissions.jsx', pg('RolePermissions', 'Role Permissions', 'View predefined role permission matrix', `
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr><th>Module</th><th>Secretary<br/><span className="badge badge-critical">Critical</span></th><th>Treasurer<br/><span className="badge badge-critical">Critical</span></th><th>Accountant<br/><span className="badge badge-standard">Standard</span></th><th>Viewer<br/><span className="badge badge-basic">Basic</span></th></tr>
          </thead>
          <tbody>
            {['Dashboard','Income Entry','Payments','Approvals','Reports','Administration','Takhmeen','Reconciliation'].map((mod, i) => {
              const perms = [[1,1,1,1],[1,1,1,0],[1,1,1,0],[1,1,0,0],[1,1,1,1],[1,0,0,0],[1,1,0,0],[1,1,1,0]];
              return (
                <tr key={mod}><td style={{fontWeight:500}}>{mod}</td>
                  {perms[i].map((p,j) => <td key={j} style={{textAlign:'center',color:p?'var(--color-success)':'var(--gray-300)',fontSize:'1.125rem'}}>{p?'\\u2713':'\\u2717'}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>`));

w('admin/SabeelMaster.jsx', pg('SabeelMaster', 'Sabeel No Master', 'Manage Sabeel household records', `
      <div className="page-actions" style={{marginTop:-16,marginBottom:16,display:'flex',gap:12,justifyContent:'flex-end'}}>
        <button className="btn btn-secondary"><Upload size={16} /> Bulk Import</button>
        <button className="btn btn-primary"><Plus size={16} /> Add Sabeel No</button>
      </div>
      <div className="data-table-wrapper">
        <div className="data-table-toolbar">
          <div className="search-box"><Search size={16} /><input placeholder="Search by Sabeel No or ITS ID..." /></div>
          <button className="filter-btn"><Filter size={14} /> Status</button>
          <div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button></div>
        </div>
        <table className="data-table">
          <thead><tr><th>Sabeel No</th><th>Head of Household</th><th>ITS ID</th><th>Mauze</th><th>Members</th><th>Status</th></tr></thead>
          <tbody>
            {[['101','Shabbir Bhai Cyclewala','30410123','Dholka',5,'Active'],['102','Mustafa Bhai Bohra','30410456','Dholka',4,'Active'],['103','Yusuf Bhai Udaipurwala','30410789','Dholka',6,'Active'],['104','Hatim Bhai Jamali','30411012','Dholka',3,'Active'],['105','Juzer Bhai Shikari','30411345','Dholka',7,'Active'],['106','Amil Bhai Contractor','30411678','Dholka',2,'Inactive'],['107','Taiyeb Bhai Kapasi','30411901','Dholka',4,'Active'],['108','Quresh Bhai Badri','30412234','Dholka',5,'Active']].map(([no,head,its,mz,mem,st],i) => (
              <tr key={i}><td style={{fontWeight:600}}>{no}</td><td>{head}</td><td>{its}</td><td>{mz}</td><td>{mem}</td><td><span className={'badge badge-'+(st==='Active'?'active':'inactive')}>{st}</span></td></tr>
            ))}
          </tbody>
        </table>
        <div className="table-pagination"><span>Showing 1-8 of 8 records</span><span>Page 1 of 1</span></div>
      </div>`));

w('admin/BankAccounts.jsx', pg('BankAccounts', 'Bank Accounts', 'Manage bank accounts linked to this environment', `
      <div className="page-actions" style={{marginTop:-16,marginBottom:16,display:'flex',gap:12,justifyContent:'flex-end'}}>
        <button className="btn btn-secondary" onClick={() => setShowAudit(true)}><History size={16} /> Audit Trail</button>
        <button className="btn btn-primary"><Plus size={16} /> Add Bank Account</button>
      </div>
      <div className="data-table-wrapper">
        <div className="data-table-toolbar">
          <div className="search-box"><Search size={16} /><input placeholder="Search bank accounts..." /></div>
          <button className="filter-btn"><Filter size={14} /> Status</button>
          <div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button></div>
        </div>
        <table className="data-table">
          <thead><tr><th>Bank Name</th><th>Account No</th><th>IFSC</th><th>Type</th><th>Balance</th><th>Status</th></tr></thead>
          <tbody>
            {[['State Bank of India','****4521','SBIN0001234','Current','\\u20b912,45,678','Active'],['Bank of Baroda','****7890','BARB0DHOLKA','Savings','\\u20b98,32,450','Active'],['HDFC Bank','****3456','HDFC0002345','Current','\\u20b90','Pending Approval']].map(([b,a,i2,t,bal,st],i) => (
              <tr key={i}><td style={{fontWeight:500}}>{b}</td><td>{a}</td><td>{i2}</td><td>{t}</td><td style={{fontWeight:600}}>{bal}</td><td><span className={'badge badge-'+(st==='Active'?'active':'pending')}>{st}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>`));

w('admin/IncomePurposeMapping.jsx', pg('IncomePurposeMapping', 'Income Purpose to Bank Mapping', 'Configure which bank account receives funds for each income purpose', `
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead><tr><th>Income Purpose</th><th>Mapped Bank Account</th><th>Status</th></tr></thead>
          <tbody>
            {[['Takhmeen \\u2014 Wajebaat','SBI ****4521','Active'],['Takhmeen \\u2014 Fitra','SBI ****4521','Active'],['Takhmeen \\u2014 Zakat','BOB ****7890','Active'],['Niyaz','SBI ****4521','Active'],['Sabeel','SBI ****4521','Active'],['Anjuman Fund','BOB ****7890','Active'],['Masjid Maintenance','BOB ****7890','Active'],['Madrasah Donation','BOB ****7890','Pending Approval']].map(([p,b,s],i) => (
              <tr key={i}><td style={{fontWeight:500}}>{p}</td><td>{b}</td><td><span className={'badge badge-'+(s==='Active'?'active':'pending')}>{s}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>`));

w('admin/AccessControl.jsx', `import { useState } from 'react';
export default function AccessControl() {
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(true);
  const [t3, setT3] = useState(false);
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Data & Notification Access Control</h1><p className="page-subtitle">Control data access and notification preferences</p></div></div>
    <div className="grid-2">
      <div className="card">
        <h3 className="card-title" style={{marginBottom:16}}>Notification Settings</h3>
        {[['Transactional Notifications',t1,setT1],['Payment Reminders',t2,setT2],['Marketing Notifications',t3,setT3]].map(([l,v,s]) => (
          <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid var(--gray-100)'}}>
            <span style={{fontSize:'0.875rem'}}>{l}</span>
            <div className={'toggle-switch'+(v?' active':'')} onClick={() => s(!v)} />
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="card-title" style={{marginBottom:16}}>Data Access Scope</h3>
        <p style={{color:'var(--gray-500)',fontSize:'0.875rem',marginBottom:16}}>Control which Sabeel households can view financial data through the Mumin portal.</p>
        <div style={{padding:12,background:'var(--color-success-light)',borderRadius:'var(--radius-md)'}}>
          <span style={{color:'var(--color-success)',fontWeight:600,fontSize:'0.875rem'}}>All 108 Sabeel households have data access enabled</span>
        </div>
      </div>
    </div>
  </div>);
}`);

// ======== TAKHMEEN ========
w('takhmeen/TakhmeenDashboard.jsx', pg('TakhmeenDashboard', 'Takhmeen Dashboard', 'Overview of Takhmeen collections for 1445H', `
      <div className="stat-cards">
        <div className="stat-card"><div className="stat-icon primary"><FileText size={20}/></div><div className="stat-content"><div className="stat-label">Total Sabeel Nos</div><div className="stat-value">108</div></div></div>
        <div className="stat-card"><div className="stat-icon green"><CheckCircle2 size={20}/></div><div className="stat-content"><div className="stat-label">Takhmeen Assigned</div><div className="stat-value">\\u20b963,30,000</div></div></div>
        <div className="stat-card"><div className="stat-icon blue"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Collected</div><div className="stat-value">\\u20b945,85,000</div><div className="stat-trend up" style={{color:'var(--color-success)'}}>72.4%</div></div></div>
        <div className="stat-card"><div className="stat-icon amber"><Clock size={20}/></div><div className="stat-content"><div className="stat-label">Outstanding</div><div className="stat-value">\\u20b917,45,000</div></div></div>
        <div className="stat-card"><div className="stat-icon red"><AlertTriangle size={20}/></div><div className="stat-content"><div className="stat-label">Pending Approvals</div><div className="stat-value">3</div></div></div>
      </div>
      <div className="card" style={{marginTop:8}}>
        <div className="card-header"><h3 className="card-title">Active Takhmeen Year: 1445H</h3><span className="badge badge-active">Active</span></div>
        <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
          <button className="btn btn-primary" onClick={() => navigate('/takhmeen/groups')}>Manage Groups</button>
          <button className="btn btn-secondary" onClick={() => navigate('/takhmeen/approvals')}>Approval Queue (3)</button>
          <button className="btn btn-secondary" onClick={() => navigate('/takhmeen/campaigns')}>Campaigns</button>
        </div>
      </div>`));

w('takhmeen/TakhmeenGroups.jsx', pg('TakhmeenGroups', 'Takhmeen Groups', 'Manage Takhmeen contribution groups for 1445H', `
      <div className="page-actions" style={{marginTop:-16,marginBottom:16,display:'flex',gap:12,justifyContent:'flex-end'}}>
        <button className="btn btn-primary" onClick={() => navigate('/takhmeen/groups/create')}><Plus size={16} /> Create New Group</button>
      </div>
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead><tr><th>Group Name</th><th>Sabeel Count</th><th>Purposes</th><th>Total Amount</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {[['Standard Takhmeen 1445H',85,'Wajebaat, Fitra, Zakat','\\u20b942,50,000','Approved'],['Premium Takhmeen 1445H',23,'Wajebaat, Fitra, Zakat, Niyaz','\\u20b918,40,000','Approved'],['New Members 1445H',8,'Wajebaat, Fitra','\\u20b92,40,000','Draft']].map(([n,c,p,a,s],i) => (
              <tr key={i}><td style={{fontWeight:500}}>{n}</td><td>{c}</td><td style={{fontSize:'0.8125rem'}}>{p}</td><td style={{fontWeight:600}}>{a}</td><td><span className={'badge badge-'+(s==='Approved'?'approved':'draft')}>{s}</span></td><td><button className="btn btn-ghost btn-sm"><Eye size={14}/></button><button className="btn btn-ghost btn-sm"><Edit size={14}/></button></td></tr>
            ))}
          </tbody>
        </table>
      </div>`));

w('takhmeen/CreateTakhmeenGroup.jsx', `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
export default function CreateTakhmeenGroup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16} /> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Create Takhmeen Group</h1><p className="page-subtitle">Step-by-step wizard to create a new Takhmeen group</p></div></div>
    <div className="wizard-steps">
      {['Name & Year','Define Structure','Select Sabeels','Review & Submit'].map((s,i)=>(
        <div key={i} className={'wizard-step '+(i+1<step?'completed':i+1===step?'active':'')}>
          <div className="wizard-step-number">{i+1<step?'\\u2713':i+1}</div>
          <span className="wizard-step-label">{s}</span>
        </div>
      ))}
    </div>
    <div className="card" style={{maxWidth:640}}>
      {step===1 && (<div>
        <div className="form-group"><label className="form-label">Group Name <span className="required">*</span></label><input className="form-input" placeholder="e.g. Standard Takhmeen 1445H" /></div>
        <div className="form-group"><label className="form-label">Takhmeen Year <span className="required">*</span></label><select className="form-input form-select"><option>1445H (2024-2025)</option><option>1446H (2025-2026)</option></select></div>
        <button className="btn btn-primary" onClick={()=>setStep(2)}>Next: Define Structure</button>
      </div>)}
      {step===2 && (<div>
        <h4 style={{marginBottom:16}}>Add Income Purposes & Amounts</h4>
        {[['Wajebaat','\\u20b930,000'],['Fitra','\\u20b95,000'],['Zakat','\\u20b915,000']].map(([p,a],i)=>(
          <div key={i} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
            <input className="form-input" value={p} readOnly style={{flex:1}} />
            <input className="form-input" value={a} style={{width:150}} readOnly />
            <button className="btn btn-ghost btn-sm"><X size={14}/></button>
          </div>
        ))}
        <button className="btn btn-secondary btn-sm" style={{marginBottom:16}}>+ Add Purpose</button>
        <div style={{display:'flex',gap:12}}><button className="btn btn-secondary" onClick={()=>setStep(1)}>Back</button><button className="btn btn-primary" onClick={()=>setStep(3)}>Next: Select Sabeels</button></div>
      </div>)}
      {step===3 && (<div>
        <h4 style={{marginBottom:16}}>Select Sabeel Nos (Multi-select)</h4>
        <div className="search-box" style={{marginBottom:16}}><input placeholder="Search Sabeel No..." style={{border:'none',outline:'none',width:'100%',fontFamily:'var(--font-family)',fontSize:'0.875rem'}} /></div>
        {['101 — Shabbir Bhai','102 — Mustafa Bhai','103 — Yusuf Bhai','104 — Hatim Bhai','105 — Juzer Bhai'].map((s,i)=>(
          <label key={i} className="form-checkbox" style={{marginBottom:8}}><input type="checkbox" defaultChecked />{s}</label>
        ))}
        <div style={{display:'flex',gap:12,marginTop:16}}><button className="btn btn-secondary" onClick={()=>setStep(2)}>Back</button><button className="btn btn-primary" onClick={()=>setStep(4)}>Next: Review</button></div>
      </div>)}
      {step===4 && (<div>
        <h4 style={{marginBottom:16}}>Review Summary</h4>
        <div style={{background:'var(--gray-50)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}>
          {[['Group Name','Standard Takhmeen 1445H'],['Year','1445H'],['Purposes','Wajebaat, Fitra, Zakat'],['Sabeel Count','5'],['Total Amount','\\u20b92,50,000']].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}><span style={{color:'var(--gray-500)',fontSize:'0.875rem'}}>{l}</span><span style={{fontWeight:600,fontSize:'0.875rem'}}>{v}</span></div>
          ))}
        </div>
        <div style={{display:'flex',gap:12}}><button className="btn btn-secondary" onClick={()=>setStep(3)}>Back</button><button className="btn btn-primary" onClick={()=>{setToast('Group submitted for approval');setTimeout(()=>navigate('/takhmeen/groups'),1500)}}>Submit for Approval</button></div>
      </div>)}
    </div>
  </div>);
}`);

w('takhmeen/TakhmeenOverride.jsx', pg('TakhmeenOverride', 'Individual Takhmeen Override', 'Override Takhmeen for a specific Sabeel', `
      <div className="card" style={{maxWidth:640}}>
        <div className="form-group"><label className="form-label">Search Sabeel No <span className="required">*</span></label><input className="form-input" placeholder="Enter Sabeel No..." defaultValue="101" /></div>
        <div style={{background:'var(--gray-50)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}>
          <h4 style={{marginBottom:8}}>Shabbir Bhai Cyclewala (Sabeel 101)</h4>
          <p style={{fontSize:'0.8125rem',color:'var(--gray-500)'}}>Current Group: Standard Takhmeen 1445H</p>
        </div>
        <h4 style={{marginBottom:12}}>Current Takhmeen Structure</h4>
        {[['Wajebaat','\\u20b930,000'],['Fitra','\\u20b95,000'],['Zakat','\\u20b915,000']].map(([p,a],i)=>(
          <div key={i} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
            <span style={{flex:1,fontSize:'0.875rem'}}>{p}</span>
            <input className="form-input" defaultValue={a} style={{width:150}} />
          </div>
        ))}
        <div className="form-group" style={{marginTop:16}}>
          <label className="form-label">Override Reason <span className="required">*</span></label>
          <textarea className="form-input" rows={3} placeholder="Reason for overriding this Sabeel's Takhmeen..." />
        </div>
        <button className="btn btn-primary" onClick={() => showToast('Override submitted for approval')}>Submit for Approval</button>
      </div>`));

w('takhmeen/TakhmeenApproval.jsx', pg('TakhmeenApproval', 'Takhmeen Approval Queue', 'Approve or reject pending Takhmeen changes', `
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead><tr><th>Type</th><th>Details</th><th>Submitted By</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {[['Group','New Members 1445H — 8 Sabeels','Taher Bhai','30-Mar-2026'],['Override','Sabeel 101 — Wajebaat changed to \\u20b935,000','Taher Bhai','31-Mar-2026'],['Override','Sabeel 105 — Added Niyaz purpose','Burhanuddin','01-Apr-2026']].map(([t,d,u,dt],i) => (
              <tr key={i}><td><span className="badge badge-draft">{t}</span></td><td style={{fontSize:'0.875rem'}}>{d}</td><td>{u}</td><td>{dt}</td>
              <td style={{display:'flex',gap:8}}><button className="btn btn-success btn-sm"><Check size={14}/> Approve</button><button className="btn btn-danger btn-sm"><X size={14}/> Reject</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>`));

w('takhmeen/TakhmeenSchedule.jsx', pg('TakhmeenSchedule', 'Takhmeen Payment Schedule', 'Set up e-mandate recurring payments', `
      <div className="card" style={{maxWidth:640}}>
        <div className="form-group"><label className="form-label">Sabeel No <span className="required">*</span></label><input className="form-input" placeholder="Search Sabeel No..." /></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Payment Frequency</label><select className="form-input form-select"><option>Monthly</option><option>Quarterly</option><option>Half-yearly</option></select></div>
          <div className="form-group"><label className="form-label">Amount per Instalment</label><input className="form-input" defaultValue="\\u20b94,167" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date" /></div>
          <div className="form-group"><label className="form-label">End Date</label><input className="form-input" type="date" /></div>
        </div>
        <div className="form-group"><label className="form-label">Mandate Type</label><select className="form-input form-select"><option>e-NACH</option><option>UPI Autopay</option></select></div>
        <button className="btn btn-primary">Generate Mandate</button>
      </div>`));

w('takhmeen/VoluntaryCampaign.jsx', pg('VoluntaryCampaign', 'Voluntary Campaigns', 'Create and manage voluntary contribution campaigns', `
      <div className="page-actions" style={{marginTop:-16,marginBottom:16,display:'flex',gap:12,justifyContent:'flex-end'}}>
        <button className="btn btn-primary"><Plus size={16} /> Create Campaign</button>
      </div>
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><h3 className="card-title">Ramadan Niyaz Drive 1445H</h3><span className="badge badge-active">Active</span></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginTop:8}}>
          {[['Target','\\u20b95,00,000'],['Collected','\\u20b93,25,000'],['Progress','65%'],['Participants','45']].map(([l,v])=>(
            <div key={l}><div style={{fontSize:'0.75rem',color:'var(--gray-500)'}}>{l}</div><div style={{fontWeight:700}}>{v}</div></div>
          ))}
        </div>
        <div style={{marginTop:12,height:8,background:'var(--gray-200)',borderRadius:4}}>
          <div style={{width:'65%',height:'100%',background:'var(--color-success)',borderRadius:4}} />
        </div>
      </div>
      <div className="card" style={{background:'var(--gray-50)'}}>
        <h4 style={{marginBottom:16}}>Create New Campaign</h4>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Campaign Name <span className="required">*</span></label><input className="form-input" placeholder="e.g. Eid-ul-Adha Fund" /></div>
          <div className="form-group"><label className="form-label">Income Purpose</label><select className="form-input form-select"><option>Niyaz</option><option>Sabeel</option><option>Anjuman Fund</option></select></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Target Amount</label><input className="form-input" placeholder="\\u20b9" /></div>
          <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date" /></div>
          <div className="form-group"><label className="form-label">End Date</label><input className="form-input" type="date" /></div>
        </div>
        <button className="btn btn-primary">Publish Campaign</button>
      </div>`));

// ======== INCOME ========
w('income/IncomeHome.jsx', pg('IncomeHome', 'Income Entry', 'Record income from various sources', `
      <div className="stat-cards" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        <div className="stat-card"><div className="stat-icon green"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Today</div><div className="stat-value">\\u20b920,000</div></div></div>
        <div className="stat-card"><div className="stat-icon blue"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">This Week</div><div className="stat-value">\\u20b968,500</div></div></div>
        <div className="stat-card"><div className="stat-icon primary"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">This Month</div><div className="stat-value">\\u20b93,25,500</div></div></div>
      </div>
      <h3 style={{marginBottom:16}}>Quick Actions</h3>
      <div className="grid-3">
        {[['Record Takhmeen Payment','/income/takhmeen','Primary contribution collection'],['Record Voluntary Contribution','/income/voluntary','Non-takhmeen voluntary donations'],['Record Enayat Income','/income/enayat','Enayat organization contributions'],['Record Organization Income','/income/organization','Income from organizations'],['Record Agriculture Income','/income/agriculture','Agricultural land income'],['Record Other Income','/income/other','Miscellaneous income entries']].map(([t,to,d],i)=>(
          <div key={i} className="card" style={{cursor:'pointer'}} onClick={()=>navigate(to)}>
            <h4 style={{marginBottom:4,color:'var(--env-color)'}}>{t}</h4>
            <p style={{fontSize:'0.8125rem',color:'var(--gray-500)'}}>{d}</p>
            <ArrowRight size={16} style={{marginTop:8,color:'var(--gray-400)'}} />
          </div>
        ))}
      </div>`));

w('income/TakhmeenIncomeEntry.jsx', pg('TakhmeenIncomeEntry', 'Record Takhmeen Payment', 'Search Sabeel and record Takhmeen contribution', `
      <div className="card" style={{maxWidth:700}}>
        <div className="form-group"><label className="form-label">Search Sabeel No or ITS ID <span className="required">*</span></label><input className="form-input" placeholder="Enter Sabeel No or ITS ID..." defaultValue="101" /></div>
        <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:20}}>
          <h4 style={{marginBottom:4}}>Shabbir Bhai Cyclewala</h4>
          <p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Sabeel: 101 &middot; ITS: 30410123 &middot; Mauze: Dholka</p>
        </div>
        <h4 style={{marginBottom:12}}>Outstanding Takhmeen Purposes</h4>
        {[['Wajebaat','\\u20b930,000','\\u20b915,000','\\u20b915,000',true],['Fitra','\\u20b95,000','\\u20b90','\\u20b95,000',false],['Zakat','\\u20b915,000','\\u20b915,000','\\u20b90',false]].map(([p,assigned,paid,due,chk],i) => (
          <label key={i} className="form-checkbox" style={{padding:'12px',marginBottom:8,background:'var(--gray-50)',borderRadius:'var(--radius-md)',display:'flex',gap:12}}>
            <input type="checkbox" defaultChecked={chk} />
            <div style={{flex:1}}>
              <div style={{fontWeight:600}}>{p}</div>
              <div style={{fontSize:'0.75rem',color:'var(--gray-500)'}}>Assigned: {assigned} &middot; Paid: {paid} &middot; Due: {due}</div>
            </div>
          </label>
        ))}
        <div className="form-row" style={{marginTop:16}}>
          <div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" defaultValue="15,000" /></div>
          <div className="form-group"><label className="form-label">Payment Mode <span className="required">*</span></label><select className="form-input form-select"><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option></select></div>
        </div>
        <div style={{background:'var(--gray-50)',padding:12,borderRadius:'var(--radius-md)',marginBottom:16,fontSize:'0.8125rem'}}>
          <strong>Mapped Bank Account:</strong> State Bank of India ****4521
        </div>
        <label className="form-checkbox" style={{marginBottom:16}}><input type="checkbox" defaultChecked /> Generate Receipt</label>
        <button className="btn btn-primary btn-lg" onClick={() => showToast('Income entry saved. Receipt REC-2026-0453 generated.')}>Save Entry</button>
      </div>`));

w('income/VoluntaryIncomeEntry.jsx', pg('VoluntaryIncomeEntry', 'Record Voluntary Contribution', 'Non-Takhmeen voluntary income entry', `
      <div className="card" style={{maxWidth:640}}>
        <div className="form-group"><label className="form-label">Income Purpose <span className="required">*</span></label><select className="form-input form-select"><option value="">Select purpose...</option><option>Niyaz</option><option>Sabeel</option><option>Anjuman Fund</option></select></div>
        <div className="form-group"><label className="form-label">Contributor (ITS ID or Sabeel No) <span className="required">*</span></label><input className="form-input" placeholder="Search by ITS ID or Sabeel No..." /></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="\\u20b9" /></div>
          <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option></select></div>
        </div>
        <label className="form-checkbox" style={{marginBottom:16}}><input type="checkbox" defaultChecked /> Generate Receipt</label>
        <button className="btn btn-primary" onClick={() => showToast('Voluntary contribution recorded')}>Save</button>
      </div>`));

w('income/OrgIncomeEntry.jsx', pg('OrgIncomeEntry', 'Record Organization Income', 'Income from organizations', `
      <div className="card" style={{maxWidth:640}}>
        <div className="form-group"><label className="form-label">Organization <span className="required">*</span></label><select className="form-input form-select"><option value="">Select organization...</option><option>Burhani Charitable Trust</option><option>Saifee Hospital Trust</option></select></div>
        <div className="form-group"><label className="form-label">Income Purpose <span className="required">*</span></label><select className="form-input form-select"><option>Anjuman Fund</option><option>Masjid Maintenance</option></select></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="\\u20b9" /></div>
          <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer</option><option>Cheque</option><option>DD</option></select></div>
        </div>
        <div className="form-group"><label className="form-label">Instrument Details</label><input className="form-input" placeholder="Cheque/DD/Reference number" /></div>
        <button className="btn btn-primary" onClick={() => showToast('Organization income recorded')}>Save</button>
      </div>`));

w('income/EnayatIncomeEntry.jsx', pg('EnayatIncomeEntry', 'Record Enayat Income', 'Income from Enayat organizations', `
      <div className="card" style={{maxWidth:640}}>
        <div className="form-group"><label className="form-label">Enayat Organization <span className="required">*</span></label><select className="form-input form-select"><option value="">Select Enayat organization...</option><option>Saifee Burhani Upliftment Trust</option><option>Burhani Foundation</option></select></div>
        <div className="form-group"><label className="form-label">Income Purpose <span className="required">*</span></label><select className="form-input form-select"><option>Masjid Maintenance</option><option>Madrasah Fund</option></select></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="\\u20b9" /></div>
          <div className="form-group"><label className="form-label">Transaction Date</label><input className="form-input" type="date" /></div>
        </div>
        <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2} placeholder="Description..." /></div>
        <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer</option><option>Cheque</option><option>DD</option></select><div className="form-hint">Mumin App not applicable for Enayat</div></div>
        <button className="btn btn-primary" onClick={() => showToast('Enayat income recorded (receipt generated internally)')}>Save</button>
      </div>`));

w('income/AgriIncomeEntry.jsx', pg('AgriIncomeEntry', 'Record Agriculture Income', 'Income from Jamaat-owned agricultural land', `
      <div className="card" style={{maxWidth:640}}>
        <div className="form-group"><label className="form-label">Land Description <span className="required">*</span></label><input className="form-input" placeholder="e.g. Survey No. 45, Dholka Taluka" /></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Season</label><select className="form-input form-select"><option>Kharif</option><option>Rabi</option><option>Zaid</option></select></div>
          <div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="\\u20b9" /></div>
        </div>
        <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Cash</option><option>Bank Transfer</option><option>Cheque</option></select></div>
        <div style={{background:'var(--gray-50)',padding:12,borderRadius:'var(--radius-md)',marginBottom:16,fontSize:'0.8125rem'}}><strong>Ledger Mapping:</strong> Agriculture Income A/c &rarr; BOB ****7890</div>
        <button className="btn btn-primary" onClick={() => showToast('Agriculture income recorded')}>Save</button>
      </div>`));

w('income/OtherIncomeEntry.jsx', pg('OtherIncomeEntry', 'Record Other Income', 'Miscellaneous income entries', `
      <div className="card" style={{maxWidth:640}}>
        <div className="form-group"><label className="form-label">Other Income Purpose <span className="required">*</span></label><select className="form-input form-select"><option>Masjid Maintenance</option><option>Interest Income</option><option>Misc. Income</option></select></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="\\u20b9" /></div>
          <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" /></div>
        </div>
        <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2} placeholder="Description..." /></div>
        <button className="btn btn-primary" onClick={() => showToast('Other income recorded')}>Save</button>
      </div>`));

w('income/IncomeListing.jsx', pg('IncomeListing', 'Income Listing', 'All income entries recorded in this environment', `
      <div className="data-table-wrapper">
        <div className="data-table-toolbar">
          <div className="search-box"><Search size={16} /><input placeholder="Search by Sabeel No, ITS ID, Receipt No..." /></div>
          <button className="filter-btn"><Filter size={14} /> Date Range</button>
          <button className="filter-btn"><Filter size={14} /> Purpose</button>
          <button className="filter-btn"><Filter size={14} /> Mode</button>
          <div style={{marginLeft:'auto',display:'flex',gap:8}}>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowAudit(true)}><History size={16}/> Audit Trail</button>
            <button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button>
          </div>
        </div>
        <table className="data-table">
          <thead><tr><th>Date</th><th>Sabeel</th><th>ITS ID</th><th>Name</th><th>Purpose</th><th>Amount</th><th>Mode</th><th>Receipt No</th><th>Status</th></tr></thead>
          <tbody>
            {[['01-Apr-2026','101','30410123','Shabbir Bhai','Wajebaat','\\u20b915,000','UPI','REC-2026-0451','Confirmed'],['01-Apr-2026','102','30410456','Mustafa Bhai','Fitra','\\u20b95,000','Cash','REC-2026-0452','Confirmed'],['31-Mar-2026','103','30410789','Yusuf Bhai','Zakat','\\u20b925,000','Cheque','REC-2026-0450','Confirmed'],['31-Mar-2026','104','30411012','Hatim Bhai','Niyaz','\\u20b92,000','Cash','REC-2026-0449','Confirmed'],['30-Mar-2026','105','30411345','Juzer Bhai','Wajebaat','\\u20b910,000','Bank Transfer','REC-2026-0448','Confirmed'],['30-Mar-2026','107','30411901','Taiyeb Bhai','Sabeel','\\u20b93,500','UPI','REC-2026-0447','Pending']].map(([dt,sn,its,nm,p,a,m,r,s],i) => (
              <tr key={i} className="clickable"><td>{dt}</td><td style={{fontWeight:600}}>{sn}</td><td>{its}</td><td>{nm}</td><td>{p}</td><td style={{fontWeight:600}}>{a}</td><td>{m}</td><td style={{fontSize:'0.8125rem'}}>{r}</td><td><span className={'badge badge-'+(s==='Confirmed'?'approved':'pending')}>{s}</span></td></tr>
            ))}
          </tbody>
        </table>
        <div className="table-pagination"><span>Showing 1-6 of 6 entries</span><span>Page 1 of 1</span></div>
      </div>`));

w('income/ReceiptCancellation.jsx', pg('ReceiptCancellation', 'Receipt Cancellation & Data Fix', 'Request receipt cancellation or data correction', `
      <div className="card" style={{maxWidth:640}}>
        <div className="form-group"><label className="form-label">Receipt No <span className="required">*</span></label><input className="form-input" placeholder="e.g. REC-2026-0451" /></div>
        <div className="form-group"><label className="form-label">Reason for Cancellation <span className="required">*</span></label><textarea className="form-input" rows={3} placeholder="Explain the reason..." /></div>
        <div className="form-group"><label className="form-label">Correction Details (if data fix)</label><textarea className="form-input" rows={2} placeholder="What needs to be corrected..." /></div>
        <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>Submit for Approval</button>
      </div>`));

w('income/SuspenseManagement.jsx', pg('SuspenseManagement', 'Suspense Entry Management', 'Unmatched bank credits awaiting resolution', `
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead><tr><th>Bank Reference</th><th>Date</th><th>Amount</th><th>Suggested Match</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td style={{fontSize:'0.8125rem'}}>IMPS/2026/03/112233</td><td>30-Mar-2026</td><td style={{fontWeight:600}}>\\u20b98,200</td><td><span className="badge badge-pending">Unmatched</span></td>
              <td><button className="btn btn-primary btn-sm">Resolve</button></td></tr>
          </tbody>
        </table>
        <div className="empty-state" style={{padding:'40px 16px'}}>
          <p style={{color:'var(--gray-500)',fontSize:'0.875rem'}}>1 suspense entry remaining</p>
        </div>
      </div>`));

w('income/IncomeDashboard.jsx', `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
export default function IncomeDashboard() {
  const byPurpose = [{name:'Wajebaat',value:185000},{name:'Fitra',value:45000},{name:'Zakat',value:65000},{name:'Niyaz',value:18500},{name:'Sabeel',value:12000}];
  const cashDigital = [{name:'Cash',value:40},{name:'Digital',value:60}];
  const trend = [{m:'Oct',v:225},{m:'Nov',v:280},{m:'Dec',v:350},{m:'Jan',v:310},{m:'Feb',v:265},{m:'Mar',v:325}];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income Dashboard</h1><p className="page-subtitle">Visual overview of income collections</p></div></div>
    <div className="grid-2">
      <div className="chart-container"><div className="chart-header"><span className="chart-title">Income by Purpose</span></div>
        <ResponsiveContainer width="100%" height={250}><BarChart data={byPurpose}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}} tickFormatter={v=>'\\u20b9'+(v/1000)+'k'}/><Tooltip formatter={v=>'\\u20b9'+v.toLocaleString()}/><Bar dataKey="value" fill="#0B6E4F" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
      </div>
      <div className="chart-container"><div className="chart-header"><span className="chart-title">Cash vs Digital</span></div>
        <ResponsiveContainer width="100%" height={250}><PieChart><Pie data={cashDigital} cx="50%" cy="50%" outerRadius={80} innerRadius={50} dataKey="value" label={({name,value})=>name+' '+value+'%'}><Cell fill="#D97706"/><Cell fill="#0B6E4F"/></Pie><Tooltip/></PieChart></ResponsiveContainer>
      </div>
    </div>
    <div className="chart-container" style={{marginTop:20}}><div className="chart-header"><span className="chart-title">Monthly Income Trend (\\u20b9 thousands)</span></div>
      <ResponsiveContainer width="100%" height={250}><LineChart data={trend}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/><XAxis dataKey="m" tick={{fontSize:12}}/><YAxis tick={{fontSize:12}}/><Tooltip/><Line type="monotone" dataKey="v" stroke="#0B6E4F" strokeWidth={2} dot={{r:4}}/></LineChart></ResponsiveContainer>
    </div>
  </div>);
}`);

console.log('Created all admin, takhmeen, and income pages');
"
