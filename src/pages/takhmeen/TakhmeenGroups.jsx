import { useNavigate } from 'react-router-dom';
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
}