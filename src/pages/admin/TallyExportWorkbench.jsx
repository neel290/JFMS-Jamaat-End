import React, { useState } from 'react';
import { Download, FileSpreadsheet, Settings, CheckCircle2, ChevronRight, Database } from 'lucide-react';

export default function TallyExportWorkbench() {
  const [step, setStep] = useState(1);
  const [exporting, setExporting] = useState(false);

  const steps = [
    { id: 1, title: 'Ledger Mapping', desc: 'Sync local purposes with Tally aliases' },
    { id: 2, title: 'Export Config', desc: 'Select date range and voucher types' },
    { id: 3, title: 'Generate XML', desc: 'Download TallyPrime compatible payload' }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tally Export Workbench</h1>
          <p className="page-subtitle">Map chart of accounts and generate Tally-compatible XML exports</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
        {steps.map(s => (
          <div key={s.id} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, opacity: step >= s.id ? 1 : 0.4 }}>
            <div style={{ 
              width: 32, height: 32, borderRadius: '50%', 
              background: step > s.id ? 'var(--color-success)' : (step === s.id ? 'var(--blue-600)' : 'var(--gray-300)'),
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 
            }}>
              {step > s.id ? <CheckCircle2 size={18}/> : s.id}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{s.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{s.desc}</div>
            </div>
            {s.id < 3 && <ChevronRight size={20} style={{ marginLeft: 'auto', color: 'var(--gray-300)' }} />}
          </div>
        ))}
      </div>

      <div className="card" style={{ minHeight: 400 }}>
        {step === 1 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="card-title">Accounting Alias Mapping</h3>
              <button className="btn btn-secondary btn-sm"><Settings size={14}/> Bulk Auto-Map</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>JFMS Income Purpose</th>
                  <th>Tally Ledger Alias</th>
                  <th>Group</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Wajebaat Takhmeen</td>
                  <td><input type="text" className="form-input" style={{height: 32}} defaultValue="Wajebaat Income 1445H" /></td>
                  <td>Direct Income</td>
                  <td><span className="badge badge-success">Mapped</span></td>
                </tr>
                <tr>
                  <td>Zakat</td>
                  <td><input type="text" className="form-input" style={{height: 32}} defaultValue="Zakat Collection" /></td>
                  <td>Dawat Liabilities</td>
                  <td><span className="badge badge-success">Mapped</span></td>
                </tr>
                <tr>
                  <td>Other Donations</td>
                  <td><input type="text" className="form-input" style={{height: 32}} placeholder="Enter Tally Name..." /></td>
                  <td>Indirect Income</td>
                  <td><span className="badge badge-pending">Missing</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {step === 2 && (
          <div style={{ maxWidth: 500, margin: '0 auto', paddingTop: 40 }}>
            <div className="form-group">
              <label className="form-label">Export Period</label>
              <div style={{ display: 'flex', gap: 12 }}>
                <input type="date" className="form-input" defaultValue="2026-04-01" />
                <input type="date" className="form-input" defaultValue="2026-04-30" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Voucher Type Mapping</label>
              <select className="form-input form-select"><option>Tally Standard (Receipt/Payment)</option><option>Journal Only</option></select>
            </div>
            <div className="form-group">
              <label className="form-label">Conflict Resolution</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem' }}>
                <input type="checkbox" defaultChecked /> Skip duplicate Voucher Nos
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <Database size={64} style={{ color: 'var(--blue-600)', marginBottom: 24, opacity: 0.2 }} />
            <h3>XML Payload Ready</h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: 32 }}>Total Vouchers: 1,245 • Size: 2.4 MB • Generated on 03-Apr-2026</p>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setExporting(true);
                setTimeout(() => {
                  setExporting(false);
                  alert('JFMS_Tally_Export_1445H.xml downloaded!');
                }, 1000);
              }}
              disabled={exporting}
            >
              <Download size={18}/> {exporting ? 'Generating...' : 'Download for TallyPrime'}
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Previous</button>
        <button className="btn btn-primary" onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3}>Next</button>
      </div>
    </div>
  );
}
