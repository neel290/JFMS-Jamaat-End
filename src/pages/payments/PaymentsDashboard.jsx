import { useNavigate } from 'react-router-dom';
import { IndianRupee, Clock, CheckCircle2, AlertTriangle, ArrowRight, CreditCard, Users, Building2, Zap, Receipt, Banknote, ArrowLeftRight } from 'lucide-react';
export default function PaymentsDashboard() {
  const navigate = useNavigate();
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Payments Dashboard</h1><p className="page-subtitle">Manage all outgoing payments</p></div></div>
    <div className="stat-cards">
      <div className="stat-card"><div className="stat-icon red"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Paid This Month</div><div className="stat-value">₹2,45,000</div></div></div>
      <div className="stat-card"><div className="stat-icon amber"><Clock size={20}/></div><div className="stat-content"><div className="stat-label">Pending Approval</div><div className="stat-value">2</div></div></div>
      <div className="stat-card"><div className="stat-icon green"><CheckCircle2 size={20}/></div><div className="stat-content"><div className="stat-label">Processed Today</div><div className="stat-value">4</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><AlertTriangle size={20}/></div><div className="stat-content"><div className="stat-label">TDS Due</div><div className="stat-value">₹14,000</div></div></div>
    </div>
    <h3 style={{marginBottom:16}}>Payment Types</h3>
    <div className="grid-3">{[['Vendor Payment','/payments/vendor','Create payment to vendors',CreditCard],['Bulk Vendor','/payments/bulk','Batch-process vendor payments',CreditCard],['Payment to Mumineen','/payments/mumin','Welfare and scholarships',Users],['Payment to Dawat','/payments/dawat','Dawat organization payments',Building2],['Utility Payment','/payments/utility','Electricity, water, internet',Zap],['Tax Payment (TDS)','/payments/tax','TDS liability and challan',Receipt],['Salary Payment','/payments/salary','Staff salary disbursement',Banknote],['Petty Cash','/payments/petty-cash','Withdrawal and replenishment',Banknote],['Bank Transfer','/payments/bank-transfer','Inter-account transfers',ArrowLeftRight]].map(([t,to,d,Icon],i)=>(
      <div key={i} className="card" style={{cursor:'pointer'}} onClick={()=>navigate(to)}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}><div className="stat-icon primary" style={{width:36,height:36}}><Icon size={18}/></div><h4 style={{color:'var(--env-color)'}}>{t}</h4></div>
        <p style={{fontSize:'0.8125rem',color:'var(--gray-500)'}}>{d}</p>
        <ArrowRight size={16} style={{marginTop:8,color:'var(--gray-400)'}}/></div>
    ))}</div>
  </div>);
}