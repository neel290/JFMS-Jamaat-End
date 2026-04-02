import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { FileDown, CheckCircle2, AlertCircle, Download, FileJson, FileCode } from 'lucide-react';

export default function TallyExport() {
  const [status, setStatus] = useState('idle'); // idle, generating, ready

  const handleExport = () => {
    setStatus('generating');
    setTimeout(() => setStatus('ready'), 2000);
  };

  return (
    <div className="tally-export-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tally ERP/Prime Integration</h1>
          <p className="page-subtitle">Export JFMS vouchers and ledgers to Tally XML format</p>
        </div>
      </div>

      <div className="grid-2" style={{gap: 24}}>
        <div className="card">
          <h3 style={{marginBottom: 20}}>Export Configuration</h3>
          <div className="form-group">
            <label className="form-label">Select Period</label>
            <select className="form-input">
              <option>Current Month (Apr 2026)</option>
              <option>Last Month (Mar 2026)</option>
              <option>Financial Year 2025-26</option>
            </select>
          </div>
          <div className="form-group" style={{marginTop: 16}}>
            <label className="form-label">Data Type</label>
            <div style={{display:'flex', gap: 12}}>
              <label className="form-checkbox" style={{flex:1, border:'1px solid var(--gray-200)', padding:12, borderRadius:8}}>
                <input type="checkbox" defaultChecked /> <span>Vouchers</span>
              </label>
              <label className="form-checkbox" style={{flex:1, border:'1px solid var(--gray-200)', padding:12, borderRadius:8}}>
                <input type="checkbox" defaultChecked /> <span>Masters</span>
              </label>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{width:'100%', marginTop: 24, gap: 8}}
            onClick={handleExport}
            disabled={status === 'generating'}
          >
            {status === 'generating' ? 'Generating XML...' : <><FileCode size={18}/> Generate Tally XML</>}
          </button>
        </div>

        <div className="card" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
          {status === 'idle' && (
            <>
              <FileDown size={64} color="var(--gray-200)" style={{marginBottom: 16}}/>
              <p style={{color:'var(--gray-500)'}}>Configure your export settings to generate the Tally compatible file.</p>
            </>
          )}

          {status === 'generating' && (
            <div className="loading-spinner"></div>
          )}

          {status === 'ready' && (
            <div className="fade-in">
              <div style={{width: 64, height: 64, background:'var(--green-50)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color:'var(--green-600)'}}>
                <CheckCircle2 size={32}/>
              </div>
              <h3 style={{color:'var(--green-700)'}}>Export Ready!</h3>
              <p style={{fontSize:'0.875rem', color:'var(--gray-500)', marginTop: 8}}>JFMS_Tally_Export_20260401.xml is ready for download.</p>
              <button className="btn btn-success" style={{marginTop: 24, gap: 8}} onClick={() => alert('File Downloaded')}>
                <Download size={18}/> Download File
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{marginTop: 24, background:'#FFFBEB', border:'1px solid #FEF3C7'}}>
         <div style={{display:'flex', gap: 12, color:'#92400E'}}>
            <AlertCircle size={20}/>
            <div>
               <div style={{fontWeight: 700}}>Important Note</div>
               <p style={{fontSize:'0.8125rem', marginTop: 4}}>Ensure that the 'Voucher Numbering' in Tally is set to 'Manual' before importing this file to prevent duplication.</p>
            </div>
         </div>
      </div>
    </div>
  );
}