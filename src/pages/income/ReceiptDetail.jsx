import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Mail, CheckCircle2 } from 'lucide-react';

export default function ReceiptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <div style={{display:'flex', alignItems:'center', gap: 12}}>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}><ArrowLeft size={16}/></button>
          <div>
            <h1 className="page-title">Receipt {id || 'REC-2026-0453'}</h1>
            <p className="page-subtitle">View and print receipt</p>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><Mail size={16}/> Email</button>
          <button className="btn btn-secondary"><Download size={16}/> PDF</button>
          <button className="btn btn-primary" onClick={() => window.print()}><Printer size={16}/> Print</button>
        </div>
      </div>

      <div className="grid-3-1" style={{gap: 24}}>
        <div className="card" style={{padding: 40}}>
          {/* Visual Receipt */}
          <div style={{borderBottom: '2px solid var(--gray-200)', paddingBottom: 16, marginBottom: 24, display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <h2 style={{color:'var(--env-color)', marginBottom: 4}}>Jamaat Financial Management System</h2>
              <p style={{fontSize:'0.875rem', color:'var(--gray-500)'}}>Dholka Jamaat • Generated on 01-Apr-2026</p>
            </div>
            <div style={{textAlign: 'right'}}>
              <h3 style={{fontSize:'1.25rem'}}>RECEIPT</h3>
              <p style={{fontWeight: 600, color: 'var(--gray-700)'}}>{id || 'REC-2026-0453'}</p>
            </div>
          </div>

          <div className="grid-2" style={{marginBottom: 32}}>
            <div>
              <div style={{fontSize:'0.75rem', color:'var(--gray-500)', textTransform:'uppercase'}}>Received From</div>
              <div style={{fontWeight: 600, fontSize:'1.125rem', marginTop: 4}}>Shabbir Bhai Cyclewala</div>
              <div style={{fontSize:'0.875rem'}}>ITS: 30410123</div>
              <div style={{fontSize:'0.875rem'}}>Sabeel No: 101</div>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontSize:'0.75rem', color:'var(--gray-500)', textTransform:'uppercase'}}>Payment Details</div>
              <div style={{fontSize:'0.875rem', marginTop: 4}}><strong>Mode:</strong> Bank Transfer (NEFT)</div>
              <div style={{fontSize:'0.875rem'}}><strong>Bank:</strong> State Bank of India</div>
              <div style={{fontSize:'0.875rem'}}><strong>Ref:</strong> UTR102938475</div>
            </div>
          </div>

          <table className="data-table" style={{marginBottom: 32}}>
            <thead>
              <tr>
                <th>Purpose</th>
                <th style={{textAlign: 'right'}}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wajebaat Takhmeen 1445H</td>
                <td style={{textAlign: 'right'}}>₹15,000</td>
              </tr>
              <tr>
                <td>Zakat</td>
                <td style={{textAlign: 'right'}}>₹5,000</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{fontWeight: 700, background: 'var(--gray-50)'}}>
                <td style={{padding: 12}}>Total Received</td>
                <td style={{textAlign: 'right'}}>₹20,000</td>
              </tr>
            </tfoot>
          </table>

          <div style={{fontSize:'0.875rem', color:'var(--gray-600)', marginBottom: 40}}>
            <strong>Amount in words:</strong> Twenty Thousand Rupees Only.
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <div style={{fontSize:'0.75rem', color:'var(--gray-400)'}}>
              This is a computer generated receipt.
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{borderBottom: '1px solid var(--gray-400)', width: 140, marginBottom: 8}}></div>
              <div style={{fontSize:'0.875rem', fontWeight: 600}}>Authorized Signatory</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title" style={{marginBottom: 16}}>Status Details</h3>
          <div style={{display:'flex', alignItems:'center', gap: 8, padding: 12, background:'var(--color-success-light)', color:'var(--color-success)', borderRadius:'var(--radius-md)', marginBottom: 24, fontWeight: 600}}>
            <CheckCircle2 size={18}/> Cleared & Realized
          </div>

          <h4 style={{fontSize:'0.875rem', marginBottom: 12, textTransform:'uppercase', color:'var(--gray-500)'}}>Audit Log</h4>
          <div style={{position:'relative', paddingLeft: 16, borderLeft:'2px solid var(--gray-200)', display:'flex', flexDirection:'column', gap: 16}}>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:-21, top:2, width:10, height:10, borderRadius:'50%', background:'var(--color-success)'}}></div>
              <div style={{fontSize:'0.8125rem', fontWeight:600}}>Marked as Cleared</div>
              <div style={{fontSize:'0.75rem', color:'var(--gray-500)'}}>System (Auto-Recon) · 02-Apr-2026</div>
            </div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:-21, top:2, width:10, height:10, borderRadius:'50%', background:'var(--gray-400)'}}></div>
              <div style={{fontSize:'0.8125rem', fontWeight:600}}>Receipt Generated</div>
              <div style={{fontSize:'0.75rem', color:'var(--gray-500)'}}>Taher Bhai · 01-Apr-2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
