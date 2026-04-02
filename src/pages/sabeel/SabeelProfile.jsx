export default function SabeelProfile() {
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
}