const fs = require('fs'), p = require('path');
const B = 'c:/Office/JFMS/src/pages';
function w(r, c) { fs.writeFileSync(p.join(B, r), c); console.log('RICH:' + r); }

// ============ TAKHMEEN ============
w('takhmeen/TakhmeenDashboard.jsx', `import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2, Clock, AlertTriangle, IndianRupee } from 'lucide-react';
export default function TakhmeenDashboard() {
  const navigate = useNavigate();
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Takhmeen Dashboard</h1><p className="page-subtitle">Overview of Takhmeen collections for 1445H</p></div></div>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-icon primary"><FileText size={20}/></div><div className="stat-content"><div className="stat-label">Total Sabeel Nos</div><div className="stat-value">108</div></div></div>
      <div className="stat-card"><div className="stat-icon green"><CheckCircle2 size={20}/></div><div className="stat-content"><div className="stat-label">Takhmeen Assigned</div><div className="stat-value">₹63,30,000</div></div></div>
      <div className="stat-card"><div className="stat-icon blue"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Collected</div><div className="stat-value">₹45,85,000</div><div className="stat-trend up" style={{color:'var(--color-success)'}}>72.4%</div></div></div>
      <div className="stat-card"><div className="stat-icon amber"><Clock size={20}/></div><div className="stat-content"><div className="stat-label">Outstanding</div><div className="stat-value">₹17,45,000</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><AlertTriangle size={20}/></div><div className="stat-content"><div className="stat-label">Pending Approvals</div><div className="stat-value">3</div></div></div>
    </div>
    <div className="card"><div className="card-header"><h3 className="card-title">Active Takhmeen Year: 1445H</h3><span className="badge badge-active">Active</span></div>
      <div style={{marginTop:12,height:8,background:'var(--gray-200)',borderRadius:4,marginBottom:16}}><div style={{width:'72.4%',height:'100%',background:'var(--color-success)',borderRadius:4}}/></div>
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <button className="btn btn-primary" onClick={()=>navigate('/takhmeen/groups')}>Manage Groups</button>
        <button className="btn btn-secondary" onClick={()=>navigate('/takhmeen/approvals')}>Approval Queue (3)</button>
        <button className="btn btn-secondary" onClick={()=>navigate('/takhmeen/override')}>Individual Override</button>
        <button className="btn btn-secondary" onClick={()=>navigate('/takhmeen/campaigns')}>Campaigns</button>
        <button className="btn btn-secondary" onClick={()=>navigate('/takhmeen/schedule')}>E-Mandate Setup</button>
      </div>
    </div>
  </div>);
}`);

w('takhmeen/TakhmeenGroups.jsx', `import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit } from 'lucide-react';
export default function TakhmeenGroups() {
  const navigate = useNavigate();
  const groups = [['Standard Takhmeen 1445H',85,'Wajebaat, Fitra, Zakat','₹42,50,000','Approved'],['Premium Takhmeen 1445H',23,'Wajebaat, Fitra, Zakat, Niyaz','₹18,40,000','Approved'],['New Members 1445H',8,'Wajebaat, Fitra','₹2,40,000','Draft']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Takhmeen Groups</h1><p className="page-subtitle">Manage contribution groups for 1445H</p></div>
      <div className="page-actions"><button className="btn btn-primary" onClick={()=>navigate('/takhmeen/groups/create')}><Plus size={16}/> Create New Group</button></div></div>
    <div className="data-table-wrapper"><table className="data-table">
      <thead><tr><th>Group Name</th><th>Sabeel Count</th><th>Purposes</th><th>Total Amount</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{groups.map(([n,c,pur,a,s],i)=>(<tr key={i}><td style={{fontWeight:500}}>{n}</td><td>{c}</td><td style={{fontSize:'0.8125rem'}}>{pur}</td><td style={{fontWeight:600}}>{a}</td><td><span className={'badge badge-'+(s==='Approved'?'approved':'draft')}>{s}</span></td><td><button className="btn btn-ghost btn-sm"><Eye size={14}/></button><button className="btn btn-ghost btn-sm"><Edit size={14}/></button></td></tr>))}</tbody>
    </table></div>
  </div>);
}`);

w('takhmeen/CreateTakhmeenGroup.jsx', `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
export default function CreateTakhmeenGroup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Create Takhmeen Group</h1><p className="page-subtitle">Step-by-step wizard</p></div></div>
    <div className="wizard-steps">{['Name & Year','Define Structure','Select Sabeels','Review & Submit'].map((s,i)=>(
      <div key={i} className={'wizard-step '+(i+1<step?'completed':i+1===step?'active':'')}><div className="wizard-step-number">{i+1<step?'✓':i+1}</div><span className="wizard-step-label">{s}</span></div>
    ))}</div>
    <div className="card" style={{maxWidth:640}}>
      {step===1&&<div><div className="form-group"><label className="form-label">Group Name <span className="required">*</span></label><input className="form-input" placeholder="e.g. Standard Takhmeen 1445H"/></div><div className="form-group"><label className="form-label">Takhmeen Year</label><select className="form-input form-select"><option>1445H (2024-2025)</option></select></div><button className="btn btn-primary" onClick={()=>setStep(2)}>Next: Define Structure</button></div>}
      {step===2&&<div><h4 style={{marginBottom:16}}>Income Purposes & Amounts</h4>{[['Wajebaat','₹30,000'],['Fitra','₹5,000'],['Zakat','₹15,000']].map(([pu,am],i)=>(<div key={i} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}><input className="form-input" value={pu} readOnly style={{flex:1}}/><input className="form-input" value={am} style={{width:150}} readOnly/><button className="btn btn-ghost btn-sm"><X size={14}/></button></div>))}<button className="btn btn-secondary btn-sm" style={{marginBottom:16}}>+ Add Purpose</button><div style={{display:'flex',gap:12}}><button className="btn btn-secondary" onClick={()=>setStep(1)}>Back</button><button className="btn btn-primary" onClick={()=>setStep(3)}>Next</button></div></div>}
      {step===3&&<div><h4 style={{marginBottom:16}}>Select Sabeel Nos</h4>{['101 — Shabbir Bhai','102 — Mustafa Bhai','103 — Yusuf Bhai','104 — Hatim Bhai','105 — Juzer Bhai'].map(s=>(<label key={s} className="form-checkbox" style={{marginBottom:8}}><input type="checkbox" defaultChecked/>{s}</label>))}<div style={{display:'flex',gap:12,marginTop:16}}><button className="btn btn-secondary" onClick={()=>setStep(2)}>Back</button><button className="btn btn-primary" onClick={()=>setStep(4)}>Next: Review</button></div></div>}
      {step===4&&<div><h4 style={{marginBottom:16}}>Review Summary</h4><div style={{background:'var(--gray-50)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}>{[['Group','Standard Takhmeen 1445H'],['Year','1445H'],['Purposes','Wajebaat, Fitra, Zakat'],['Sabeels','5'],['Total','₹2,50,000']].map(([l,v])=>(<div key={l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}><span style={{color:'var(--gray-500)',fontSize:'0.875rem'}}>{l}</span><span style={{fontWeight:600,fontSize:'0.875rem'}}>{v}</span></div>))}</div><div style={{display:'flex',gap:12}}><button className="btn btn-secondary" onClick={()=>setStep(3)}>Back</button><button className="btn btn-primary" onClick={()=>{setToast('Group submitted for approval');setTimeout(()=>navigate('/takhmeen/groups'),1500)}}>Submit for Approval</button></div></div>}
    </div>
  </div>);
}`);

w('takhmeen/TakhmeenOverride.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function TakhmeenOverride() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Individual Takhmeen Override</h1><p className="page-subtitle">Override Takhmeen for a specific Sabeel</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group"><label className="form-label">Sabeel No <span className="required">*</span></label><input className="form-input" defaultValue="101"/></div>
      <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}><h4 style={{marginBottom:4}}>Shabbir Bhai Cyclewala (Sabeel 101)</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Group: Standard Takhmeen 1445H</p></div>
      <h4 style={{marginBottom:12}}>Current Structure</h4>
      {[['Wajebaat','₹30,000'],['Fitra','₹5,000'],['Zakat','₹15,000']].map(([pu,am],i)=>(<div key={i} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}><span style={{flex:1,fontSize:'0.875rem'}}>{pu}</span><input className="form-input" defaultValue={am} style={{width:150}}/></div>))}
      <div className="form-group" style={{marginTop:16}}><label className="form-label">Override Reason <span className="required">*</span></label><textarea className="form-input" rows={3} placeholder="Reason for override..."/></div>
      <button className="btn btn-primary" onClick={()=>setToast('Override submitted for approval')}>Submit for Approval</button>
    </div>
  </div>);
}`);

w('takhmeen/TakhmeenApproval.jsx', `import { Check, X } from 'lucide-react';
export default function TakhmeenApproval() {
  const items = [['Group','New Members 1445H — 8 Sabeels','Taher Bhai','30-Mar-2026'],['Override','Sabeel 101 — Wajebaat → ₹35,000','Taher Bhai','31-Mar-2026'],['Override','Sabeel 105 — Added Niyaz purpose','Burhanuddin','01-Apr-2026']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Takhmeen Approval Queue</h1><p className="page-subtitle">Approve or reject pending changes</p></div></div>
    <div className="data-table-wrapper"><table className="data-table">
      <thead><tr><th>Type</th><th>Details</th><th>Submitted By</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>{items.map(([t,d,u,dt],i)=>(<tr key={i}><td><span className="badge badge-draft">{t}</span></td><td style={{fontSize:'0.875rem'}}>{d}</td><td>{u}</td><td>{dt}</td><td style={{display:'flex',gap:8}}><button className="btn btn-success btn-sm"><Check size={14}/> Approve</button><button className="btn btn-danger btn-sm"><X size={14}/> Reject</button></td></tr>))}</tbody>
    </table></div>
  </div>);
}`);

w('takhmeen/TakhmeenSchedule.jsx', `export default function TakhmeenSchedule() {
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Payment Schedule (E-Mandate)</h1><p className="page-subtitle">Set up recurring payment mandates for Sabeels</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group"><label className="form-label">Sabeel No <span className="required">*</span></label><input className="form-input" placeholder="Search Sabeel No..."/></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Payment Frequency</label><select className="form-input form-select"><option>Monthly</option><option>Quarterly</option><option>Half-yearly</option></select></div><div className="form-group"><label className="form-label">Amount per Instalment</label><input className="form-input" defaultValue="₹4,167"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date"/></div><div className="form-group"><label className="form-label">End Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-group"><label className="form-label">Mandate Type</label><select className="form-input form-select"><option>e-NACH</option><option>UPI Autopay</option></select></div>
      <button className="btn btn-primary">Generate Mandate</button>
    </div>
  </div>);
}`);

w('takhmeen/VoluntaryCampaign.jsx', `import { Plus } from 'lucide-react';
export default function VoluntaryCampaign() {
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Voluntary Campaigns</h1><p className="page-subtitle">Create and manage voluntary contribution campaigns</p></div>
      <div className="page-actions"><button className="btn btn-primary"><Plus size={16}/> Create Campaign</button></div></div>
    <div className="card" style={{marginBottom:16}}><div className="card-header"><h3 className="card-title">Ramadan Niyaz Drive 1445H</h3><span className="badge badge-active">Active</span></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginTop:8}}>{[['Target','₹5,00,000'],['Collected','₹3,25,000'],['Progress','65%'],['Participants','45']].map(([l,v])=>(<div key={l}><div style={{fontSize:'0.75rem',color:'var(--gray-500)'}}>{l}</div><div style={{fontWeight:700}}>{v}</div></div>))}</div>
      <div style={{marginTop:12,height:8,background:'var(--gray-200)',borderRadius:4}}><div style={{width:'65%',height:'100%',background:'var(--color-success)',borderRadius:4}}/></div>
    </div>
    <div className="card" style={{background:'var(--gray-50)'}}><h4 style={{marginBottom:16}}>Create New Campaign</h4>
      <div className="form-row"><div className="form-group"><label className="form-label">Campaign Name <span className="required">*</span></label><input className="form-input" placeholder="e.g. Eid-ul-Adha Fund"/></div><div className="form-group"><label className="form-label">Income Purpose</label><select className="form-input form-select"><option>Niyaz</option><option>Sabeel</option><option>Anjuman Fund</option></select></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Target Amount</label><input className="form-input" placeholder="₹"/></div><div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date"/></div><div className="form-group"><label className="form-label">End Date</label><input className="form-input" type="date"/></div></div>
      <button className="btn btn-primary">Publish Campaign</button>
    </div>
  </div>);
}`);

// ============ INCOME ============
w('income/IncomeHome.jsx', `import { useNavigate } from 'react-router-dom';
import { IndianRupee, ArrowRight } from 'lucide-react';
export default function IncomeHome() {
  const navigate = useNavigate();
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income Entry</h1><p className="page-subtitle">Record income from various sources</p></div></div>
    <div className="stat-cards" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
      <div className="stat-card"><div className="stat-icon green"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Today</div><div className="stat-value">₹20,000</div></div></div>
      <div className="stat-card"><div className="stat-icon blue"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">This Week</div><div className="stat-value">₹68,500</div></div></div>
      <div className="stat-card"><div className="stat-icon primary"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">This Month</div><div className="stat-value">₹3,25,500</div></div></div>
    </div>
    <h3 style={{marginBottom:16}}>Quick Actions</h3>
    <div className="grid-3">{[['Record Takhmeen Payment','/income/takhmeen','Primary contribution collection'],['Voluntary Contribution','/income/voluntary','Non-takhmeen voluntary donations'],['Enayat Income','/income/enayat','Enayat organization contributions'],['Organization Income','/income/organization','Income from organizations'],['Agriculture Income','/income/agriculture','Agricultural land income'],['Other Income','/income/other','Miscellaneous income entries']].map(([t,to,d],i)=>(
      <div key={i} className="card" style={{cursor:'pointer'}} onClick={()=>navigate(to)}><h4 style={{marginBottom:4,color:'var(--env-color)'}}>{t}</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-500)'}}>{d}</p><ArrowRight size={16} style={{marginTop:8,color:'var(--gray-400)'}}/></div>
    ))}</div>
  </div>);
}`);

w('income/TakhmeenIncomeEntry.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function TakhmeenIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Record Takhmeen Payment</h1><p className="page-subtitle">Search Sabeel and record Takhmeen contribution</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Search Sabeel No or ITS ID <span className="required">*</span></label><input className="form-input" defaultValue="101" placeholder="Enter Sabeel No or ITS ID..."/></div>
      <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:20}}><h4 style={{marginBottom:4}}>Shabbir Bhai Cyclewala</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Sabeel: 101 · ITS: 30410123 · Mauze: Dholka</p></div>
      <h4 style={{marginBottom:12}}>Outstanding Takhmeen Purposes</h4>
      {[['Wajebaat','₹30,000','₹15,000','₹15,000',true],['Fitra','₹5,000','₹0','₹5,000',false],['Zakat','₹15,000','₹15,000','₹0',false]].map(([pu,as,pd,due,chk],i)=>(
        <label key={i} className="form-checkbox" style={{padding:12,marginBottom:8,background:'var(--gray-50)',borderRadius:'var(--radius-md)',display:'flex',gap:12}}>
          <input type="checkbox" defaultChecked={chk}/><div style={{flex:1}}><div style={{fontWeight:600}}>{pu}</div><div style={{fontSize:'0.75rem',color:'var(--gray-500)'}}>Assigned: {as} · Paid: {pd} · Due: {due}</div></div>
        </label>
      ))}
      <div className="form-row" style={{marginTop:16}}><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" defaultValue="15,000"/></div><div className="form-group"><label className="form-label">Payment Mode <span className="required">*</span></label><select className="form-input form-select"><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option></select></div></div>
      <div style={{background:'var(--gray-50)',padding:12,borderRadius:'var(--radius-md)',marginBottom:16,fontSize:'0.8125rem'}}><strong>Mapped Bank:</strong> State Bank of India ****4521</div>
      <label className="form-checkbox" style={{marginBottom:16}}><input type="checkbox" defaultChecked/> Generate Receipt</label>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Entry saved. Receipt REC-2026-0453 generated.')}>Save Entry</button>
    </div>
  </div>);
}`);

w('income/IncomeListing.jsx', `import { Search, Filter, Download, History } from 'lucide-react';
export default function IncomeListing() {
  const entries = [['01-Apr-2026','101','30410123','Shabbir Bhai','Wajebaat','₹15,000','UPI','REC-2026-0451','Confirmed'],['01-Apr-2026','102','30410456','Mustafa Bhai','Fitra','₹5,000','Cash','REC-2026-0452','Confirmed'],['31-Mar-2026','103','30410789','Yusuf Bhai','Zakat','₹25,000','Cheque','REC-2026-0450','Confirmed'],['31-Mar-2026','104','30411012','Hatim Bhai','Niyaz','₹2,000','Cash','REC-2026-0449','Confirmed'],['30-Mar-2026','105','30411345','Juzer Bhai','Wajebaat','₹10,000','Bank Transfer','REC-2026-0448','Confirmed'],['30-Mar-2026','107','30411901','Taiyeb Bhai','Sabeel','₹3,500','UPI','REC-2026-0447','Pending']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income Listing</h1><p className="page-subtitle">All income entries recorded</p></div></div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search by Sabeel, ITS, Receipt No..."/></div><button className="filter-btn"><Filter size={14}/> Date Range</button><button className="filter-btn"><Filter size={14}/> Purpose</button><button className="filter-btn"><Filter size={14}/> Mode</button><div style={{marginLeft:'auto',display:'flex',gap:8}}><button className="btn btn-secondary btn-sm"><History size={16}/></button><button className="btn btn-secondary btn-sm"><Download size={14}/> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Date</th><th>Sabeel</th><th>ITS</th><th>Name</th><th>Purpose</th><th>Amount</th><th>Mode</th><th>Receipt</th><th>Status</th></tr></thead>
        <tbody>{entries.map(([dt,sn,its,nm,p,a,m,r,s],i)=>(<tr key={i} className="clickable"><td>{dt}</td><td style={{fontWeight:600}}>{sn}</td><td>{its}</td><td>{nm}</td><td>{p}</td><td style={{fontWeight:600}}>{a}</td><td>{m}</td><td style={{fontSize:'0.8125rem'}}>{r}</td><td><span className={'badge badge-'+(s==='Confirmed'?'approved':'pending')}>{s}</span></td></tr>))}</tbody>
      </table><div className="table-pagination"><span>Showing 1-6 of 6</span><span>Page 1 of 1</span></div>
    </div>
  </div>);
}`);

w('income/IncomeDashboard.jsx', `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
export default function IncomeDashboard() {
  const byPurpose = [{name:'Wajebaat',v:185000},{name:'Fitra',v:45000},{name:'Zakat',v:65000},{name:'Niyaz',v:18500},{name:'Sabeel',v:12000}];
  const split=[{name:'Cash',value:40},{name:'Digital',value:60}];
  const trend=[{m:'Oct',v:225},{m:'Nov',v:280},{m:'Dec',v:350},{m:'Jan',v:310},{m:'Feb',v:265},{m:'Mar',v:325}];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income Dashboard</h1><p className="page-subtitle">Visual overview of income collections</p></div></div>
    <div className="grid-2">
      <div className="chart-container"><div className="chart-header"><span className="chart-title">Income by Purpose</span></div>
        <ResponsiveContainer width="100%" height={250}><BarChart data={byPurpose}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Bar dataKey="v" fill="#0B6E4F" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
      <div className="chart-container"><div className="chart-header"><span className="chart-title">Cash vs Digital</span></div>
        <ResponsiveContainer width="100%" height={250}><PieChart><Pie data={split} cx="50%" cy="50%" outerRadius={80} innerRadius={50} dataKey="value" label={({name,value})=>name+' '+value+'%'}><Cell fill="#D97706"/><Cell fill="#0B6E4F"/></Pie></PieChart></ResponsiveContainer></div>
    </div>
    <div className="chart-container" style={{marginTop:20}}><div className="chart-header"><span className="chart-title">Monthly Trend (₹ thousands)</span></div>
      <ResponsiveContainer width="100%" height={250}><LineChart data={trend}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/><XAxis dataKey="m"/><YAxis/><Tooltip/><Line type="monotone" dataKey="v" stroke="#0B6E4F" strokeWidth={2} dot={{r:4}}/></LineChart></ResponsiveContainer></div>
  </div>);
}`);

// Simple form pages
const simpleForms = [
  ['income/VoluntaryIncomeEntry.jsx','VoluntaryIncomeEntry','Record Voluntary Contribution','Non-Takhmeen voluntary income','Income Purpose','Niyaz|Sabeel|Anjuman Fund','Contributor (ITS/Sabeel)'],
  ['income/OrgIncomeEntry.jsx','OrgIncomeEntry','Organization Income','Income from organizations','Organization','Burhani Charitable Trust|Saifee Hospital Trust','Income Purpose'],
  ['income/EnayatIncomeEntry.jsx','EnayatIncomeEntry','Enayat Income','Income from Enayat organizations','Enayat Organization','Saifee Burhani Upliftment Trust|Burhani Foundation','Income Purpose'],
  ['income/AgriIncomeEntry.jsx','AgriIncomeEntry','Agriculture Income','From Jamaat-owned agricultural land','Land Description','','Season'],
  ['income/OtherIncomeEntry.jsx','OtherIncomeEntry','Other Income','Miscellaneous income entries','Other Income Purpose','Masjid Maintenance|Interest Income|Misc Income',''],
  ['income/ReceiptCancellation.jsx','ReceiptCancellation','Receipt Cancellation','Request cancellation or data correction','Receipt No','','Reason'],
  ['income/SuspenseManagement.jsx','SuspenseManagement','Suspense Entry Management','Unmatched bank credits awaiting resolution','','',''],
];
simpleForms.forEach(([file,name,title,sub])=>{
  // Keep existing stubs for these simpler pages
});

console.log('Takhmeen & Income pages enriched');
