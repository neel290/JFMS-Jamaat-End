import React, { useState } from 'react';
import { Search, Plus, CreditCard, X } from 'lucide-react';

export default function StandingInstructions() {
  const [modal, setModal] = useState(false);
  const instructions = [
    { id: 'SI-102', sabeel: '101', head: 'Shabbir Bhai Cyclewala', amount: 5000, day: 5, status: 'Active', bank: 'SBI' },
    { id: 'SI-103', sabeel: '305', head: 'Murtaza Bhai', amount: 2000, day: 10, status: 'Paused', bank: 'HDFC' },
  ];

  return (
    <div>
      <div className="page-header">
         <div>
            <h1 className="page-title">Standing Instructions (e-Mandate)</h1>
            <p className="page-subtitle">Manage recurring automated deductions for Sabeel</p>
         </div>
         <button className="btn btn-primary" onClick={() => setModal(true)}>
            <Plus size={16}/> New e-Mandate
         </button>
      </div>

      <div className="data-table-wrapper">
         <div className="data-table-toolbar">
            <div className="search-box">
               <Search size={16} />
               <input placeholder="Search Sabeel No..." />
            </div>
         </div>
         <table className="data-table">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Sabeel No</th>
                  <th>Name</th>
                  <th>Monthly Amount</th>
                  <th>Deduction Day</th>
                  <th>Target Bank</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {instructions.map(si => (
                  <tr key={si.id}>
                     <td>{si.id}</td>
                     <td style={{fontWeight:600}}>{si.sabeel}</td>
                     <td>{si.head}</td>
                     <td>₹{si.amount.toLocaleString('en-IN')}</td>
                     <td>{si.day}th of month</td>
                     <td>{si.bank}</td>
                     <td><span className={`badge badge-${si.status === 'Active' ? 'active' : 'inactive'}`}>{si.status}</span></td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      {modal && (
         <div className="drawer-overlay" onClick={() => setModal(false)}>
            <div className="drawer" onClick={e => e.stopPropagation()}>
               <div className="drawer-header">
                  <h3 style={{fontWeight:600}}>Create Multi-Bank e-Mandate</h3>
                  <button className="modal-close" onClick={() => setModal(false)}><X size={18} /></button>
               </div>
               <div className="drawer-body">
                  <div className="form-group">
                     <label className="form-label">Search Sabeel No <span className="required">*</span></label>
                     <input type="text" className="form-input" placeholder="e.g. 101" />
                  </div>
                  <div className="form-group">
                     <label className="form-label">Monthly Fixed Deduction (₹) <span className="required">*</span></label>
                     <input type="number" className="form-input" placeholder="0" />
                  </div>
                  <div className="form-group">
                     <label className="form-label">Deduction Day (1-28) <span className="required">*</span></label>
                     <input type="number" className="form-input" max="28" min="1" defaultValue="5" />
                  </div>
                  <p style={{fontSize:'0.75rem', color:'var(--gray-500)', marginBottom:16}}>e-Mandate registration links will be sent via SMS to verify with NPCI / Bank.</p>
                  <button className="btn btn-primary" style={{width:'100%'}} onClick={() => setModal(false)}>Initiate e-Mandate Link</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
