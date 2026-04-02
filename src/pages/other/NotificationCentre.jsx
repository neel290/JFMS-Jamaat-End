import { Bell, CheckCircle2, AlertTriangle, Clock, Info } from 'lucide-react';
export default function NotificationCentre() {
  const notifs = [
    {icon:AlertTriangle,color:'amber',title:'PAN Threshold Breach',desc:'Sabeel 103 — Yusuf Bhai has crossed ₹50,000 threshold. Collect PAN.',time:'2 hours ago',read:false},
    {icon:Clock,color:'blue',title:'Payment Pending Approval',desc:'Vendor payment PAY-2026-0089 (₹45,000) awaiting your approval.',time:'3 hours ago',read:false},
    {icon:CheckCircle2,color:'green',title:'Deposit Confirmed',desc:'DEP-2026-0034 — ₹65,000 deposited to SBI confirmed by bank.',time:'5 hours ago',read:true},
    {icon:Info,color:'gray',title:'Reconciliation Complete',desc:'March 2026 auto-reconciliation matched 142 of 150 entries.',time:'1 day ago',read:true},
    {icon:AlertTriangle,color:'red',title:'Takhmeen Group Pending',desc:'New Members 1445H group still awaiting Aamil approval.',time:'2 days ago',read:true},
  ];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Notification Centre</h1><p className="page-subtitle">In-app notification feed</p></div></div>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {notifs.map((n,i)=>{const Icon=n.icon;return(
        <div key={i} className="card" style={{background:n.read?'white':'var(--env-color-light)',borderLeft:n.read?'':'3px solid var(--env-color)',cursor:'pointer'}}>
          <div style={{display:'flex',gap:12,alignItems:'flex-start'}}><div className={'stat-icon '+n.color} style={{width:36,height:36,flexShrink:0}}><Icon size={18}/></div>
            <div style={{flex:1}}><h4 style={{fontSize:'0.875rem',marginBottom:2}}>{n.title}</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>{n.desc}</p><span style={{fontSize:'0.75rem',color:'var(--gray-400)'}}>{n.time}</span></div>
            {!n.read && <div style={{width:8,height:8,borderRadius:'50%',background:'var(--env-color)',flexShrink:0}}/>}
          </div>
        </div>
      )})}
    </div>
  </div>);
}