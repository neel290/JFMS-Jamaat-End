import React, { useState, useEffect } from 'react';
import { 
  Upload, CheckCircle2, AlertTriangle, ArrowRight, Database, 
  FileSpreadsheet, Settings, Users, Landmark, ListChecks, 
  Play, Info, ChevronLeft, ChevronRight, Search
} from 'lucide-react';

const stages = [
  { id: 1, title: 'Instructions', icon: <Info size={18}/> },
  { id: 2, title: 'Environment', icon: <Settings size={18}/> },
  { id: 3, title: 'COA Mapping', icon: <ListChecks size={18}/> },
  { id: 4, title: 'Masters (Mumin/Vendor)', icon: <Users size={18}/> },
  { id: 5, title: 'Bank/Cash Balances', icon: <Landmark size={18}/> },
  { id: 6, title: 'Opening Ledger', icon: <Database size={18}/> },
  { id: 7, title: 'Validation', icon: <FileSpreadsheet size={18}/> },
  { id: 8, title: 'Final Execution', icon: <Play size={18}/> }
];

export default function MigrationWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextStep = () => {
    if (step < 8) {
      setLoading(true);
      setProgress(0);
      let p = 0;
      const interval = setInterval(() => {
        p += 20;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setLoading(false);
          setStep(step + 1);
        }
      }, 300);
    }
  };

  const prevStep = () => step > 1 && setStep(step - 1);

  const renderProgressBar = () => (
    <div style={{display:'flex', gap:8, marginBottom:40, overflowX:'auto', paddingBottom:12}}>
      {stages.map((s) => (
        <div key={s.id} style={{
          minWidth: 140, flex: 1, padding: '12px 8px', borderRadius: 8, textAlign:'center',
          background: step === s.id ? 'var(--env-color)' : step > s.id ? 'var(--green-50)' : 'var(--gray-50)',
          color: step === s.id ? 'white' : step > s.id ? 'var(--green-700)' : 'var(--gray-500)',
          border: `1px solid ${step === s.id ? 'var(--env-color)' : step > s.id ? 'var(--green-200)' : 'var(--gray-200)'}`,
          transition: 'all 0.3s'
        }}>
          <div style={{display:'flex', justifyContent:'center', marginBottom: 4}}>{step > s.id ? <CheckCircle2 size={16}/> : s.icon}</div>
          <div style={{fontSize:'0.6875rem', fontWeight:600, whiteSpace:'nowrap'}}>{s.title}</div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) return (
      <div className="card" style={{textAlign:'center', padding:60}}>
        <div className="spinner" style={{margin:'0 auto 24px'}}/>
        <h3>Processing Stage {step}...</h3>
        <p style={{color:'var(--gray-500)', marginTop:8}}>Preparing data and validating schemas ({progress}%)</p>
        <div style={{width: 300, height: 6, background:'var(--gray-100)', borderRadius: 3, margin:'24px auto', overflow:'hidden'}}>
           <div style={{width: `${progress}%`, height:'100%', background:'var(--env-color)', transition:'width 0.3s'}}/>
        </div>
      </div>
    );

    switch(step) {
      case 1: return (
        <div className="card">
          <div style={{display:'flex', gap: 24}}>
            <div style={{flex: 1}}>
              <h2 style={{marginBottom: 16}}>1. Migration Instructions</h2>
              <div style={{display:'flex', flexDirection:'column', gap: 12, color:'var(--gray-600)', fontSize:'0.875rem'}}>
                <p>Welcome to the JFMS Data Migration Wizard. This 8-stage process ensures your legacy data is accurately transitioned.</p>
                <ul style={{paddingLeft: 20, display:'flex', flexDirection:'column', gap: 8}}>
                  <li>Ensure all Excel files follow the standard JFMS template.</li>
                  <li>Chart of Accounts must be mapped before balances are uploaded.</li>
                  <li>Opening balances will be locked once Stage 8 is completed.</li>
                </ul>
                <div className="alert alert-info" style={{marginTop: 12}}>
                   <Info size={18}/> <strong>Prerequisite:</strong> Download the mapping template from the Admin panel.
                </div>
              </div>
            </div>
            <div style={{width: 240, padding: 24, background:'var(--gray-50)', borderRadius: 12, textAlign:'center'}}>
               <FileSpreadsheet size={48} color="var(--gray-400)" style={{marginBottom: 12}}/>
               <h4>Ready to Start?</h4>
               <p style={{fontSize:'0.75rem', color:'var(--gray-500)', marginTop: 8}}>Migration process typically takes 15-30 minutes.</p>
            </div>
          </div>
        </div>
      );
      case 2: return (
        <div className="card">
          <h2 style={{marginBottom: 16}}>2. Environment & Target Setup</h2>
          <div className="grid-2">
             <div className="form-group">
                <label className="form-label">Target Environment</label>
                <select className="form-input">
                   <option>Sabeel (Main)</option>
                   <option>FMB (Food Service)</option>
                </select>
             </div>
             <div className="form-group">
                <label className="form-label">Migration Period</label>
                <input type="text" className="form-input" value="1445H - 1446H" disabled/>
             </div>
          </div>
          <div className="form-group" style={{marginTop: 16}}>
             <label className="form-label">Previous System Source</label>
             <div style={{display:'flex', gap: 12}}>
                <button className="btn btn-outline" style={{flex:1, border:'2px solid var(--env-color)'}}>Tally Prime</button>
                <button className="btn btn-outline" style={{flex:1}}>QuickBooks</button>
                <button className="btn btn-outline" style={{flex:1}}>Excel / Legacy</button>
             </div>
          </div>
        </div>
      );
      case 3: return (
        <div className="card">
           <h2 style={{marginBottom: 16}}>3. Chart of Accounts Mapping</h2>
           <div className="data-table-wrapper">
              <table className="data-table">
                 <thead><tr><th>Legacy Ledger Name</th><th>JFMS COA Group</th><th>Match Confidence</th></tr></thead>
                 <tbody>
                    {[['Cash Account','Cash in Hand','98%'],['Sabeel Income','Wajebaat Income','100%'],['General Maintenance','Property Expenses','82%']].map(([l,j,c])=>(
                       <tr key={l}><td>{l}</td><td><select className="form-input" style={{padding:'4px 8px'}} defaultValue={j}><option>{j}</option></select></td><td><span className="badge badge-success">{c}</span></td></tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      );
      case 4: return (
        <div className="card" style={{textAlign:'center', padding:40}}>
           <Users size={48} color="var(--env-color)" style={{marginBottom:16}}/>
           <h2>4. Masters (Mumin & Vendor) Import</h2>
           <div onClick={()=>{}} style={{border:'2px dashed var(--gray-300)', padding: 40, borderRadius: 12, marginTop: 16, cursor:'pointer'}}>
              <Upload size={24} style={{marginBottom: 8}}/>
              <p>Drag and drop <strong>Mumin_Master.xlsx</strong> and <strong>Vendor_Master.xlsx</strong></p>
           </div>
        </div>
      );
      case 5: return (
        <div className="card">
           <h2 style={{marginBottom:16}}>5. Bank & Cash Closing Balances</h2>
           <p style={{fontSize:'0.875rem', color:'var(--gray-500)', marginBottom: 20}}>Enter the closing balance from your previous system as of 31-Mar-2026.</p>
           {[['SBI Main - 1234','₹0.00'],['HDFC Corpus - 5678','₹0.00'],['Cash in Hand','₹0.00']].map(([b,v])=>(
              <div key={b} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', border:'1px solid var(--gray-200)', borderRadius: 8, marginBottom: 12}}>
                 <div style={{fontWeight:600}}>{b}</div>
                 <input type="text" className="form-input" style={{width: 150, textAlign:'right'}} placeholder="₹ 0.00"/>
              </div>
           ))}
        </div>
      );
      case 6: return (
        <div className="card">
           <h2 style={{marginBottom:16}}>6. Opening Ledger Balances</h2>
           <div className="alert alert-warning" style={{marginBottom: 20}}>
              <AlertTriangle size={18}/> Ensure Total Debits = Total Credits for the trial balance to be valid.
           </div>
           <div className="data-table-wrapper">
              <table className="data-table">
                 <thead><tr><th>Ledger</th><th>Debit (₹)</th><th>Credit (₹)</th></tr></thead>
                 <tbody>
                    <tr><td>Accumulated Surplus</td><td>-</td><td>45,00,000</td></tr>
                    <tr><td>Fixed Assets</td><td>32,00,000</td><td>-</td></tr>
                    <tr><td>Sundry Creditors</td><td>-</td><td>1,20,000</td></tr>
                 </tbody>
                 <tfoot style={{fontWeight:700}}>
                    <tr><td>Final Total</td><td>32,00,000</td><td>46,20,000</td></tr>
                 </tfoot>
              </table>
           </div>
           <div style={{textAlign:'right', color:'var(--red-600)', marginTop: 12, fontWeight:600}}>Mismatch: ₹14,20,000</div>
        </div>
      );
      case 7: return (
        <div className="card">
           <h2 style={{marginBottom: 16}}>7. Consistency & Data Validation</h2>
           <div style={{display:'flex', flexDirection:'column', gap: 12}}>
              {[
                { label: 'Schema Integrity Check', status: 'Passed' },
                { label: 'ITS ID Validation (1,247 records)', status: 'Passed' },
                { label: 'Duplicate Sabeel No Detection', status: 'Warning (2 skipped)' },
                { label: 'Financial Year Boundary Audit', status: 'Passed' }
              ].map((v,i)=>(
                <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'12px 16px', background:'var(--gray-50)', borderRadius: 8}}>
                  <span>{v.label}</span>
                  <span className={`badge badge-${v.status.includes('Passed') ? 'success' : 'pending'}`}>{v.status}</span>
                </div>
              ))}
           </div>
        </div>
      );
      case 8: return (
        <div className="card" style={{textAlign:'center', padding:60}}>
           <CheckCircle2 size={64} color="var(--green-500)" style={{marginBottom: 24}}/>
           <h2>Ready to Execute</h2>
           <p style={{color:'var(--gray-500)', marginBottom: 32}}>All 7 stages are verified. Click below to commit data to the live environment.</p>
           <button className="btn btn-primary" style={{width: 300, height: 56, fontSize:'1.125rem'}} onClick={()=>{alert('Data Migrated Successfully!'); setStep(1);}}>
             Commit & Finalize <Play size={20} style={{marginLeft: 8}}/>
           </button>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="migration-wizard-container" style={{maxWidth: 1000, margin:'0 auto'}}>
      <div className="page-header" style={{textAlign:'center', display:'block', marginBottom: 40}}>
        <h1 className="page-title">Enterprise Data Migration Hub</h1>
        <p className="page-subtitle">Standardized 8-stage transition flow from legacy systems</p>
      </div>

      {renderProgressBar()}

      <div style={{minHeight: 400}}>
        {renderContent()}
      </div>

      {!loading && step < 8 && (
        <div style={{display:'flex', justifyContent:'space-between', marginTop: 32}}>
          <button className="btn btn-ghost" onClick={prevStep} disabled={step === 1} style={{gap: 8}}>
            <ChevronLeft size={16}/> Back
          </button>
          <button className="btn btn-primary" onClick={nextStep} style={{gap: 8, padding:'0 32px'}}>
            Continue to Stage {step + 1} <ChevronRight size={16}/>
          </button>
        </div>
      )}
    </div>
  );
}