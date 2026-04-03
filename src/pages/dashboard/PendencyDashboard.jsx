import React from 'react';
import { useStore } from '../../store/useStore';
import { Clock, AlertTriangle, FileText, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PendencyDashboard() {
  const navigate = useNavigate();
  const { payments, takhmeens, suspense } = useStore();

  const pendingActions = [];
  
  const pendingPayments = payments.filter(p => p.status === 'Pending Approval');
  if (pendingPayments.length > 0) {
     pendingActions.push({
        id: 'PA1', icon: Clock, color: 'amber', module: 'Payments',
        text: `${pendingPayments.length} vendor payments awaiting execution`,
        onClick: () => navigate('/payments')
     });
  }

  const draftTakhmeens = takhmeens.filter(t => t.status === 'Draft' || t.status === 'Pending Approval');
  if (draftTakhmeens.length > 0) {
     pendingActions.push({
        id: 'PA2', icon: FileText, color: 'blue', module: 'Takhmeen',
        text: `${draftTakhmeens.length} Takhmeens awaiting Aamil approval`,
        onClick: () => navigate('/takhmeen/approval')
     });
  }

  const unresolvedSuspense = suspense.filter(s => s.status === 'Unresolved');
  if (unresolvedSuspense.length > 0) {
     pendingActions.push({
        id: 'PA3', icon: AlertTriangle, color: 'red', module: 'Compliance',
        text: `${unresolvedSuspense.length} unresolved suspense entries require attention`,
        onClick: () => navigate('/income/suspense')
     });
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Pendency Dashboard</h1>
          <p className="page-subtitle">Track and resolve outstanding items across all modules</p>
        </div>
      </div>

      <div className="grid-2">
         {/* PENDING ACTIONS WIDGET */}
         <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
           <div className="card-header" style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)', background: '#F8FAFC' }}>
             <h3 className="card-title">Pending Action Queue</h3>
             <span className="badge badge-pending">{pendingActions.length} Actions</span>
           </div>
           <div>
             {pendingActions.length === 0 ? (
                <div style={{padding: 40, textAlign:'center', color:'var(--gray-500)'}}>No pending actions. You're all caught up!</div>
             ) : (
                pendingActions.map((item) => (
                  <div key={item.id} onClick={item.onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--gray-100)', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#F1F5F9'} onMouseOut={e=>e.currentTarget.style.background='white'}>
                    <div className={`stat-icon ${item.color}`} style={{ width: 36, height: 36, flexShrink:0 }}>
                      <item.icon size={18} />
                    </div>
                    <div style={{ flex: 1, display:'flex', flexDirection:'column', gap:4 }}>
                       <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.text}</span>
                       <span style={{ fontSize: '0.75rem', color:'var(--gray-500)' }}>Click to resolve</span>
                    </div>
                    <span className="badge badge-pending" style={{fontSize:'0.65rem'}}>{item.module}</span>
                    <ArrowUpRight size={16} style={{ color: 'var(--gray-400)' }} />
                  </div>
                ))
             )}
           </div>
         </div>
      </div>
    </div>
  );
}
