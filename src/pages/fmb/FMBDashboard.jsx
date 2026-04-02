import { useNavigate } from 'react-router-dom';
import { IndianRupee, CheckCircle2, Clock, AlertTriangle, ArrowRight, ShoppingCart, Package, FileText, BarChart3 } from 'lucide-react';
export default function FMBDashboard() {
  const navigate = useNavigate();
  return (<div>
    <div className="page-header"><div><h1 className="page-title">FMB Dashboard</h1><p className="page-subtitle">Faiz-ul-Mawaid-il-Burhaniyah operations overview</p></div></div>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-icon green"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Thali Collections</div><div className="stat-value">₹4,85,000</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Operational Cost</div><div className="stat-value">₹3,20,000</div></div></div>
      <div className="stat-card"><div className="stat-icon amber"><ShoppingCart size={20}/></div><div className="stat-content"><div className="stat-label">Open POs</div><div className="stat-value">3</div></div></div>
      <div className="stat-card"><div className="stat-icon blue"><Package size={20}/></div><div className="stat-content"><div className="stat-label">Low Stock Items</div><div className="stat-value">5</div></div></div>
    </div>
    <div className="grid-2" style={{marginTop:8}}>{[['Purchase Orders','/fmb/purchase-order','Create and track POs',ShoppingCart],['Goods Receipt','/fmb/grn','Receive goods against PO',Package],['Daily Cost Sheet','/fmb/daily-cost','Daily operational costs',FileText],['Inventory','/fmb/inventory','Stock levels and alerts',BarChart3]].map(([t,to,d,Icon],i)=>(
      <div key={i} className="card" style={{cursor:'pointer'}} onClick={()=>navigate(to)}><div style={{display:'flex',alignItems:'center',gap:12}}><div className="stat-icon primary" style={{width:36,height:36}}><Icon size={18}/></div><div><h4>{t}</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-500)'}}>{d}</p></div></div><ArrowRight size={16} style={{marginTop:8,color:'var(--gray-400)'}}/></div>
    ))}</div>
  </div>);
}