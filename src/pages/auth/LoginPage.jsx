import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, KeyRound, Eye, EyeOff, ArrowRight, Info } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [itsId, setItsId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/otp');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">J</div>
          <h1>JFMS</h1>
          <p>Jamaat Financial Management System</p>
          <p style={{ marginTop: 16, fontSize: '0.875rem', opacity: 0.6 }}>
            Comprehensive financial management for the Dawoodi Bohra community
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 40, display: 'flex', alignItems: 'center', gap: 8, opacity: 0.5, fontSize: '0.75rem' }}>
          <Info size={14} />
          <span>Aamil Saheb? Authenticate via the Amalat Portal →</span>
        </div>
      </div>

      <div className="login-right">
        <h2 className="login-form-title">Welcome back</h2>
        <p className="login-form-subtitle">Sign in to access your environment</p>

        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: 24 }}>
          <button className={`tab ${activeTab === 'phone' ? 'active' : ''}`} onClick={() => setActiveTab('phone')}>
            <Phone size={14} style={{ marginRight: 6 }} /> Phone
          </button>
          <button className={`tab ${activeTab === 'email' ? 'active' : ''}`} onClick={() => setActiveTab('email')}>
            <Mail size={14} style={{ marginRight: 6 }} /> Email
          </button>
          <button className={`tab ${activeTab === 'its' ? 'active' : ''}`} onClick={() => setActiveTab('its')}>
            <KeyRound size={14} style={{ marginRight: 6 }} /> ITS ID
          </button>
        </div>

        <form onSubmit={handleLogin}>
          {activeTab === 'phone' && (
            <div className="form-group">
              <label className="form-label">Phone Number <span className="required">*</span></label>
              <div style={{ display: 'flex', gap: 8 }}>
                <select className="form-input form-select" style={{ width: 100 }} defaultValue="+91">
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+971</option>
                </select>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="form-group">
              <label className="form-label">Email Address <span className="required">*</span></label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          )}

          {activeTab === 'its' && (
            <>
              <div className="form-group">
                <label className="form-label">ITS ID <span className="required">*</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter 8-digit ITS ID"
                  maxLength={8}
                  value={itsId}
                  onChange={e => setItsId(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password <span className="required">*</span></label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingRight: 40 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }}>
            {activeTab === 'its' ? 'Sign In' : 'Get OTP'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a
            onClick={() => navigate('/recovery')}
            style={{ fontSize: '0.875rem', cursor: 'pointer', color: 'var(--gray-500)' }}
          >
            Forgot Password / ITS ID?
          </a>
        </div>
      </div>
    </div>
  );
}
