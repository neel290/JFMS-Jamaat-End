import React, { useState, useEffect } from 'react';
import { Upload, ChevronRight, CheckCircle2, AlertCircle, Wand2, Link2, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function ManualRecon() {
  const { banks, receipts, deposits, payments } = useStore();
  const [toast, setToast] = useState(null);
  const [bankId, setBankId] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  // Bank Statement Mock Data
  const [statementLines, setStatementLines] = useState([
    { id: 'BSL1', date: '2026-04-01', description: 'CASH DEP/AHMD/UPI', withdrawal: 0, deposit: 5000, matched: false, matchId: null },
    { id: 'BSL2', date: '2026-04-02', description: 'NEFT ACE HARDWARE', withdrawal: 12000, deposit: 0, matched: false, matchId: null },
    { id: 'BSL3', date: '2026-04-05', description: 'CHQ DEP/CLEARING', withdrawal: 0, deposit: 14500, matched: false, matchId: null },
    { id: 'BSL4', date: '2026-04-06', description: 'POS MAINT EXP', withdrawal: 250, deposit: 0, matched: false, matchId: null }
  ]);

  // System Ledger Data
  const [systemLines, setSystemLines] = useState([]);

  useEffect(() => {
    if (!bankId) return;
    
    // Aggregating system records into a single ledger view for matching
    const ledger = [];
    
    // Receipts (Direct UPI/Cash not batched)
    receipts.filter(r => r.bankId === bankId && r.mode !== 'Cheque').forEach(r => {
      ledger.push({ id: r.id, type: 'Receipt', date: r.date, amount: r.total, isCredit: true, matched: r.status === 'Reconciled' });
    });

    // Deposits (Batched slips)
    deposits.filter(d => d.bankId === bankId).forEach(d => {
      ledger.push({ id: d.id, type: 'Deposit', date: d.date, amount: d.amount, isCredit: true, matched: d.status === 'Reconciled' });
    });

    // Payments
    payments.filter(p => p.bankId === bankId && p.status === 'Processed').forEach(p => {
      ledger.push({ id: p.id, type: 'Payment', date: p.date, amount: p.netAmount || p.amount, isCredit: false, matched: p.status === 'Reconciled' });
    });

    setSystemLines(ledger);
  }, [bankId, receipts, deposits, payments]);

  const [selectedStatement, setSelectedStatement] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);

  const handleUpload = () => {
    if (!bankId) return alert('Select a bank account first');
    setIsUploaded(true);
  };

  const handleAutoMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      // Very basic mock auto-match: Match exact amounts
      let updatedS = [...statementLines];
      let updatedL = [...systemLines];
      let matchCount = 0;

      updatedS.forEach(stmt => {
        if (!stmt.matched) {
          const amount = stmt.deposit > 0 ? stmt.deposit : stmt.withdrawal;
          const isCredit = stmt.deposit > 0;
          
          const sysMatch = updatedL.find(sys => !sys.matched && sys.isCredit === isCredit && sys.amount === amount);
          
          if (sysMatch) {
            stmt.matched = true;
            stmt.matchId = sysMatch.id;
            sysMatch.matched = true;
            matchCount++;
          }
        }
      });

      setStatementLines(updatedS);
      setSystemLines(updatedL);
      setIsMatching(false);
      setToast(`AI Auto-Match complete. ${matchCount} records reconciled automatically.`);
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  const handleManualMatch = () => {
    if (!selectedStatement || !selectedSystem) return;

    const stmt = statementLines.find(s => s.id === selectedStatement);
    const sys = systemLines.find(s => s.id === selectedSystem);

    const stmtAmt = stmt.deposit > 0 ? stmt.deposit : stmt.withdrawal;
    const stmtIsCredit = stmt.deposit > 0;

    if (stmtIsCredit !== sys.isCredit) {
       return alert("Cannot match a debit with a credit.");
    }
    if (stmtAmt !== sys.amount) {
       if(!window.confirm("Amounts do not match exactly. Force reconcile with difference to Suspense?")) return;
    }

    setStatementLines(prev => prev.map(s => s.id === selectedStatement ? { ...s, matched: true, matchId: sys.id } : s));
    setSystemLines(prev => prev.map(s => s.id === selectedSystem ? { ...s, matched: true } : s));
    
    setSelectedStatement(null);
    setSelectedSystem(null);
    setToast("Manual match successful.");
    setTimeout(() => setToast(null), 2000);
  };

  return (<div>
    {toast && <div className="toast toast-success" style={{zIndex:9999}}><CheckCircle2 size={16}/> {toast}</div>}
    
    <div className="page-header">
      <div>
        <h1 className="page-title">Manual Bank Reconciliation</h1>
        <p className="page-subtitle">Match bank statements against system ledger items</p>
      </div>
    </div>
    
    {!isUploaded ? (
      <div className="card" style={{maxWidth:600, margin:'0 auto'}}>
        <div className="form-group">
          <label className="form-label">Select Bank Account <span className="required">*</span></label>
          <select className="form-input form-select" value={bankId} onChange={e=>setBankId(e.target.value)}>
             <option value="">-- Choose Account --</option>
             {banks.filter(b => b.status === 'Approved').map(b => (
               <option key={b.id} value={b.id}>{b.name} (...{b.accountNo.slice(-4)})</option>
             ))}
          </select>
        </div>
        
        <div className="form-group" style={{marginTop: 24}}>
          <label className="form-label">Upload Statement (CSV, PDF, Excel)</label>
          <div 
            style={{border:'2px dashed var(--gray-300)', borderRadius:'var(--radius-md)', padding:40, textAlign:'center', color:'var(--gray-500)', cursor:'pointer', background:'var(--gray-50)'}}
            onClick={handleUpload}
          >
             <Upload size={32} style={{marginBottom: 12}} color="var(--gray-400)"/>
             <h4 style={{fontSize:'1rem', fontWeight: 600, color:'var(--gray-700)'}}>Click to upload bank statement file</h4>
             <p style={{fontSize:'0.8125rem', marginTop: 4}}>Extracted rows will be presented for matching.</p>
          </div>
        </div>
      </div>
    ) : (
      <div style={{display:'flex', flexDirection:'column', gap: 16}}>
        <div className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding: '16px 24px'}}>
           <div>
              <h3 style={{fontSize:'1.125rem', fontWeight: 600}}>Statement Uploaded</h3>
              <p style={{fontSize:'0.8125rem', color:'var(--gray-500)'}}>Bank: {banks.find(x=>x.id===bankId)?.name} | {statementLines.filter(x=>!x.matched).length} unmatched rows remain</p>
           </div>
           <div style={{display:'flex', gap: 12}}>
              <button className="btn btn-secondary" onClick={() => setIsUploaded(false)}>Reset Upload</button>
              <button className="btn btn-primary" onClick={handleAutoMatch} disabled={isMatching}>
                {isMatching ? 'Processing AI Match...' : <><Wand2 size={16}/> Auto-Match (AI)</>}
              </button>
           </div>
        </div>

        <div style={{display:'flex', gap: 24}}>
           {/* LEFT VIEW: BANK STATEMENT */}
           <div className="card" style={{flex: 1, padding: 0, overflow:'hidden', display:'flex', flexDirection:'column'}}>
               <div style={{padding: '16px', background:'var(--gray-50)', borderBottom:'1px solid var(--gray-200)'}}>
                  <h4 style={{margin:0, display:'flex', alignItems:'center', gap: 8}}><AlertCircle size={16}/> Bank Statement Feed</h4>
               </div>
               <div style={{overflowY:'auto', maxHeight: '500px'}}>
                  <table style={{width:'100%', fontSize:'0.8125rem', borderCollapse:'collapse'}}>
                     <thead>
                        <tr style={{textAlign:'left', color:'var(--gray-500)', borderBottom:'1px solid var(--gray-200)'}}>
                           <th style={{padding:'8px 16px'}}>Date</th>
                           <th style={{padding:'8px 16px'}}>Description</th>
                           <th style={{padding:'8px 16px', textAlign:'right'}}>Withdrawal</th>
                           <th style={{padding:'8px 16px', textAlign:'right'}}>Deposit</th>
                        </tr>
                     </thead>
                     <tbody>
                        {statementLines.map(row => (
                           <tr 
                              key={row.id} 
                              onClick={() => !row.matched && setSelectedStatement(row.id === selectedStatement ? null : row.id)}
                              style={{
                                 background: row.matched ? '#F1F5F9' : (selectedStatement === row.id ? '#EFF6FF' : 'white'),
                                 opacity: row.matched ? 0.6 : 1,
                                 cursor: row.matched ? 'default' : 'pointer',
                                 borderBottom:'1px solid var(--gray-100)',
                                 transition: 'all 0.1s'
                              }}
                           >
                              <td style={{padding:'12px 16px', display:'flex', alignItems:'center', gap: 8}}>
                                 {row.matched ? <CheckCircle2 size={14} color="var(--green-600)"/> : <span style={{width: 14, height: 14, borderRadius:'50%', border:'1px solid var(--gray-300)'}}/>}
                                 {row.date}
                              </td>
                              <td style={{padding:'12px 16px', fontWeight:500}}>{row.description}</td>
                              <td style={{padding:'12px 16px', textAlign:'right', color:'var(--red-600)'}}>{row.withdrawal > 0 ? "₹"+row.withdrawal : '-'}</td>
                              <td style={{padding:'12px 16px', textAlign:'right', color:'var(--green-600)'}}>{row.deposit > 0 ? "₹"+row.deposit : '-'}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
           </div>

           {/* CENTER MATCH BUTTON */}
           <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width: 60}}>
              <button 
                 className="btn btn-primary" 
                 style={{padding:12, borderRadius:'50%', opacity: (!selectedStatement || !selectedSystem) ? 0.5 : 1}}
                 disabled={!selectedStatement || !selectedSystem}
                 onClick={handleManualMatch}
                 title="Match Selected Records"
              >
                 <Link2 size={24}/>
              </button>
           </div>

           {/* RIGHT VIEW: SYSTEM LEDGER */}
           <div className="card" style={{flex: 1, padding: 0, overflow:'hidden', display:'flex', flexDirection:'column'}}>
               <div style={{padding: '16px', background:'var(--gray-50)', borderBottom:'1px solid var(--gray-200)'}}>
                  <h4 style={{margin:0, display:'flex', alignItems:'center', gap: 8}}><AlertCircle size={16}/> System Ledger</h4>
               </div>
               <div style={{overflowY:'auto', maxHeight: '500px'}}>
                  <table style={{width:'100%', fontSize:'0.8125rem', borderCollapse:'collapse'}}>
                     <thead>
                        <tr style={{textAlign:'left', color:'var(--gray-500)', borderBottom:'1px solid var(--gray-200)'}}>
                           <th style={{padding:'8px 16px'}}>Date</th>
                           <th style={{padding:'8px 16px'}}>Type & Ref</th>
                           <th style={{padding:'8px 16px', textAlign:'right'}}>Outward</th>
                           <th style={{padding:'8px 16px', textAlign:'right'}}>Inward</th>
                        </tr>
                     </thead>
                     <tbody>
                        {systemLines.map(row => (
                           <tr 
                              key={row.id} 
                              onClick={() => !row.matched && setSelectedSystem(row.id === selectedSystem ? null : row.id)}
                              style={{
                                 background: row.matched ? '#F1F5F9' : (selectedSystem === row.id ? '#EFF6FF' : 'white'),
                                 opacity: row.matched ? 0.6 : 1,
                                 cursor: row.matched ? 'default' : 'pointer',
                                 borderBottom:'1px solid var(--gray-100)',
                                 transition: 'all 0.1s'
                              }}
                           >
                              <td style={{padding:'12px 16px', display:'flex', alignItems:'center', gap: 8}}>
                                 {row.matched ? <CheckCircle2 size={14} color="var(--green-600)"/> : <span style={{width: 14, height: 14, borderRadius:'50%', border:'1px solid var(--gray-300)'}}/>}
                                 {row.date}
                              </td>
                              <td style={{padding:'12px 16px', fontWeight:500}}>{row.type} - {row.id}</td>
                              <td style={{padding:'12px 16px', textAlign:'right', color:'var(--red-600)'}}>{!row.isCredit ? "₹"+row.amount : '-'}</td>
                              <td style={{padding:'12px 16px', textAlign:'right', color:'var(--green-600)'}}>{row.isCredit ? "₹"+row.amount : '-'}</td>
                           </tr>
                        ))}
                        {systemLines.length === 0 && (
                          <tr><td colSpan={4} style={{padding: 24, textAlign:'center', color:'var(--gray-500)'}}>No system ledger entries found for this bank.</td></tr>
                        )}
                     </tbody>
                  </table>
               </div>
           </div>
        </div>
      </div>
    )}
  </div>);
}