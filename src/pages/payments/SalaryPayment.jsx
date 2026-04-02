import { Download, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
export default function SalaryPayment() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Salary Payments</h1><p className="page-subtitle">Monthly staff salary disbursement</p></div><div className="page-actions"><button className="btn btn-secondary"><Download size={14}/> Export Register</button></div></div>
    <div className="data-table-wrapper"><div style={{padding:12,display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid var(--gray-100)'}}><span style={{fontWeight:600}}>Salary Register — April 2026</span><select className="form-input form-select" style={{width:180}}><option>April 2026</option><option>March 2026</option></select></div>
      <table className="data-table"><thead><tr><th>Employee</th><th>Designation</th><th>Gross</th><th>PF</th><th>TDS</th><th>Net</th><th>Status</th></tr></thead>
        <tbody>{[['Moiz Bhai','Khadim','₹18,000','₹2,160','₹0','₹15,840','Pending'],['Taher Bhai','Peon','₹12,000','₹1,440','₹0','₹10,560','Pending'],['Abbas Bhai','Watchman','₹15,000','₹1,800','₹0','₹13,200','Pending'],['Mustafa Bhai','Cook (FMB)','₹22,000','₹2,640','₹0','₹19,360','Pending'],['Husain Bhai','Driver','₹16,000','₹1,920','₹1,600','₹12,480','Pending']].map(([e,d,g,pf,t,n,s],i)=>(<tr key={i}><td style={{fontWeight:500}}>{e}</td><td>{d}</td><td>{g}</td><td>{pf}</td><td>{t}</td><td style={{fontWeight:600}}>{n}</td><td><span className="badge badge-pending">{s}</span></td></tr>))}</tbody>
        <tfoot><tr style={{fontWeight:700,background:'var(--gray-50)'}}><td colSpan={2}>Total</td><td>₹83,000</td><td>₹9,960</td><td>₹1,600</td><td>₹71,440</td><td></td></tr></tfoot>
      </table></div>
    <div style={{marginTop:16,display:'flex',gap:12}}><button className="btn btn-primary" onClick={()=>setToast('Salary for 5 employees processed. Total: ₹71,440')}>Process All Salaries</button></div>
  </div>);
}