import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';

export default function OTPPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verified, setVerified] = useState(false);

  const handleChange = (i, val) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setVerified(true);
    setTimeout(() => navigate('/nda'), 1200);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">J</div>
          <h1>JFMS</h1>
          <p>Jamaat Financial Management System</p>
        </div>
      </div>
      <div className="login-right">
        {!verified ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--env-sabeel-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--env-sabeel)' }}>
                <ShieldCheck size={28} />
              </div>
              <h2 className="login-form-title">Verify your identity</h2>
              <p className="login-form-subtitle">
                We've sent a 6-digit OTP via <strong>SMS</strong> and <strong>WhatsApp</strong>
              </p>
            </div>

            <form onSubmit={handleVerify}>
              <div className="otp-inputs">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    className="otp-input"
                    value={digit}
                    onChange={e => handleChange(i, e.target.value)}
                    style={{ fontFamily: 'var(--font-family)' }}
                  />
                ))}
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Verify OTP <ArrowRight size={18} />
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <RotateCcw size={14} style={{ color: 'var(--gray-400)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)', cursor: 'pointer' }}>
                Resend OTP
              </span>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-success)' }}>
              <ShieldCheck size={32} />
            </div>
            <h2 style={{ color: 'var(--color-success)', marginBottom: 8 }}>Verified!</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>Redirecting to your account...</p>
          </div>
        )}
      </div>
    </div>
  );
}
