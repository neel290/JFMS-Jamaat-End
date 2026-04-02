import { useState } from 'react';
export default function AccessControl() {
  const [t1, setT1] = useState(true); const [t2, setT2] = useState(true); const [t3, setT3] = useState(false);
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Data & Notification Access Control</h1><p className="page-subtitle">Control data access and notification preferences</p></div></div>
    <div className="grid-2">
      <div className="card"><h3 className="card-title" style={{marginBottom:16}}>Notification Settings</h3>
        {[['Transactional Notifications',t1,setT1],['Payment Reminders',t2,setT2],['Marketing Notifications',t3,setT3]].map(([l,v,s]) => (
          <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid var(--gray-100)'}}><span style={{fontSize:'0.875rem'}}>{l}</span><div className={'toggle-switch' + (v?' active':'')} onClick={() => s(!v)} /></div>
        ))}
      </div>
      <div className="card"><h3 className="card-title" style={{marginBottom:16}}>Data Access Scope</h3>
        <p style={{color:'var(--gray-500)',fontSize:'0.875rem',marginBottom:16}}>Control which Sabeel households can view financial data through the Mumin portal.</p>
        <div style={{padding:12,background:'var(--color-success-light)',borderRadius:'var(--radius-md)'}}><span style={{color:'var(--color-success)',fontWeight:600,fontSize:'0.875rem'}}>All 108 Sabeel households have data access enabled</span></div>
      </div>
    </div>
  </div>);
}