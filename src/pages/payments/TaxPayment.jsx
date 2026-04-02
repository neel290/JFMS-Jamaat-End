import { useState } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
export default function TaxPayment() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Tax Payments (TDS)</h1><p className="page-subtitle">TDS liability tracking and challan generation</p></div></div>
    <div style={{background:'var(--color-warning-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:20,display:'flex',gap:12,alignItems:'center'}}><AlertTriangle size={20} style={{color:'var(--color-warning)'}}/><div><h4 style={{fontSize:'0.875rem'}}>Outstanding TDS: ₹14,000</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Due by 7th of next month (07-May-2026)</p></div></div>
    <div className="data-table-wrapper" style={{marginBottom:20}}><div style={{padding:16,fontWeight:600}}>TDS Liability Summary</div><table className="data-table"><thead><tr><th>Vendor</th><th>PAN</th><th>Gross</th><th>TDS Rate</th><th>TDS Amount</th><th>Section</th></tr></thead>
      <tbody>{[['Staff Salary','ABCDE1234F','₹95,000','10%','₹9,500','194J'],['Saifee Catering','FGHIJ5678K','₹45,000','10%','₹4,500','194C']].map(([v,p,g,r,t,s],i)=>(<tr key={i}><td>{v}</td><td style={{fontSize:'0.8125rem'}}>{p}</td><td>{g}</td><td>{r}</td><td style={{fontWeight:600}}>{t}</td><td>{s}</td></tr>))}</tbody>
      <tfoot><tr style={{fontWeight:700,background:'var(--gray-50)'}}><td colSpan={4}>Total TDS Liability</td><td>₹14,000</td><td></td></tr></tfoot>
    </table></div>
    <div className="card" style={{maxWidth:640}}><h4 style={{marginBottom:12}}>Generate TDS Challan</h4>
      <div className="form-row"><div className="form-group"><label className="form-label">Challan Period</label><select className="form-input form-select"><option>Apr 2026</option><option>Mar 2026</option></select></div><div className="form-group"><label className="form-label">Assessment Year</label><input className="form-input" value="2026-27" readOnly/></div></div>
      <button className="btn btn-primary" onClick={()=>setToast('TDS Challan generated. Amount: ₹14,000')}>Generate Challan 281</button>
    </div>
  </div>);
}