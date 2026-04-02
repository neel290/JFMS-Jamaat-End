export default function BalanceSheet() {
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
}