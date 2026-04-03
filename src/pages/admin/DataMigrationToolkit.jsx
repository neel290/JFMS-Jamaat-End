import React, { useState } from 'react';
import { Database, Upload, CheckCircle2, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

export default function DataMigrationToolkit() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const stages = ['Connectivity', 'Extraction', 'Mapping', 'Verification', 'Push to Live'];

  const startMigration = () => {
    setStep(2);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep(3);
      }
    }, 100);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Data Migration Toolkit (DMT)</h1>
          <p className="page-subtitle">V1 to V2 Migration: Legacy Tally / Spreadsheet Importer</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid var(--blue-600)' }}>
         <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ background: 'var(--blue-100)', color: 'var(--blue-700)', padding: 12, borderRadius: 8 }}><Database size={24}/></div>
            <div>
               <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Active Migration Project: Dholka_V1_2026</h3>
               <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>Initialized on 01-Apr-2026 • 8-Stage Secure Wizard</p>
            </div>
         </div>
      </div>

      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        {step === 1 && (
          <div>
            <Upload size={48} style={{ color: 'var(--gray-300)', margin: '0 auto 20px' }} />
            <h3>Upload Legacy Dataset</h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Upload exported .XML or .XLSX files from your V1 Tally instance.</p>
            <div style={{ border: '2px dashed var(--gray-200)', borderRadius: 12, padding: 40, marginBottom: 24, cursor: 'pointer' }} onClick={startMigration}>
               <p style={{ color: 'var(--blue-600)', fontWeight: 600 }}>Click to select migration payload</p>
               <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Supported: TallyPrime XML, JFMS-Legacy XLS</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ padding: '40px 0' }}>
            <Loader2 size={48} className="animate-spin" style={{ color: 'var(--blue-600)', margin: '0 auto 20px' }} />
            <h3>Migrating Records... {progress}%</h3>
            <div style={{ width: 300, height: 8, background: 'var(--gray-100)', borderRadius: 4, margin: '20px auto', overflow: 'hidden' }}>
               <div style={{ width: `${progress}%`, height: '100%', background: 'var(--blue-600)', transition: 'width 0.1s' }}></div>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>Parsing {progress * 15} Sabeel master records...</p>
          </div>
        )}

        {step === 3 && (
          <div>
            <CheckCircle2 size={48} style={{ color: 'var(--color-success)', margin: '0 auto 20px' }} />
            <h3>Extraction Complete</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 600, margin: '24px auto' }}>
               <div className="card" style={{ padding: 12 }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>124</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Sabeels Found</div>
               </div>
               <div className="card" style={{ padding: 12 }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>852</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Ledger Lines</div>
               </div>
               <div className="card" style={{ padding: 12, border: '1px solid var(--color-warning)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-warning)' }}>3</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Mapping Conflicts</div>
               </div>
            </div>
            <button className="btn btn-primary" onClick={() => setStep(1)}>Proceed to Mapping <ArrowRight size={16}/></button>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
         <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-warning)', marginBottom: 12 }}>
            <AlertCircle size={18}/> Compliance Notice
         </h4>
         <p style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
            Data migration is a destructive operation. All existing records in the {step === 2 ? 'Temporary' : 'Staging'} environment will be overwritten upon confirmation in Stage 8.
         </p>
      </div>
    </div>
  );
}
