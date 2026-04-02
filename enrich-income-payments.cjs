const fs = require('fs'), p = require('path');
const B = 'c:/Office/JFMS/src/pages';
function w(r, c) { fs.writeFileSync(p.join(B, r), c); console.log('RICH:' + r); }

// ============ INCOME FORMS (remaining stubs) ============
w('income/VoluntaryIncomeEntry.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function VoluntaryIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Record Voluntary Contribution</h1><p className="page-subtitle">Non-Takhmeen voluntary donation from Mumineen</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Contributor (Sabeel No or ITS ID) <span className="required">*</span></label><input className="form-input" placeholder="Search by Sabeel No or ITS ID..." defaultValue="103"/></div>
      <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}><h4 style={{marginBottom:4}}>Yusuf Bhai Udaipurwala</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Sabeel: 103 · ITS: 30410789 · Mauze: Dholka</p></div>
      <div className="form-group"><label className="form-label">Income Purpose <span className="required">*</span></label><select className="form-input form-select"><option value="">Select purpose...</option><option>Niyaz</option><option>Sabeel</option><option>Anjuman Fund</option><option>Masjid Maintenance</option><option>Madrasah Donation</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Payment Mode <span className="required">*</span></label><select className="form-input form-select"><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option></select></div></div>
      <div className="form-group"><label className="form-label">Bank Account (Auto-mapped)</label><input className="form-input" value="SBI ****4521 (Current)" readOnly style={{background:'var(--gray-50)'}}/></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2} placeholder="Optional description..."/></div>
      <label className="form-checkbox" style={{marginBottom:16}}><input type="checkbox" defaultChecked/> Generate Receipt</label>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Voluntary contribution saved. Receipt REC-2026-0454 generated.')}>Save Entry</button>
    </div>
  </div>);
}`);

w('income/OrgIncomeEntry.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function OrgIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Organization Income</h1><p className="page-subtitle">Record income from organizations and trusts</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Organization Name <span className="required">*</span></label><select className="form-input form-select"><option value="">Select organization...</option><option>Burhani Charitable Trust</option><option>Saifee Hospital Trust</option><option>Burhani Foundation</option><option>Aljamea-tus-Saifiyah</option></select></div>
      <div className="form-group"><label className="form-label">Income Purpose <span className="required">*</span></label><select className="form-input form-select"><option value="">Select purpose...</option><option>Annual Grant</option><option>Project Funding</option><option>Event Sponsorship</option><option>Miscellaneous</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Reference No</label><input className="form-input" placeholder="Transfer reference"/></div><div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer</option><option>Cheque</option><option>DD</option></select></div></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Organization income recorded successfully.')}>Save Entry</button>
    </div>
  </div>);
}`);

w('income/EnayatIncomeEntry.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function EnayatIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Enayat Income</h1><p className="page-subtitle">Record income from Enayat organizations</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Enayat Organization <span className="required">*</span></label><select className="form-input form-select"><option value="">Select organization...</option><option>Saifee Burhani Upliftment Trust</option><option>Burhani Foundation</option><option>Dawat-e-Hadiyah</option></select></div>
      <div className="form-group"><label className="form-label">Enayat Type <span className="required">*</span></label><select className="form-input form-select"><option>Monthly Enayat</option><option>Special Enayat</option><option>Project Enayat</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Period</label><select className="form-input form-select"><option>Apr 2026</option><option>Mar 2026</option><option>Feb 2026</option></select></div></div>
      <div className="form-group"><label className="form-label">Reference No</label><input className="form-input" placeholder="Enayat reference number"/></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Enayat income recorded.')}>Save Entry</button>
    </div>
  </div>);
}`);

w('income/AgriIncomeEntry.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function AgriIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Agriculture Income</h1><p className="page-subtitle">Income from Jamaat-owned agricultural land</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Land / Property Description <span className="required">*</span></label><select className="form-input form-select"><option value="">Select property...</option><option>Survey No. 123 — Dholka (5 Acres)</option><option>Survey No. 456 — Bavla (3 Acres)</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Season</label><select className="form-input form-select"><option>Kharif 2025-26</option><option>Rabi 2025-26</option></select></div><div className="form-group"><label className="form-label">Crop</label><input className="form-input" placeholder="e.g. Cotton, Wheat"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Income Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer</option><option>Cash</option><option>Cheque</option></select></div></div>
      <div className="form-group"><label className="form-label">Tenant / Buyer Name</label><input className="form-input" placeholder="Name of buyer or lessee"/></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Agriculture income recorded.')}>Save Entry</button>
    </div>
  </div>);
}`);

w('income/OtherIncomeEntry.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function OtherIncomeEntry() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Other Income</h1><p className="page-subtitle">Miscellaneous income not covered under other categories</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Income Category <span className="required">*</span></label><select className="form-input form-select"><option value="">Select category...</option><option>Interest Income</option><option>Masjid Donation Box</option><option>Scrap Sale</option><option>Insurance Claim</option><option>Miscellaneous</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Cash</option><option>UPI</option><option>Bank Transfer</option></select></div><div className="form-group"><label className="form-label">Received From</label><input className="form-input" placeholder="Payer name (if applicable)"/></div></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Other income recorded.')}>Save Entry</button>
    </div>
  </div>);
}`);

w('income/ReceiptCancellation.jsx', `import { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle } from 'lucide-react';
export default function ReceiptCancellation() {
  const [toast, setToast] = useState(null);
  const [found, setFound] = useState(false);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Receipt Cancellation</h1><p className="page-subtitle">Request cancellation or data correction for a receipt</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Receipt Number <span className="required">*</span></label><div style={{display:'flex',gap:8}}><input className="form-input" placeholder="e.g. REC-2026-0451" defaultValue="REC-2026-0451"/><button className="btn btn-secondary" onClick={()=>setFound(true)}><Search size={16}/> Find</button></div></div>
      {found && (<>
        <div style={{background:'var(--color-warning-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16,display:'flex',gap:12,alignItems:'flex-start'}}><AlertTriangle size={20} style={{color:'var(--color-warning)',flexShrink:0,marginTop:2}}/><div><h4 style={{fontSize:'0.875rem',marginBottom:4}}>Receipt Found — REC-2026-0451</h4><div style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}><div>Sabeel: 101 — Shabbir Bhai Cyclewala</div><div>Purpose: Wajebaat · Amount: ₹15,000 · Mode: UPI</div><div>Date: 01-Apr-2026 · Status: Confirmed</div></div></div></div>
        <div className="form-group"><label className="form-label">Cancellation Type <span className="required">*</span></label><select className="form-input form-select"><option>Full Cancellation</option><option>Partial Reversal</option><option>Data Correction</option></select></div>
        <div className="form-group"><label className="form-label">Reason <span className="required">*</span></label><textarea className="form-input" rows={3} placeholder="Provide detailed reason..."/></div>
        <div className="form-group"><label className="form-label">Supporting Document</label><div style={{border:'2px dashed var(--gray-300)',padding:24,textAlign:'center',borderRadius:'var(--radius-md)',color:'var(--gray-400)',cursor:'pointer',fontSize:'0.8125rem'}}>Click to upload supporting document (PDF, JPG)</div></div>
        <button className="btn btn-primary" onClick={()=>setToast('Cancellation request submitted for Secretary approval.')}>Submit for Approval</button>
      </>)}
    </div>
  </div>);
}`);

w('income/SuspenseManagement.jsx', `import { Check, X, Eye } from 'lucide-react';
export default function SuspenseManagement() {
  const items = [['IMPS/2026/03/112233','30-Mar-2026','₹8,200','SBI ****4521','Unmatched bank credit — no corresponding income entry found'],['NEFT/2026/03/445566','28-Mar-2026','₹3,000','BOB ****7890','Partial match — amount mismatch with REC-2026-0440']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Suspense Entry Management</h1><p className="page-subtitle">Unmatched bank credits awaiting resolution</p></div></div>
    <div className="stat-cards" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
      <div className="stat-card"><div className="stat-icon amber"><span style={{fontWeight:700}}>2</span></div><div className="stat-content"><div className="stat-label">Pending Suspense</div><div className="stat-value">₹11,200</div></div></div>
      <div className="stat-card"><div className="stat-icon green"><span style={{fontWeight:700}}>8</span></div><div className="stat-content"><div className="stat-label">Resolved This Month</div><div className="stat-value">₹42,500</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><span style={{fontWeight:700}}>0</span></div><div className="stat-content"><div className="stat-label">Aged (30+ days)</div><div className="stat-value">₹0</div></div></div>
    </div>
    <div className="data-table-wrapper"><table className="data-table"><thead><tr><th>Bank Reference</th><th>Date</th><th>Amount</th><th>Bank</th><th>Reason</th><th>Actions</th></tr></thead>
      <tbody>{items.map(([ref,dt,amt,bank,reason],i)=>(<tr key={i}><td style={{fontWeight:600,fontSize:'0.8125rem'}}>{ref}</td><td>{dt}</td><td style={{fontWeight:600}}>{amt}</td><td>{bank}</td><td style={{fontSize:'0.8125rem',color:'var(--gray-500)'}}>{reason}</td><td style={{display:'flex',gap:4}}><button className="btn btn-success btn-sm"><Check size={14}/> Resolve</button><button className="btn btn-ghost btn-sm"><Eye size={14}/></button></td></tr>))}</tbody>
    </table></div>
  </div>);
}`);

// ============ PAYMENT FORMS (remaining stubs) ============
w('payments/BulkPayment.jsx', `import { Upload, CheckCircle2 } from 'lucide-react';
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
}`);

w('payments/MuminPayment.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function MuminPayment() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Payment to Mumineen</h1><p className="page-subtitle">Welfare payments, scholarships, and assistance</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Payment Category <span className="required">*</span></label><select className="form-input form-select"><option value="">Select category...</option><option>Welfare Assistance</option><option>Education Scholarship</option><option>Medical Aid</option><option>Marriage Assistance</option><option>Razaa Disbursement</option></select></div>
      <div className="form-group"><label className="form-label">Beneficiary (Sabeel No or ITS ID) <span className="required">*</span></label><input className="form-input" placeholder="Search by Sabeel No or ITS ID..." defaultValue="104"/></div>
      <div style={{background:'var(--env-color-light)',padding:12,borderRadius:'var(--radius-md)',marginBottom:16}}><h4 style={{fontSize:'0.875rem'}}>Hatim Bhai Jamali — Sabeel 104</h4></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer</option><option>UPI</option><option>Cash</option><option>Cheque</option></select></div></div>
      <div className="form-group"><label className="form-label">Purpose / Narration <span className="required">*</span></label><textarea className="form-input" rows={2} placeholder="Describe the reason for payment..."/></div>
      <div className="form-group"><label className="form-label">Bank Account (Debit From)</label><select className="form-input form-select"><option>SBI ****4521 (Current)</option><option>BOB ****7890 (Savings)</option></select></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Payment to Mumin submitted for approval.')}>Submit for Approval</button>
    </div>
  </div>);
}`);

w('payments/DawatPayment.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function DawatPayment() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Payment to Dawat</h1><p className="page-subtitle">Dawat organization payments and remittances</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Dawat Entity <span className="required">*</span></label><select className="form-input form-select"><option value="">Select entity...</option><option>Dawat-e-Hadiyah (Central)</option><option>Aljamea-tus-Saifiyah</option><option>Saifee Mahal</option></select></div>
      <div className="form-group"><label className="form-label">Payment Purpose <span className="required">*</span></label><select className="form-input form-select"><option>Wajebaat Remittance</option><option>Nazraan</option><option>Special Contribution</option><option>Annual Dues</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div><div className="form-group"><label className="form-label">Reference Period</label><select className="form-input form-select"><option>Q4 — Jan-Mar 2026</option><option>Q3 — Oct-Dec 2025</option></select></div></div>
      <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer (NEFT/RTGS)</option><option>Cheque</option></select></div>
      <div className="form-group"><label className="form-label">Bank Account</label><select className="form-input form-select"><option>SBI ****4521 (Current)</option></select></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Dawat payment submitted for Secretary approval.')}>Submit for Approval</button>
    </div>
  </div>);
}`);

w('payments/UtilityPayment.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function UtilityPayment() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Utility Payments</h1><p className="page-subtitle">Pay electricity, water, internet, and other utility bills</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Utility Type <span className="required">*</span></label><select className="form-input form-select"><option value="">Select utility...</option><option>Electricity — Gujarat EB</option><option>Water Supply — Municipality</option><option>Internet / WiFi</option><option>Telephone</option><option>Gas</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Consumer / Account No</label><input className="form-input" placeholder="Bill account number"/></div><div className="form-group"><label className="form-label">Bill Amount <span className="required">*</span></label><input className="form-input" placeholder="Enter amount"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Bill Date</label><input className="form-input" type="date"/></div><div className="form-group"><label className="form-label">Due Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Online Payment</option><option>Bank Transfer</option><option>Cheque</option><option>Cash</option></select></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Utility payment recorded: ₹18,750 for Electricity.')}>Save Payment</button>
    </div>
  </div>);
}`);

w('payments/TaxPayment.jsx', `import { useState } from 'react';
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
}`);

w('payments/SalaryPayment.jsx', `import { Download, CheckCircle2 } from 'lucide-react';
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
}`);

w('payments/PettyCash.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function PettyCash() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Petty Cash</h1><p className="page-subtitle">Cash withdrawal and replenishment tracking</p></div></div>
    <div className="stat-cards" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
      <div className="stat-card"><div className="stat-icon green"><span style={{fontWeight:700}}>₹</span></div><div className="stat-content"><div className="stat-label">Current Balance</div><div className="stat-value">₹8,500</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><span style={{fontWeight:700}}>₹</span></div><div className="stat-content"><div className="stat-label">Spent This Month</div><div className="stat-value">₹6,500</div></div></div>
      <div className="stat-card"><div className="stat-icon blue"><span style={{fontWeight:700}}>₹</span></div><div className="stat-content"><div className="stat-label">Imprest Limit</div><div className="stat-value">₹15,000</div></div></div>
    </div>
    <div className="grid-2">
      <div className="card"><h4 style={{marginBottom:16}}>Record Petty Cash Expense</h4>
        <div className="form-group"><label className="form-label">Expense Description <span className="required">*</span></label><input className="form-input" placeholder="e.g. Tea for meeting"/></div>
        <div className="form-row"><div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" placeholder="₹"/></div><div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date"/></div></div>
        <div className="form-group"><label className="form-label">Head</label><select className="form-input form-select"><option>Office Supplies</option><option>Tea/Refreshments</option><option>Transportation</option><option>Miscellaneous</option></select></div>
        <button className="btn btn-primary" onClick={()=>setToast('Petty cash expense of ₹250 recorded.')}>Record Expense</button>
      </div>
      <div className="card"><h4 style={{marginBottom:16}}>Recent Transactions</h4>
        {[['Tea for committee meeting','₹250','01-Apr'],['Courier charges','₹180','31-Mar'],['Stationery purchase','₹450','30-Mar'],['Auto fare — bank visit','₹120','29-Mar'],['Printing charges','₹350','28-Mar']].map(([d,a,dt],i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--gray-100)',fontSize:'0.875rem'}}><span>{d}</span><div><span style={{fontWeight:600,marginRight:12}}>{a}</span><span style={{color:'var(--gray-400)',fontSize:'0.75rem'}}>{dt}</span></div></div>))}
      </div>
    </div>
  </div>);
}`);

w('payments/BankTransfer.jsx', `import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
export default function BankTransfer() {
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Bank to Bank Transfer</h1><p className="page-subtitle">Transfer funds between Jamaat bank accounts</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group"><label className="form-label">From Account <span className="required">*</span></label><select className="form-input form-select"><option>SBI ****4521 (Current) — Balance: ₹12,45,678</option><option>BOB ****7890 (Savings) — Balance: ₹8,32,450</option></select></div>
      <div className="form-group"><label className="form-label">To Account <span className="required">*</span></label><select className="form-input form-select"><option>BOB ****7890 (Savings) — Balance: ₹8,32,450</option><option>SBI ****4521 (Current) — Balance: ₹12,45,678</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Transfer Amount <span className="required">*</span></label><input className="form-input" placeholder="₹"/></div><div className="form-group"><label className="form-label">Transfer Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-group"><label className="form-label">Transfer Mode</label><select className="form-input form-select"><option>NEFT</option><option>RTGS</option><option>IMPS</option></select></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2} placeholder="Reason for transfer..."/></div>
      <button className="btn btn-primary btn-lg" onClick={()=>setToast('Bank transfer submitted for approval.')}>Submit Transfer</button>
    </div>
  </div>);
}`);

console.log('Income + Payment stubs enriched');
