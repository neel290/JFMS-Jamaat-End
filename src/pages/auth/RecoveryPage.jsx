import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

export default function RecoveryPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('password');
  const [step, setStep] = useState(1);

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">J</div>
          <h1>JFMS</h1>
          <p>Account Recovery</p>
        </div>
      </div>
      <div className="login-right">
        <button onClick={() => navigate('/')} className="btn btn-ghost" style={{ marginBottom: 24 }}>
          <ArrowLeft size={16} /> Back to Login
        </button>

        <h2 className="login-form-title">
          {mode === 'password' ? 'Forgot Password' : 'Forgot ITS ID'}
        </h2>
        <p className="login-form-subtitle">
          {step === 1 ? 'Enter your details to receive a recovery OTP' : step === 2 ? 'Enter the OTP sent to your registered contact' : 'Set your new password'}
        </p>

        <div className="tabs" style={{ marginBottom: 24 }}>
          <button className={`tab ${mode === 'password' ? 'active' : ''}`} onClick={() => { setMode('password'); setStep(1); }}>
            Forgot Password
          </button>
          <button className={`tab ${mode === 'itsid' ? 'active' : ''}`} onClick={() => { setMode('itsid'); setStep(1); }}>
            Forgot ITS ID
          </button>
        </div>

        {/* Step Indicator */}
        <div className="wizard-steps" style={{ marginBottom: 32 }}>
          <div className={`wizard-step ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}`}>
            <div className="wizard-step-number">{step > 1 ? '✓' : '1'}</div>
            <span className="wizard-step-label">Details</span>
          </div>
          <div className={`wizard-step ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}`}>
            <div className="wizard-step-number">{step > 2 ? '✓' : '2'}</div>
            <span className="wizard-step-label">OTP</span>
          </div>
          <div className={`wizard-step ${step >= 3 ? 'active' : ''}`}>
            <div className="wizard-step-number">3</div>
            <span className="wizard-step-label">{mode === 'password' ? 'New Password' : 'Your ITS ID'}</span>
          </div>
        </div>

        {step === 1 && (
          <>
            {mode === 'password' ? (
              <div className="form-group">
                <label className="form-label">ITS ID <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="Enter your 8-digit ITS ID" maxLength={8} />
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Registered Phone Number <span className="required">*</span></label>
                <input type="tel" className="form-input" placeholder="+91 98765 43210" />
              </div>
            )}
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setStep(2)}>
              Send OTP <Send size={16} />
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="otp-inputs">
              {[0,1,2,3,4,5].map(i => (
                <input key={i} type="text" maxLength={1} className="otp-input" style={{ fontFamily: 'var(--font-family)' }} />
              ))}
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setStep(3)}>
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && mode === 'password' && (
          <>
            <div className="form-group">
              <label className="form-label">New Password <span className="required">*</span></label>
              <input type="password" className="form-input" placeholder="Enter new password" />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password <span className="required">*</span></label>
              <input type="password" className="form-input" placeholder="Confirm new password" />
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => navigate('/')}>
              Reset Password
            </button>
          </>
        )}

        {step === 3 && mode === 'itsid' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ background: 'var(--color-success-light)', color: 'var(--color-success)', padding: 24, borderRadius: 'var(--radius-lg)', marginBottom: 20 }}>
              <p style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: 4 }}>Your ITS ID</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: 4 }}>30412587</p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
