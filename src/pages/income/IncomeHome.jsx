import { useNavigate } from 'react-router-dom';
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
}