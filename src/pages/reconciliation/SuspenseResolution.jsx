import React from 'react';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function SuspenseResolution() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Suspense Resolution</h1>
          <p className="page-subtitle">Resolve unmatched credits and bank deposits</p>
        </div>
      </div>
      
      <div className="grid-3-1" style={{gap: 24, marginBottom: 24}}>
        <div className="card" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'var(--color-success-light)', color:'var(--color-success)', borderColor:'var(--color-success)'}}>
          <h3 style={{fontSize:'3rem', fontWeight:800}}>2</h3>
          <p style={{fontWeight:600}}>&lt; 7 Days</p>
        </div>
        <div className="card" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'var(--color-warning-light)', color:'var(--color-warning)', borderColor:'var(--color-warning)'}}>
          <h3 style={{fontSize:'3rem', fontWeight:800}}>1</h3>
          <p style={{fontWeight:600}}>7 - 14 Days</p>
        </div>
        <div className="card" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'var(--color-error-light)', color:'var(--color-error)', borderColor:'var(--color-error)'}}>
          <h3 style={{fontSize:'3rem', fontWeight:800}}>3</h3>
          <p style={{fontWeight:600}}>&gt; 14 Days (Critical)</p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title" style={{marginBottom: 16}}>Suspense Credits Queue</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Bank Account</th>
              <th>Description / Narration</th>
              <th>Amount</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01-Apr-2026</td>
              <td>SBI ****4521</td>
              <td>NEFT-IN-HDFC-30419283-UNKNOWN</td>
              <td style={{fontWeight:600}}>₹15,000</td>
              <td><span className="badge badge-active">2 Days</span></td>
              <td><button className="btn btn-primary btn-sm">Resolve</button></td>
            </tr>
            <tr>
              <td>23-Mar-2026</td>
              <td>ICICI ****1234</td>
              <td>CASH DEPOSIT - BRANCH 12</td>
              <td style={{fontWeight:600}}>₹50,000</td>
              <td><span className="badge badge-pending">10 Days</span></td>
              <td><button className="btn btn-primary btn-sm">Resolve</button></td>
            </tr>
            <tr>
              <td>10-Mar-2026</td>
              <td>SBI ****4521</td>
              <td>IMPS-IN-YES-120485</td>
              <td style={{fontWeight:600}}>₹10,000</td>
              <td><span className="badge badge-error" style={{background:'var(--color-error)', color:'white'}}>23 Days</span></td>
              <td><button className="btn btn-primary btn-sm">Resolve</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}