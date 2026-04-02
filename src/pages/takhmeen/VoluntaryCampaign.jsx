import { Plus } from 'lucide-react';
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
}