import React from 'react';
import { ShieldCheck, AlertTriangle, FileText, IndianRupee } from 'lucide-react';

const tdsData = [
  { vendor: 'Ace Hardware', pan: 'ABCDE1234F', section: '194C', grossPaid: 85000, tdsRate: '2%', tdsDeducted: 1700, deposited: true },
  { vendor: 'Star Catering', pan: 'FGHIJ5678K', section: '194C', grossPaid: 120000, tdsRate: '2%', tdsDeducted: 2400, deposited: false },
  { vendor: 'Metro Electricals', pan: 'Not Available', section: '206AA', grossPaid: 45000, tdsRate: '20%', tdsDeducted: 9000, deposited: false },
];
const totalTds = tdsData.reduce((s, d) => s + d.tdsDeducted, 0);
const pending = tdsData.filter(d => !d.deposited).reduce((s, d) => s + d.tdsDeducted, 0);

export default function ComplianceReport() {
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Compliance Report</h1><p className="page-subtitle">TDS deductions, PAN verification, and GST compliance status</p></div></div>

    <div className="stat-cards" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:24}}>
      <div className="stat-card"><div className="stat-icon blue"><ShieldCheck size={20}/></div><div className="stat-content"><div className="stat-label">Total TDS Deducted</div><div className="stat-value">₹{totalTds.toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className="stat-icon green"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Deposited to Govt</div><div className="stat-value">₹{(totalTds-pending).toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><AlertTriangle size={20}/></div><div className="stat-content"><div className="stat-label">Pending Deposit</div><div className="stat-value">₹{pending.toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className="stat-icon amber"><FileText size={20}/></div><div className="stat-content"><div className="stat-label">Missing PAN</div><div className="stat-value">{tdsData.filter(d=>d.pan==='Not Available').length}</div></div></div>
    </div>

    <div className="card" style={{padding:0, overflow:'hidden'}}>
      <div className="data-table-wrapper"><table className="data-table">
        <thead><tr><th>Vendor</th><th>PAN</th><th>Section</th><th style={{textAlign:'right'}}>Gross Paid</th><th>TDS Rate</th><th style={{textAlign:'right'}}>TDS Deducted</th><th>Deposited?</th></tr></thead>
        <tbody>{tdsData.map((d, i) => (
          <tr key={i}>
            <td style={{fontWeight:600}}>{d.vendor}</td>
            <td style={{color: d.pan === 'Not Available' ? 'var(--red-600)' : 'inherit', fontWeight: d.pan === 'Not Available' ? 600 : 400}}>{d.pan}</td>
            <td><span className="badge badge-pending">{d.section}</span></td>
            <td style={{textAlign:'right'}}>₹{d.grossPaid.toLocaleString('en-IN')}</td>
            <td>{d.tdsRate}</td>
            <td style={{textAlign:'right', fontWeight:600}}>₹{d.tdsDeducted.toLocaleString('en-IN')}</td>
            <td>{d.deposited ? <span className="badge badge-active">Yes</span> : <span className="badge badge-critical">No</span>}</td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  </div>);
}