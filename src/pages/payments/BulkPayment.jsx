import { Upload, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
export default function BulkPayment() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Bulk Vendor Payment</h1><p className="page-subtitle">Batch-process multiple vendor payments</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Upload Payment File</label><div style={{border:'2px dashed var(--gray-300)',padding:32,textAlign:'center',borderRadius:'var(--radius-md)',color:'var(--gray-400)',cursor:'pointer'}}><Upload size={32}/><p style={{marginTop:8}}>Drag & drop CSV/Excel file or click to browse</p><p style={{fontSize:'0.75rem',marginTop:4}}>Format: Vendor Name, Amount, Bank Details, Expense Head</p></div></div>
      <h4 style={{marginBottom:12}}>Preview (Sample Data)</h4>
      <div className="data-table-wrapper"><table className="data-table"><thead><tr><th>Vendor</th><th>Amount</th><th>TDS</th><th>Net</th><th>Head</th><th>Status</th></tr></thead>
        <tbody>{[['Ahmed Electricals','₹25,000','₹250','₹24,750','Maintenance','Ready'],['Star Caterers','₹18,000','₹0','₹18,000','Catering','Ready'],['Green Landscaping','₹8,500','₹0','₹8,500','Landscaping','Ready']].map(([v,a,t,n,h,s],i)=>(<tr key={i}><td>{v}</td><td>{a}</td><td>{t}</td><td style={{fontWeight:600}}>{n}</td><td>{h}</td><td><span className="badge badge-active">{s}</span></td></tr>))}</tbody>
      </table></div>
      <div style={{marginTop:16,display:'flex',gap:12}}><button className="btn btn-secondary">Cancel</button><button className="btn btn-primary" onClick={()=>setToast('Bulk payment of 3 vendors submitted for approval.')}>Submit Batch for Approval</button></div>
    </div>
  </div>);
}