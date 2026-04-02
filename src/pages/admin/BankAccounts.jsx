import { useState } from 'react';
import { Search, Filter, Download, Plus, History, X } from 'lucide-react';
export default function BankAccounts() {
  const [showAudit, setShowAudit] = useState(false);
  const accts = [['State Bank of India','****4521','SBIN0001234','Current','₹12,45,678','Active'],['Bank of Baroda','****7890','BARB0DHOLKA','Savings','₹8,32,450','Active'],['HDFC Bank','****3456','HDFC0002345','Current','₹0','Pending Approval']];
  return (<div>
    <div className="page-header">
      <div><h1 className="page-title">Bank Accounts</h1><p className="page-subtitle">Manage bank accounts linked to this environment</p></div>
      <div className="page-actions"><button className="btn btn-secondary" onClick={() => setShowAudit(true)}><History size={16} /> Audit Trail</button><button className="btn btn-primary"><Plus size={16} /> Add Bank Account</button></div>
    </div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16} /><input placeholder="Search..." /></div><button className="filter-btn"><Filter size={14} /> Status</button><div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Bank Name</th><th>Account No</th><th>IFSC</th><th>Type</th><th>Balance</th><th>Status</th></tr></thead>
        <tbody>{accts.map(([b,a,ifsc,t,bal,s], i) => (<tr key={i}><td style={{fontWeight:500}}>{b}</td><td>{a}</td><td>{ifsc}</td><td>{t}</td><td style={{fontWeight:600}}>{bal}</td><td><span className={'badge badge-' + (s==='Active'?'active':'pending')}>{s}</span></td></tr>))}</tbody>
      </table>
    </div>
    {showAudit && (<><div className="drawer-overlay" onClick={() => setShowAudit(false)} /><div className="drawer"><div className="drawer-header"><h3 style={{fontWeight:600}}>Audit Trail</h3><button className="modal-close" onClick={() => setShowAudit(false)}><X size={18} /></button></div><div className="drawer-body">{[{a:'HDFC account added (Pending)',t:'01-Apr-2026'},{a:'BOB balance updated',t:'31-Mar-2026'},{a:'SBI account verified',t:'01-Jan-2026'}].map((x,i) => (<div className="audit-item" key={i}><div className="audit-dot" /><div className="audit-content"><div className="audit-action">{x.a}</div><div className="audit-meta">{x.t}</div></div></div>))}</div></div></>)}
  </div>);
}