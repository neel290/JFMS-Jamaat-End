import React from 'react';
import { Search, Filter, AlertCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function SuspenseCredits() {
  const { suspense } = useStore();
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
         <div>
            <h1 className="page-title">Suspense Credits Master</h1>
            <p className="page-subtitle">Manage all unallocated receipts and bank credits</p>
         </div>
         <button className="btn btn-primary" onClick={() => navigate('/reconciliation/suspense')}>Resolve Queue</button>
      </div>

      <div className="card" style={{marginBottom: 24, background:'var(--color-warning-light)', borderColor:'var(--color-warning)'}}>
         <h4 style={{display:'flex', alignItems:'center', gap: 8, color:'var(--color-warning)', marginBottom: 8}}>
            <AlertCircle size={18}/> Suspense Policy Notice
         </h4>
         <p style={{fontSize:'0.875rem', color:'var(--gray-700)'}}>
            Entries remaining in Suspense for more than 30 days must be transferred to the central Jamaat Suspense Reserve as per financial policy.
         </p>
      </div>

      <div className="data-table-wrapper">
         <div className="data-table-toolbar">
            <div className="search-box">
               <Search size={16} />
               <input placeholder="Search narration or UTR..." />
            </div>
            <button className="filter-btn"><Filter size={14} /> Ageing</button>
            <button className="filter-btn"><Filter size={14} /> Bank Account</button>
         </div>
         <table className="data-table">
            <thead>
               <tr>
                  <th>Credit Date</th>
                  <th>Bank Account</th>
                  <th>UTR / Reference</th>
                  <th>Amount</th>
                  <th>Ageing</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {suspense.length > 0 ? suspense.map(s => (
                  <tr key={s.id}>
                     <td>{s.date || '01-Apr-2026'}</td>
                     <td>{s.bankId || 'SBI General'}</td>
                     <td>{s.narration}</td>
                     <td style={{fontWeight: 600}}>₹{(s.amount || 0).toLocaleString('en-IN')}</td>
                     <td><span className="badge badge-error">15 Days</span></td>
                     <td><button className="btn btn-ghost btn-sm" onClick={() => navigate('/reconciliation/suspense')}>Resolve <ArrowRight size={14}/></button></td>
                  </tr>
               )) : (
                  <tr>
                     <td colSpan="6" style={{textAlign:'center', padding:40, color:'var(--gray-500)'}}>
                        No suspense credits present.
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
