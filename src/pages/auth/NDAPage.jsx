import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Shield, PenTool } from 'lucide-react';

export default function NDAPage() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [signMethod, setSignMethod] = useState('aadhaar');

  return (
    <div className="nda-page">
      <div className="nda-container">
        <div className="nda-header">
          <FileText size={36} style={{ marginBottom: 12 }} />
          <h2>Non-Disclosure Agreement</h2>
          <p style={{ opacity: 0.8, fontSize: '0.875rem', marginTop: 4 }}>Version 2.0 — Published 01 Jan 2026</p>
        </div>
        <div className="nda-body">
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: 16 }}>
            Please read and accept the NDA before accessing the system. This agreement governs the confidentiality of all financial data within JFMS.
          </p>
          <div className="nda-scroll-box">
            <h4 style={{ marginBottom: 12 }}>CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT</h4>
            <p>This Non-Disclosure Agreement ("Agreement") is entered into between the Jamaat Administration ("Organization") and the undersigned user ("User") of the Jamaat Financial Management System ("JFMS").</p>
            <p style={{ marginTop: 12 }}><strong>1. Confidential Information.</strong> The User acknowledges that access to JFMS provides exposure to confidential financial information including but not limited to: Takhmeen records, contribution amounts, Sabeel household financial data, bank account details, vendor payment records, salary information, and all other financial records maintained within the system.</p>
            <p style={{ marginTop: 12 }}><strong>2. Non-Disclosure Obligations.</strong> The User agrees to: (a) maintain strict confidentiality of all data accessed through JFMS; (b) not disclose, share, or communicate any financial data to unauthorized persons; (c) not copy, download, or transfer data outside the authorized system interfaces; (d) report any suspected data breach immediately to the System Administrator.</p>
            <p style={{ marginTop: 12 }}><strong>3. Authorized Use.</strong> The User shall access only those modules and records for which they have been explicitly granted permission through their assigned role. Any attempt to access unauthorized data shall constitute a violation of this Agreement.</p>
            <p style={{ marginTop: 12 }}><strong>4. Data Protection.</strong> The User acknowledges that all personal data within JFMS is protected under applicable privacy laws including the Digital Data Protection Act (DDPA) and General Data Protection Regulation (GDPR) where applicable.</p>
            <p style={{ marginTop: 12 }}><strong>5. Duration.</strong> This Agreement shall remain in effect for the duration of the User's access to JFMS and for a period of 5 (five) years following the termination of access.</p>
            <p style={{ marginTop: 12 }}><strong>6. Consequences of Breach.</strong> Any breach of this Agreement may result in immediate revocation of system access, disciplinary action, and potential legal proceedings as deemed necessary by the Organization.</p>
            <p style={{ marginTop: 12 }}><strong>7. Acknowledgment.</strong> By accepting this Agreement, the User confirms that they have read, understood, and agree to abide by all terms and conditions stated herein.</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="form-label" style={{ marginBottom: 12 }}>Signature Method</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                border: `2px solid ${signMethod === 'aadhaar' ? 'var(--env-sabeel)' : 'var(--gray-200)'}`,
                borderRadius: 'var(--radius-md)', cursor: 'pointer', background: signMethod === 'aadhaar' ? 'var(--env-sabeel-light)' : 'white'
              }}>
                <input type="radio" name="sign" value="aadhaar" checked={signMethod === 'aadhaar'} onChange={() => setSignMethod('aadhaar')} style={{ accentColor: 'var(--env-sabeel)' }} />
                <Shield size={20} style={{ color: 'var(--env-sabeel)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Aadhaar OTP e-Sign</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Verify via Aadhaar OTP</div>
                </div>
              </label>
              <label style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                border: `2px solid ${signMethod === 'digital' ? 'var(--env-sabeel)' : 'var(--gray-200)'}`,
                borderRadius: 'var(--radius-md)', cursor: 'pointer', background: signMethod === 'digital' ? 'var(--env-sabeel-light)' : 'white'
              }}>
                <input type="radio" name="sign" value="digital" checked={signMethod === 'digital'} onChange={() => setSignMethod('digital')} style={{ accentColor: 'var(--env-sabeel)' }} />
                <PenTool size={20} style={{ color: 'var(--env-sabeel)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Digital Signature</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Standard digital sign</div>
                </div>
              </label>
            </div>
          </div>

          <label className="form-checkbox" style={{ marginBottom: 20 }}>
            <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
            <span>I have read, understood, and accept the Non-Disclosure Agreement</span>
          </label>

          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            disabled={!accepted}
            onClick={() => navigate('/security-onboarding')}
          >
            Accept and Continue
          </button>
        </div>
      </div>
    </div>
  );
}
