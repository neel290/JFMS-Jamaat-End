const fs = require('fs'), p = require('path');
const B = './src/pages';
function w(r, c) { fs.writeFileSync(p.join(B, r), c); console.log('RICH:' + r); }

// ============ PAYMENTS ============
w('payments/PaymentsDashboard.jsx', `import { useNavigate } from 'react-router-dom';
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
}`);

w('payments/VendorPaymentRequest.jsx', `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Upload } from 'lucide-react';
export default function VendorPaymentRequest() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Vendor Payment Request</h1><p className="page-subtitle">Create a new vendor payment request</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Vendor Name <span className="required">*</span></label><select className="form-input form-select"><option value="">Select vendor...</option><option>Ahmed Electricals</option><option>Bohra Plumbing Services</option><option>Star Caterers</option><option>Green Landscaping Co.</option></select></div>
      <div className="form-group"><label className="form-label">Expense Head <span className="required">*</span></label><select className="form-input form-select"><option value="">Select expense head...</option><option>Masjid Maintenance</option><option>Electrical Work</option><option>Plumbing</option><option>Catering</option><option>Landscaping</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Invoice Amount <span className="required">*</span></label><input className="form-input" placeholder="₹"/></div><div className="form-group"><label className="form-label">Invoice Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">TDS Applicable?</label><select className="form-input form-select"><option>No</option><option>Yes — 1%</option><option>Yes — 2%</option><option>Yes — 10%</option></select></div><div className="form-group"><label className="form-label">Net Payable</label><input className="form-input" value="₹45,000" readOnly style={{background:'var(--gray-50)'}}/></div></div>
      <div className="form-group"><label className="form-label">Payment Mode</label><select className="form-input form-select"><option>Bank Transfer (NEFT/RTGS)</option><option>Cheque</option><option>UPI</option></select></div>
      <div className="form-group"><label className="form-label">Bank Account</label><select className="form-input form-select"><option>SBI ****4521 (Current)</option><option>BOB ****7890 (Savings)</option></select></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2} placeholder="Payment description..."/></div>
      <div className="form-group"><label className="form-label">Attach Invoice</label><div style={{border:'2px dashed var(--gray-300)',borderRadius:'var(--radius-md)',padding:24,textAlign:'center',color:'var(--gray-400)',cursor:'pointer'}}><Upload size={24}/><p style={{marginTop:8,fontSize:'0.8125rem'}}>Click or drag to upload invoice (PDF, JPG)</p></div></div>
      <div style={{display:'flex',gap:12,marginTop:16}}>
        <button className="btn btn-secondary" onClick={()=>navigate('/payments')}>Cancel</button>
        <button className="btn btn-primary" onClick={()=>{setToast('Payment request submitted for approval');setTimeout(()=>navigate('/payments'),1500)}}>Submit for Approval</button>
      </div>
    </div>
  </div>);
}`);

w('payments/PaymentApproval.jsx', `import { Check, X, Eye } from 'lucide-react';
export default function PaymentApproval() {
  const items = [['PAY-2026-0089','Ahmed Electricals','Masjid Maintenance','₹45,000','₹44,550','Bank Transfer','Taher Bhai','01-Apr-2026'],['PAY-2026-0090','Star Caterers','Catering — Niyaz','₹28,000','₹28,000','Cheque','Burhanuddin','01-Apr-2026']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Payment Approval Queue</h1><p className="page-subtitle">Approve or reject pending payment requests</p></div></div>
    <div className="data-table-wrapper"><table className="data-table">
      <thead><tr><th>Voucher</th><th>Vendor</th><th>Head</th><th>Gross</th><th>Net</th><th>Mode</th><th>Requested By</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>{items.map(([v,vn,h,g,n,m,u,d],i)=>(<tr key={i}><td style={{fontSize:'0.8125rem',fontWeight:600}}>{v}</td><td>{vn}</td><td>{h}</td><td>{g}</td><td style={{fontWeight:600}}>{n}</td><td>{m}</td><td>{u}</td><td>{d}</td><td style={{display:'flex',gap:4}}><button className="btn btn-ghost btn-sm"><Eye size={14}/></button><button className="btn btn-success btn-sm"><Check size={14}/></button><button className="btn btn-danger btn-sm"><X size={14}/></button></td></tr>))}</tbody>
    </table></div>
  </div>);
}`);

w('payments/PaymentListing.jsx', `import { Search, Filter, Download } from 'lucide-react';
export default function PaymentListing() {
  const payments = [['01-Apr','PAY-2026-0088','Bohra Plumbing','Plumbing','₹12,000','₹12,000','Bank Transfer','Approved'],['31-Mar','PAY-2026-0087','Green Landscaping','Landscaping','₹8,500','₹8,500','Cheque','Approved'],['30-Mar','PAY-2026-0086','Ahmed Electricals','Electrical Work','₹25,000','₹24,750','NEFT','Approved'],['28-Mar','PAY-2026-0085','Star Caterers','Niyaz Catering','₹45,000','₹45,000','Bank Transfer','Approved'],['25-Mar','PAY-2026-0084','Salary — Staff','Salary','₹1,20,000','₹1,08,000','NEFT','Processed']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">All Payments</h1><p className="page-subtitle">Complete payment records</p></div></div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search by voucher, vendor..."/></div><button className="filter-btn"><Filter size={14}/> Date</button><button className="filter-btn"><Filter size={14}/> Type</button><div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14}/> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Date</th><th>Voucher</th><th>Payee</th><th>Head</th><th>Gross</th><th>Net</th><th>Mode</th><th>Status</th></tr></thead>
        <tbody>{payments.map(([dt,v,p,h,g,n,m,s],i)=>(<tr key={i}><td>{dt}</td><td style={{fontWeight:600,fontSize:'0.8125rem'}}>{v}</td><td>{p}</td><td>{h}</td><td>{g}</td><td style={{fontWeight:600}}>{n}</td><td>{m}</td><td><span className="badge badge-approved">{s}</span></td></tr>))}</tbody>
      </table><div className="table-pagination"><span>Showing 1-5 of 5</span><span>Page 1 of 1</span></div>
    </div>
  </div>);
}`);

// ============ DEPOSITS ============
w('deposits/DepositEntry.jsx', `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
export default function DepositEntry() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Record Deposit</h1><p className="page-subtitle">Create a bank deposit slip</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group"><label className="form-label">Bank Account <span className="required">*</span></label><select className="form-input form-select"><option>SBI ****4521 (Current)</option><option>BOB ****7890 (Savings)</option></select></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Deposit Amount <span className="required">*</span></label><input className="form-input" placeholder="₹"/></div><div className="form-group"><label className="form-label">Deposit Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-group"><label className="form-label">Deposit Mode</label><select className="form-input form-select"><option>Cash Deposit</option><option>Cheque Deposit</option><option>DD Deposit</option></select></div>
      <div className="form-group"><label className="form-label">Reference / Slip No</label><input className="form-input" placeholder="Bank deposit slip number"/></div>
      <div className="form-group"><label className="form-label">Narration</label><textarea className="form-input" rows={2}/></div>
      <div style={{display:'flex',gap:12}}><button className="btn btn-secondary" onClick={()=>navigate('/deposits')}>Cancel</button><button className="btn btn-primary" onClick={()=>{setToast('Deposit recorded: DEP-2026-0034');setTimeout(()=>navigate('/deposits'),1500)}}>Save Deposit</button></div>
    </div>
  </div>);
}`);

w('deposits/DepositListing.jsx', `import { Search, Filter, Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function DepositListing() {
  const navigate = useNavigate();
  const deposits = [['01-Apr','DEP-2026-0034','SBI ****4521','₹65,000','Cash Deposit','Confirmed'],['31-Mar','DEP-2026-0033','BOB ****7890','₹42,500','Cheque Deposit','Confirmed'],['28-Mar','DEP-2026-0032','SBI ****4521','₹28,000','Cash Deposit','Confirmed'],['25-Mar','DEP-2026-0031','SBI ****4521','₹55,000','Cash + Cheque','Confirmed']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Deposits Listing</h1><p className="page-subtitle">All deposit slips</p></div>
      <div className="page-actions"><button className="btn btn-primary" onClick={()=>navigate('/deposits/entry')}><Plus size={16}/> New Deposit</button></div></div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search..."/></div><button className="filter-btn"><Filter size={14}/> Bank</button><div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14}/> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Date</th><th>Slip No</th><th>Bank Account</th><th>Amount</th><th>Mode</th><th>Status</th></tr></thead>
        <tbody>{deposits.map(([dt,s,b,a,m,st],i)=>(<tr key={i}><td>{dt}</td><td style={{fontWeight:600}}>{s}</td><td>{b}</td><td style={{fontWeight:600}}>{a}</td><td>{m}</td><td><span className="badge badge-approved">{st}</span></td></tr>))}</tbody>
      </table>
    </div>
  </div>);
}`);

// ============ RECONCILIATION ============
w('reconciliation/ReconDashboard.jsx', `import { useNavigate } from 'react-router-dom';
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
}`);

// ============ REPORTS ============
w('reports/IncomeReport.jsx', `import { Search, Filter, Download } from 'lucide-react';
export default function IncomeReport() {
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income Reports</h1><p className="page-subtitle">Generate filtered income reports</p></div>
      <div className="page-actions"><button className="btn btn-secondary"><Download size={14}/> Export PDF</button><button className="btn btn-secondary"><Download size={14}/> Export Excel</button></div></div>
    <div className="card" style={{marginBottom:16}}>
      <h4 style={{marginBottom:12}}>Report Filters</h4>
      <div className="form-row"><div className="form-group"><label className="form-label">Date From</label><input className="form-input" type="date"/></div><div className="form-group"><label className="form-label">Date To</label><input className="form-input" type="date"/></div><div className="form-group"><label className="form-label">Purpose</label><select className="form-input form-select"><option>All Purposes</option><option>Wajebaat</option><option>Fitra</option><option>Zakat</option></select></div><div className="form-group"><label className="form-label">Mode</label><select className="form-input form-select"><option>All Modes</option><option>Cash</option><option>UPI</option><option>Bank Transfer</option></select></div></div>
      <button className="btn btn-primary">Generate Report</button>
    </div>
    <div className="data-table-wrapper"><table className="data-table"><thead><tr><th>Purpose</th><th>Cash</th><th>UPI</th><th>Bank Transfer</th><th>Cheque</th><th>Total</th></tr></thead>
      <tbody>{[['Wajebaat','₹45,000','₹65,000','₹55,000','₹20,000','₹1,85,000'],['Fitra','₹15,000','₹10,000','₹12,000','₹8,000','₹45,000'],['Zakat','₹5,000','₹20,000','₹30,000','₹10,000','₹65,000'],['Niyaz','₹8,500','₹6,000','₹2,000','₹2,000','₹18,500']].map(([p,...vs],i)=>(<tr key={i}><td style={{fontWeight:500}}>{p}</td>{vs.map((v,j)=>(<td key={j} style={{fontWeight:j===vs.length-1?700:400}}>{v}</td>))}</tr>))}
        <tr style={{fontWeight:700,background:'var(--gray-50)'}}><td>Total</td><td>₹73,500</td><td>₹1,01,000</td><td>₹99,000</td><td>₹40,000</td><td>₹3,13,500</td></tr>
      </tbody>
    </table></div>
  </div>);
}`);

w('reports/BalanceSheet.jsx', `export default function BalanceSheet() {
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Balance Sheet</h1><p className="page-subtitle">Assets, Liabilities, and Net Position as on 31-Mar-2026</p></div></div>
    <div className="grid-2">
      <div className="card"><h3 className="card-title" style={{marginBottom:16,color:'var(--color-success)'}}>Assets</h3>
        {[['Bank — SBI ****4521','₹12,45,678'],['Bank — BOB ****7890','₹8,32,450'],['Cash In Hand','₹45,000'],['Sabeel Takhmeen Receivable','₹17,45,000'],['Fixed Assets','₹85,00,000'],['Other Current Assets','₹2,50,000']].map(([l,v])=>(<div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--gray-100)'}}><span style={{fontSize:'0.875rem'}}>{l}</span><span style={{fontWeight:600,fontSize:'0.875rem'}}>{v}</span></div>))}
        <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0',fontWeight:700,color:'var(--color-success)'}}><span>Total Assets</span><span>₹1,26,18,128</span></div>
      </div>
      <div className="card"><h3 className="card-title" style={{marginBottom:16,color:'var(--color-error)'}}>Liabilities & Net Position</h3>
        {[['TDS Payable','₹14,000'],['Vendor Payable','₹73,000'],['Advance Receipts','₹1,20,000'],['Other Liabilities','₹35,000']].map(([l,v])=>(<div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--gray-100)'}}><span style={{fontSize:'0.875rem'}}>{l}</span><span style={{fontWeight:600,fontSize:'0.875rem'}}>{v}</span></div>))}
        <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--gray-100)'}}><span style={{fontSize:'0.875rem'}}>Total Liabilities</span><span style={{fontWeight:600}}>₹2,42,000</span></div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0',fontWeight:700,color:'var(--env-color)'}}><span>Net Position (Fund Balance)</span><span>₹1,23,76,128</span></div>
      </div>
    </div>
  </div>);
}`);

// ============ FMB ============
w('fmb/FMBDashboard.jsx', `import { useNavigate } from 'react-router-dom';
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
}`);

// ============ SABEEL PROFILE ============
w('sabeel/SabeelProfile.jsx', `export default function SabeelProfile() {
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Sabeel Profile — 101</h1><p className="page-subtitle">Comprehensive household view for Shabbir Bhai Cyclewala</p></div></div>
    <div className="grid-2">
      <div className="card"><h3 className="card-title" style={{marginBottom:16}}>Household Information</h3>
        {[['Sabeel No','101'],['Head of Household','Shabbir Bhai Cyclewala'],['ITS ID','30410123'],['Mauze','Dholka'],['Jamaat','Dholka Jamaat'],['Family Members','5'],['Status','Active']].map(([l,v])=>(<div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--gray-100)'}}><span style={{color:'var(--gray-500)',fontSize:'0.875rem'}}>{l}</span><span style={{fontWeight:500,fontSize:'0.875rem'}}>{v}</span></div>))}
      </div>
      <div className="card"><h3 className="card-title" style={{marginBottom:16}}>Takhmeen Summary (1445H)</h3>
        {[['Wajebaat','₹30,000','₹15,000','₹15,000'],['Fitra','₹5,000','₹0','₹5,000'],['Zakat','₹15,000','₹15,000','₹0']].map(([p,a,pd,due])=>(<div key={p} style={{padding:'8px 0',borderBottom:'1px solid var(--gray-100)'}}><div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontWeight:500,fontSize:'0.875rem'}}>{p}</span><span style={{fontWeight:600,fontSize:'0.875rem',color:due==='₹0'?'var(--color-success)':'var(--color-warning)'}}>{due} due</span></div><div style={{fontSize:'0.75rem',color:'var(--gray-500)'}}>Assigned: {a} · Paid: {pd}</div></div>))}
        <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0',fontWeight:700}}><span>Total Outstanding</span><span style={{color:'var(--color-warning)'}}>₹20,000</span></div>
      </div>
    </div>
    <div className="card" style={{marginTop:16}}><h3 className="card-title" style={{marginBottom:16}}>Recent Transactions</h3>
      <div className="data-table-wrapper"><table className="data-table"><thead><tr><th>Date</th><th>Type</th><th>Purpose</th><th>Amount</th><th>Mode</th><th>Receipt</th></tr></thead>
        <tbody>{[['01-Apr-2026','Income','Wajebaat','₹15,000','UPI','REC-2026-0451'],['15-Mar-2026','Income','Zakat','₹15,000','Bank Transfer','REC-2026-0420'],['01-Feb-2026','Income','Niyaz','₹2,000','Cash','REC-2026-0380']].map(([d,t,p,a,m,r],i)=>(<tr key={i}><td>{d}</td><td><span className="badge badge-active">{t}</span></td><td>{p}</td><td style={{fontWeight:600}}>{a}</td><td>{m}</td><td style={{fontSize:'0.8125rem'}}>{r}</td></tr>))}</tbody>
      </table></div>
    </div>
  </div>);
}`);

// ============ NOTIFICATIONS ============
w('other/NotificationCentre.jsx', `import { Bell, CheckCircle2, AlertTriangle, Clock, Info } from 'lucide-react';
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
}`);

console.log('All remaining major pages enriched');
