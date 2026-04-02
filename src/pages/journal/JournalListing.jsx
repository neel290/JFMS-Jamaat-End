import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Plus, FileText, Filter, ChevronRight } from 'lucide-react';

export default function JournalListing() {
  const navigate = useNavigate();
  const { journalEntries } = useStore();

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
    <div className="journal-listing-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Journal Entries</h1>
          <p className="page-subtitle">Manual ledger adjustments and correction entries</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline" style={{gap: 8}}><Filter size={16}/> Filter</button>
          <button className="btn btn-primary" onClick={() => navigate('/journal/entry/new')} style={{gap: 8}}>
            <Plus size={16}/> New Entry
          </button>
        </div>
      </div>

      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Narration</th>
                <th style={{textAlign:'right'}}>Debit</th>
                <th style={{textAlign:'right'}}>Credit</th>
                <th>Status</th>
                <th style={{width: 50}}></th>
              </tr>
            </thead>
            <tbody>
              {journalEntries.map(e => {
                const totalDebit = e.lines.reduce((s, l) => s + Number(l.debit || 0), 0);
                const totalCredit = e.lines.reduce((s, l) => s + Number(l.credit || 0), 0);
                
                return (
                  <tr key={e.id} onClick={() => navigate(`/journal/entry/${e.id}`)} style={{cursor:'pointer'}}>
                    <td style={{fontWeight:600, color:'var(--blue-600)'}}>{e.id}</td>
                    <td>{e.date}</td>
                    <td style={{maxWidth: 300, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{e.narration}</td>
                    <td style={{textAlign:'right', fontWeight:600}}>₹{totalDebit.toLocaleString('en-IN')}</td>
                    <td style={{textAlign:'right', fontWeight:600}}>₹{totalCredit.toLocaleString('en-IN')}</td>
                    <td>{getStatusBadge(e.status)}</td>
                    <td style={{textAlign:'right'}}><ChevronRight size={16} color="var(--gray-400)"/></td>
                  </tr>
                );
              })}
              {journalEntries.length === 0 && (
                <tr>
                  <td colSpan="7" style={{textAlign:'center', padding: 48, color:'var(--gray-500)'}}>
                    <FileText size={48} style={{opacity: 0.1, marginBottom: 12}}/><br/>
                    No journal entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}