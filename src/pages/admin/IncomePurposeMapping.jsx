import { Settings } from 'lucide-react';
export default function IncomePurposeMapping() {
  const rows = [['Takhmeen — Wajebaat','SBI ****4521','Active'],['Takhmeen — Fitra','SBI ****4521','Active'],['Takhmeen — Zakat','BOB ****7890','Active'],['Niyaz','SBI ****4521','Active'],['Sabeel','SBI ****4521','Active'],['Anjuman Fund','BOB ****7890','Active'],['Masjid Maintenance','BOB ****7890','Active'],['Madrasah Donation','BOB ****7890','Pending Approval']];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income Purpose to Bank Mapping</h1><p className="page-subtitle">Configure which bank account receives funds</p></div><div className="page-actions"><button className="btn btn-primary"><Settings size={16} /> Manage Mapping</button></div></div>
    <div className="data-table-wrapper"><table className="data-table"><thead><tr><th>Income Purpose</th><th>Mapped Bank Account</th><th>Status</th></tr></thead>
      <tbody>{rows.map(([p,b,s], i) => (<tr key={i}><td style={{fontWeight:500}}>{p}</td><td>{b}</td><td><span className={'badge badge-' + (s==='Active'?'active':'pending')}>{s}</span></td></tr>))}</tbody>
    </table></div>
  </div>);
}