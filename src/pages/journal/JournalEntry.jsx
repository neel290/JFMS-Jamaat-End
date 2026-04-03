import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Plus, Trash2, CheckCircle2, AlertTriangle, 
  Send, ShieldCheck, History, ArrowLeft, Save
} from 'lucide-react';

export default function JournalEntry() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { coa, journalEntries, addJournalEntry, updateJournalStatus, currentUser } = useStore();
  
  const [entry, setEntry] = useState(null);
  const [lines, setLines] = useState([{ ledgerId: '', debit: 0, credit: 0 }, { ledgerId: '', debit: 0, credit: 0 }]);
  const [narration, setNarration] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (id && id !== 'new') {
      const existing = journalEntries.find(e => e.id === id);
      if (existing) {
        setEntry(existing);
        setLines(existing.lines);
        setNarration(existing.narration);
        setDate(existing.date);
      }
    }
  }, [id, journalEntries]);

  const totalDebit = lines.reduce((s, l) => s + Number(l.debit || 0), 0);
  const totalCredit = lines.reduce((s, l) => s + Number(l.credit || 0), 0);
  const isBalanced = totalDebit > 0 && totalDebit === totalCredit;
  const isReadOnly = entry && (entry.status === 'Posted' || (entry.status === 'Verified' && currentUser.roleId !== 'R1'));

  const updateLine = (i, field, val) => {
    if (isReadOnly) return;
    const n = [...lines];
    n[i] = { ...n[i], [field]: val };
    setLines(n);
  };

  const addLine = () => !isReadOnly && setLines([...lines, { ledgerId: '', debit: 0, credit: 0 }]);
  const removeLine = (i) => !isReadOnly && lines.length > 2 && setLines(lines.filter((_, idx) => idx !== i));

  const handleAction = (newStatus) => {
    if (!isBalanced) return alert('Total Debit must equal Total Credit.');
    if (!narration) return alert('Please enter a narration.');

    if (!entry) {
      // New Entry (Maker Flow)
      addJournalEntry({ date, narration, lines });
      setToast('Draft Journal Entry Created!');
    } else {
      updateJournalStatus(entry.id, newStatus);
      setToast(`Journal Entry ${newStatus}!`);
    }

    setTimeout(() => {
      setToast(null);
      navigate('/journal');
    }, 1500);
  };

  const getStatusBadge = (status) => {
    const classes = {
      'Draft': 'badge-draft',
      'Submitted': 'badge-pending',
      'Verified': 'badge-active',
      'Posted': 'badge-success'
    };
    return <span className={`badge ${classes[status] || 'badge-gray'}`}>{status}</span>;
  };

  return (
    <div className="journal-entry-container">
      {toast && <div className="toast toast-success" style={{zIndex:9999}}><CheckCircle2 size={16}/> {toast}</div>}
      
      <div className="page-header">
        <div style={{display:'flex', alignItems:'center', gap: 12}}>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/journal')}><ArrowLeft size={16}/></button>
          <div>
            <h1 className="page-title">
              {entry ? `Journal Entry ${entry.id}` : 'New Journal Entry'} 
              {entry && <span style={{marginLeft:12}}>{getStatusBadge(entry.status)}</span>}
            </h1>
            <p className="page-subtitle">Multi-stage Maker-Checker manual posting workflow</p>
          </div>
        </div>
      </div>

      <div className="grid-3-1" style={{gap: 24}}>
        <div className="card">
          <div className="grid-2" style={{marginBottom:24}}>
            <div className="form-group">
              <label className="form-label">Date <span className="required">*</span></label>
              <input type="date" className="form-input" value={date} onChange={e=>setDate(e.target.value)} disabled={isReadOnly}/>
            </div>
            <div className="form-group">
              <label className="form-label">Narration <span className="required">*</span></label>
              <input type="text" className="form-input" placeholder="e.g. Correction entry" value={narration} onChange={e=>setNarration(e.target.value)} disabled={isReadOnly}/>
            </div>
            <div className="form-group">
              <label className="form-label">Supporting Document</label>
              <div style={{border:'1px dashed var(--gray-300)',padding:8,textAlign:'center',borderRadius:'var(--radius-md)',color:'var(--gray-500)',cursor:'pointer',fontSize:'0.8125rem'}}>
                Upload PDF/JPG
              </div>
            </div>
          </div>

          <table className="data-table" style={{marginBottom: 24}}>
            <thead>
              <tr>
                <th>Ledger Account</th>
                <th style={{textAlign:'right', width:140}}>Debit (₹)</th>
                <th style={{textAlign:'right', width:140}}>Credit (₹)</th>
                {!isReadOnly && <th style={{width:40}}></th>}
              </tr>
            </thead>
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td>
                    <select className="form-input" value={line.ledgerId} onChange={e=>updateLine(i, 'ledgerId', e.target.value)} disabled={isReadOnly}>
                      <option value="">-- Select Ledger --</option>
                      {coa.map(c => <option key={c.id} value={c.id} disabled={['Bank', 'Cash', 'Bank Accounts', 'Cash-in-Hand'].includes(c.group)}>{c.name} ({c.group})</option>)}
                    </select>
                  </td>
                  <td><input type="number" className="form-input" style={{textAlign:'right'}} value={line.debit} onChange={e=>updateLine(i, 'debit', e.target.value)} disabled={isReadOnly}/></td>
                  <td><input type="number" className="form-input" style={{textAlign:'right'}} value={line.credit} onChange={e=>updateLine(i, 'credit', e.target.value)} disabled={isReadOnly}/></td>
                  {!isReadOnly && <td><button className="btn btn-ghost btn-sm text-error" onClick={()=>removeLine(i)}><Trash2 size={14}/></button></td>}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{fontWeight:700, borderTop:'2px solid var(--gray-200)'}}>
                <td style={{padding: 12}}>Totals</td>
                <td style={{textAlign:'right', color: isBalanced ? 'var(--green-600)' : 'var(--red-600)'}}>₹{totalDebit.toLocaleString('en-IN')}</td>
                <td style={{textAlign:'right', color: isBalanced ? 'var(--green-600)' : 'var(--red-600)'}}>₹{totalCredit.toLocaleString('en-IN')}</td>
                {!isReadOnly && <td></td>}
              </tr>
            </tfoot>
          </table>

          {!isBalanced && totalDebit > 0 && (
            <div className="alert alert-warning" style={{marginBottom: 24}}>
              <AlertTriangle size={16}/> Balance mismatch of ₹{Math.abs(totalDebit - totalCredit).toLocaleString('en-IN')}
            </div>
          )}

          <div style={{display:'flex', justifyContent:'space-between'}}>
            {!isReadOnly && <button className="btn btn-outline" onClick={addLine}><Plus size={16}/> Add Line</button>}
            <div style={{display:'flex', gap: 12}}>
              {!entry && (
                <button className="btn btn-primary" onClick={() => handleAction('Draft')} disabled={!isBalanced} style={{gap: 8}}>
                  <Save size={16}/> Save Draft
                </button>
              )}
              
              {entry?.status === 'Draft' && currentUser.roleId === 'R3' && (
                <button className="btn btn-primary" onClick={() => handleAction('Submitted')} disabled={!isBalanced} style={{gap: 8}}>
                  <Send size={16}/> Submit for Review
                </button>
              )}

              {entry?.status === 'Submitted' && currentUser.roleId === 'R2' && (
                <button className="btn btn-success" onClick={() => handleAction('Verified')} disabled={!isBalanced} style={{gap: 8}}>
                  <ShieldCheck size={16}/> Verify Entry
                </button>
              )}

              {(entry?.status === 'Verified' || (entry?.status === 'Submitted' && currentUser.roleId === 'R1')) && currentUser.roleId === 'R1' && (
                <button className="btn btn-success" onClick={() => handleAction('Posted')} disabled={!isBalanced} style={{gap: 8}}>
                  <CheckCircle2 size={16}/> Post to Ledger
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3 className="card-title" style={{display:'flex', alignItems:'center', gap: 8}}><History size={18}/> Audit Trail</h3></div>
          <div style={{padding: 16}}>
            {entry?.audit ? (
              <div style={{display:'flex', flexDirection:'column', gap: 16}}>
                {entry.audit.map((a, idx) => (
                  <div key={idx} style={{position:'relative', paddingLeft: 24, borderLeft:'2px solid var(--gray-100)'}}>
                    <div style={{position:'absolute', left: -7, top: 0, width: 12, height: 12, borderRadius: '50%', background:'var(--blue-500)', border:'2px solid white'}}/>
                    <div style={{fontWeight:600, fontSize:'0.8125rem'}}>{a.action}</div>
                    <div style={{fontSize:'0.75rem', color:'var(--gray-500)'}}>{a.user} · {new Date(a.time).toLocaleTimeString()}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{color:'var(--gray-500)', fontSize:'0.875rem'}}>Audit log will appear after first save.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}