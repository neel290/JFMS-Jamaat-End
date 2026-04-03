import { useState } from 'react';
import { Search, Filter, Download, Plus, History, X, LayoutTemplate, Save, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function BankAccounts() {
  const { banks } = useStore();
  const [showAudit, setShowAudit] = useState(false);
  const [showChequeEditor, setShowChequeEditor] = useState(false);
  const [activeBank, setActiveBank] = useState(null);
  const [toast, setToast] = useState('');
  
  // Cheque print coordinate states
  const [coords, setCoords] = useState({
    dateX: 80, dateY: 10,
    payeeX: 10, payeeY: 30,
    amountWordsX: 15, amountWordsY: 45,
    amountNumX: 82, amountNumY: 43,
    signX: 75, signY: 80
  });
  return (<div>
    {toast && <div className="toast toast-success" style={{zIndex:9999}}><CheckCircle2 size={16} /> {toast}</div>}
    <div className="page-header">
      <div><h1 className="page-title">Bank Accounts</h1><p className="page-subtitle">Manage bank accounts linked to this environment</p></div>
      <div className="page-actions"><button className="btn btn-secondary" onClick={() => setShowAudit(true)}><History size={16} /> Audit Trail</button><button className="btn btn-primary"><Plus size={16} /> Add Bank Account</button></div>
    </div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16} /><input placeholder="Search..." /></div><button className="filter-btn"><Filter size={14} /> Status</button><div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Bank Name</th><th>Account No</th><th>Type</th><th>Corpus Type</th><th>Balance</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{banks.map((b, i) => (
          <tr key={i}>
            <td style={{fontWeight:500}}>{b.name}</td>
            <td>{b.accountNo}</td>
            <td>Current</td>
            <td><span className={'badge badge-' + (b.isCorpus ? 'critical' : 'basic')}>{b.isCorpus ? 'Corpus' : 'Non-Corpus'}</span></td>
            <td style={{fontWeight:600}}>₹{b.balance.toLocaleString('en-IN')}</td>
            <td><span className={'badge badge-' + (b.status==='Approved'?'active':'pending')}>{b.status}</span></td>
            <td>
              <button className="btn btn-secondary btn-sm" onClick={() => { setActiveBank(b); setShowChequeEditor(true); }}>
                <LayoutTemplate size={14} /> Cheque Print Layout
              </button>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
    {showAudit && (<><div className="drawer-overlay" onClick={() => setShowAudit(false)} /><div className="drawer"><div className="drawer-header"><h3 style={{fontWeight:600}}>Audit Trail</h3><button className="modal-close" onClick={() => setShowAudit(false)}><X size={18} /></button></div><div className="drawer-body">{[{a:'HDFC account added (Pending)',t:'01-Apr-2026'},{a:'BOB balance updated',t:'31-Mar-2026'},{a:'SBI account verified',t:'01-Jan-2026'}].map((x,i) => (<div className="audit-item" key={i}><div className="audit-dot" /><div className="audit-content"><div className="audit-action">{x.a}</div><div className="audit-meta">{x.t}</div></div></div>))}</div></div></>)}

    {showChequeEditor && activeBank && (
      <div className="modal-overlay" onClick={() => setShowChequeEditor(false)}>
        <div className="modal" style={{maxWidth: 800, width: '100%'}} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Configure Cheque Layout — {activeBank.name}</h3>
            <button className="modal-close" onClick={() => setShowChequeEditor(false)}><X size={18} /></button>
          </div>
          
          <div style={{display:'flex', gap: 24, marginTop: 16}}>
            {/* Visual Canvas */}
            <div style={{flex: 1, position: 'relative', width: '100%', height: 260, background: '#f5f7eb', border: '1px solid #ccc', borderRadius: 8, overflow: 'hidden'}}>
              {/* Background Mock Design */}
              <div style={{position:'absolute', top: 10, left: 10, fontWeight: 700, opacity: 0.6}}>{activeBank.name}</div>
              <div style={{position:'absolute', bottom: 10, left: 10, fontSize: '0.75rem', opacity: 0.5}}>॥ 123456 ॥ 000000000 ॥</div>
              
              {/* Field Markers */}
              <div style={{position:'absolute', top: `${coords.dateY}%`, left: `${coords.dateX}%`, background: 'rgba(0,100,255,0.2)', border: '1px dashed blue', padding: '2px 4px', fontSize: '10px' }}>DD/MM/YYYY</div>
              <div style={{position:'absolute', top: `${coords.payeeY}%`, left: `${coords.payeeX}%`, background: 'rgba(0,100,255,0.2)', border: '1px dashed blue', padding: '2px 4px', fontSize: '10px' }}>Payee Name —————</div>
              <div style={{position:'absolute', top: `${coords.amountWordsY}%`, left: `${coords.amountWordsX}%`, background: 'rgba(0,100,255,0.2)', border: '1px dashed blue', padding: '2px 4px', fontSize: '10px' }}>Rupees Only —————</div>
              <div style={{position:'absolute', top: `${coords.amountNumY}%`, left: `${coords.amountNumX}%`, background: 'rgba(0,100,255,0.2)', border: '1px dashed blue', padding: '2px 4px', fontSize: '10px' }}>***₹0.00</div>
              <div style={{position:'absolute', top: `${coords.signY}%`, left: `${coords.signX}%`, background: 'rgba(0,100,255,0.2)', border: '1px dashed blue', padding: '2px 4px', fontSize: '10px' }}>Auth Signatory</div>
            </div>

            {/* Config Panel */}
            <div style={{width: 280, display: 'flex', flexDirection: 'column', gap: 12, height: 260, overflowY: 'auto', paddingRight: 8}}>
              {[
                {label: 'Date Field', idX: 'dateX', idY: 'dateY'},
                {label: 'Payee Name', idX: 'payeeX', idY: 'payeeY'},
                {label: 'Amount Words', idX: 'amountWordsX', idY: 'amountWordsY'},
                {label: 'Amount Number', idX: 'amountNumX', idY: 'amountNumY'},
                {label: 'Signature', idX: 'signX', idY: 'signY'},
              ].map(f => (
                <div key={f.label} style={{padding: 8, background: 'var(--gray-50)', borderRadius: 4}}>
                  <div style={{fontSize: '0.8125rem', fontWeight: 600, marginBottom: 8}}>{f.label}</div>
                  <div style={{display:'flex', gap: 8, alignItems:'center'}}>
                    <span style={{fontSize:'0.75rem'}}>X:</span>
                    <input type="range" min="0" max="90" value={coords[f.idX]} onChange={e => setCoords(p => ({...p, [f.idX]: parseInt(e.target.value)}))} style={{flex: 1}} />
                  </div>
                  <div style={{display:'flex', gap: 8, alignItems:'center', marginTop:4}}>
                    <span style={{fontSize:'0.75rem'}}>Y:</span>
                    <input type="range" min="0" max="90" value={coords[f.idY]} onChange={e => setCoords(p => ({...p, [f.idY]: parseInt(e.target.value)}))} style={{flex: 1}} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer" style={{marginTop: 24}}>
            <button className="btn btn-secondary" onClick={() => setShowChequeEditor(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => {
              setToast('Cheque layout coordinates saved successfully');
              setShowChequeEditor(false);
              setTimeout(() => setToast(''), 3000);
            }}><Save size={16} /> Save Layout</button>
          </div>
        </div>
      </div>
    )}
  </div>);
}