import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function PaymentRegister() {
  const { payments } = useStore();
  
  return (
    <div>
      <div className="page-header">
         <div>
            <h1 className="page-title">Payment Register</h1>
            <p className="page-subtitle">Comprehensive master list of all outbound payments</p>
         </div>
      </div>
      <div className="data-table-wrapper">
         <div className="data-table-toolbar">
            <div className="search-box">
               <Search size={16} />
               <input placeholder="Search by Voucher No, Vendor..." />
            </div>
            <button className="filter-btn"><Filter size={14} /> Date Range</button>
            <button className="filter-btn"><Filter size={14} /> Status</button>
            <button className="btn btn-secondary btn-sm" style={{marginLeft:'auto'}}><Download size={14} /> Export Excel</button>
         </div>
         <table className="data-table">
            <thead>
               <tr>
                  <th>Date</th>
                  <th>Voucher No</th>
                  <th>Vendor / Payee</th>
                  <th>Mode</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {payments.map(p => (
                  <tr key={p.id}>
                     <td>{p.date}</td>
                     <td>{p.id}</td>
                     <td style={{fontWeight:500}}>{p.vendorName || p.vendorId}</td>
                     <td>{p.type}</td>
                     <td>Vendor Payment</td>
                     <td>₹{p.amount.toLocaleString('en-IN')}</td>
                     <td><span className={`badge badge-${p.status === 'Processed' ? 'success' : 'pending'}`}>{p.status}</span></td>
                  </tr>
               ))}
               {payments.length === 0 && (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:40, color:'var(--gray-500)'}}>No payment records found</td></tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
