import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Clock, ArrowRight, IndianRupee } from 'lucide-react';
export default function ReconDashboard() {
  const navigate = useNavigate();
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Reconciliation Dashboard</h1><p className="page-subtitle">Bank reconciliation status overview</p></div></div>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-icon green"><CheckCircle2 size={20}/></div><div className="stat-content"><div className="stat-label">Reconciled</div><div className="stat-value">142</div></div></div>
      <div className="stat-card"><div className="stat-icon amber"><Clock size={20}/></div><div className="stat-content"><div className="stat-label">Pending</div><div className="stat-value">8</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><AlertTriangle size={20}/></div><div className="stat-content"><div className="stat-label">Suspense</div><div className="stat-value">1</div></div></div>
      <div className="stat-card"><div className="stat-icon blue"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Net Difference</div><div className="stat-value">₹8,200</div></div></div>
    </div>
    <div className="grid-2" style={{marginTop:8}}>
      <div className="card" style={{cursor:'pointer'}} onClick={()=>navigate('/reconciliation/auto')}><h4>Auto Reconciliation (H2H)</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-500)',marginTop:4}}>Auto-match transactions from bank statement feed</p><ArrowRight size={16} style={{marginTop:12,color:'var(--gray-400)'}}/></div>
      <div className="card" style={{cursor:'pointer'}} onClick={()=>navigate('/reconciliation/manual')}><h4>Manual Reconciliation</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-500)',marginTop:4}}>Upload bank statement and match manually</p><ArrowRight size={16} style={{marginTop:12,color:'var(--gray-400)'}}/></div>
    </div>
  </div>);
}