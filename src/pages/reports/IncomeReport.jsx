import { Search, Filter, Download } from 'lucide-react';
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
}