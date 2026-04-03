import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function TakhmeenGroups() {
  const navigate = useNavigate();
  const { takhmeenGroups, incomePurposes } = useStore();
  
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Takhmeen Groups</h1><p className="page-subtitle">Manage contribution groups for 1445H</p></div>
      <div className="page-actions"><button className="btn btn-primary" onClick={()=>navigate('/takhmeen/groups/create')}><Plus size={16}/> Create New Group</button></div></div>
    <div className="data-table-wrapper"><table className="data-table">
      <thead><tr><th>Group Name</th><th>Sabeel Count</th><th>Purposes</th><th>Total Amount</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{takhmeenGroups.map((g,i) => {
        const purposesString = g.purposes.map(p => {
          const matched = incomePurposes.find(ip => ip.id === p.purposeId);
          return matched ? matched.name : 'Unknown';
        }).join(', ');
        const totalAmount = g.purposes.reduce((sum, p) => sum + p.amount, 0) * g.sabeelCount;
        return (
          <tr key={i}>
            <td style={{fontWeight:500}}>{g.name}</td>
            <td>{g.sabeelCount}</td>
            <td style={{fontSize:'0.8125rem'}}>{purposesString}</td>
            <td style={{fontWeight:600}}>₹{totalAmount.toLocaleString('en-IN')}</td>
            <td><span className={'badge badge-'+(g.status==='Approved'?'active':g.status==='Draft'?'pending':'critical')}>{g.status}</span></td>
            <td><button className="btn btn-ghost btn-sm"><Eye size={14}/></button><button className="btn btn-ghost btn-sm"><Edit size={14}/></button></td>
          </tr>
        );
      })}</tbody>
    </table></div>
  </div>);
}