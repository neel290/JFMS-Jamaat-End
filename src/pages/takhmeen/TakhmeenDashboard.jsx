import { useNavigate } from 'react-router-dom';
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
}