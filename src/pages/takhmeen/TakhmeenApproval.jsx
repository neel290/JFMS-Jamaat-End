import { Check, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function TakhmeenApproval() {
  const { takhmeenGroups, takhmeens, sabeels, approveTakhmeenGroup, rejectTakhmeenGroup, approveTakhmeen, rejectTakhmeen } = useStore();
  
  // Combine draft groups and pending takhmeen overrides for approval
  const items = [
    ...takhmeenGroups.filter(g => g.status === 'Draft').map(g => ({
      id: g.id, type: 'Group', details: `${g.name} — ${g.sabeelCount} Sabeels`, user: 'Husain Johar', date: new Date().toLocaleDateString('en-GB')
    })),
    ...takhmeens.filter(t => t.status === 'Pending Approval').map(t => {
      const s = sabeels.find(x => x.id === t.sabeelId);
      return { id: t.id, type: 'Override', details: `Sabeel ${s?.sabeelNo || 'Unknown'} — ${t.pendingEditReason || 'Amount change'}`, user: 'Administrator', date: new Date().toLocaleDateString('en-GB') };
    })
  ];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Takhmeen Approval Queue</h1><p className="page-subtitle">Approve or reject pending changes</p></div></div>
    <div className="data-table-wrapper"><table className="data-table">
      <thead><tr><th>Type</th><th>Details</th><th>Submitted By</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>{items.map((item,i) => (
        <tr key={i}>
          <td><span className="badge badge-draft">{item.type}</span></td>
          <td style={{fontSize:'0.875rem'}}>{item.details}</td>
          <td>{item.user}</td>
          <td>{item.date}</td>
          <td style={{display:'flex',gap:8}}>
            <button className="btn btn-success btn-sm" onClick={() => {
              if(item.type === 'Group') approveTakhmeenGroup(item.id);
              else approveTakhmeen(item.id);
            }}><Check size={14}/> Approve</button>
            <button className="btn btn-danger btn-sm" onClick={() => {
              if(item.type === 'Group') rejectTakhmeenGroup(item.id);
              else rejectTakhmeen(item.id);
            }}><X size={14}/> Reject</button>
          </td>
        </tr>
      ))}
      {items.length === 0 && <tr><td colSpan="5" style={{textAlign:'center', padding: '20px', color: 'var(--gray-500)'}}>No pending approvals in queue.</td></tr>}
      </tbody>
    </table></div>
  </div>);
}