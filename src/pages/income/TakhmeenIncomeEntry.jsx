import { useState } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
export default function TakhmeenIncomeEntry() {
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [purposes, setPurposes] = useState([
    {name: 'Wajebaat', as: '₹30,000', pd: '₹15,000', due: '₹15,000', chk: true, bank: 'State Bank of India'},
    {name: 'Fitra', as: '₹5,000', pd: '₹0', due: '₹5,000', chk: false, bank: 'HDFC Bank'},
    {name: 'Zakat', as: '₹15,000', pd: '₹15,000', due: '₹0', chk: false, bank: 'State Bank of India'}
  ]);

  const handleSave = () => {
    const selectedBanks = [...new Set(purposes.filter(p => p.chk).map(p => p.bank))];
    if (paymentMode === 'Cheque' && selectedBanks.length > 1) {
      setError('Cannot process a single cheque for purposes mapped to different banks (' + selectedBanks.join(', ') + ').');
      return;
    }
    setError(null);
    setToast('Entry saved. Receipt REC-2026-0453 generated.');
  };

  return (<div>
    {toast && <div className="toast toast-success"><CheckCircle2 size={16}/> {toast}</div>}
    {error && <div className="alert alert-error" style={{marginBottom: 16, display:'flex', alignItems:'center', gap: 8, background:'var(--color-error-light)', color:'var(--color-error)', padding:12, borderRadius:'var(--radius-md)'}}><AlertTriangle size={16}/> {error}</div>}
    <div className="page-header"><div><h1 className="page-title">Record Takhmeen Payment</h1><p className="page-subtitle">Search Sabeel and record Takhmeen contribution</p></div></div>
    <div className="card" style={{maxWidth:700}}>
      <div className="form-group"><label className="form-label">Search Sabeel No or ITS ID <span className="required">*</span></label><input className="form-input" defaultValue="101" placeholder="Enter Sabeel No or ITS ID..."/></div>
      <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:20}}><h4 style={{marginBottom:4}}>Shabbir Bhai Cyclewala</h4><p style={{fontSize:'0.8125rem',color:'var(--gray-600)'}}>Sabeel: 101 · ITS: 30410123 · Mauze: Dholka</p></div>
      <h4 style={{marginBottom:12}}>Outstanding Takhmeen Purposes</h4>
      {purposes.map((p, i)=>(
        <label key={i} className="form-checkbox" style={{padding:12,marginBottom:8,background:'var(--gray-50)',borderRadius:'var(--radius-md)',display:'flex',gap:12}}>
          <input type="checkbox" checked={p.chk} onChange={(e) => {
            const newP = [...purposes];
            newP[i].chk = e.target.checked;
            setPurposes(newP);
          }}/><div style={{flex:1}}><div style={{fontWeight:600}}>{p.name} <span style={{fontSize:'0.75rem', fontWeight:'normal', background:'var(--gray-200)', padding:'2px 6px', borderRadius:10, marginLeft:8}}>{p.bank}</span></div><div style={{fontSize:'0.75rem',color:'var(--gray-500)'}}>Assigned: {p.as} · Paid: {p.pd} · Due: {p.due}</div></div>
        </label>
      ))}
      <div className="form-row" style={{marginTop:16}}>
        <div className="form-group"><label className="form-label">Amount <span className="required">*</span></label><input className="form-input" defaultValue="15,000"/></div>
        <div className="form-group"><label className="form-label">Payment Mode <span className="required">*</span></label><select className="form-input form-select" value={paymentMode} onChange={e => setPaymentMode(e.target.value)}><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option></select></div>
      </div>
      <label className="form-checkbox" style={{marginBottom:16}}><input type="checkbox" defaultChecked/> Generate Receipt</label>
      <button className="btn btn-primary btn-lg" onClick={handleSave}>Save Entry</button>
    </div>
  </div>);
}