import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AamilSSO() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div className="card" style={{ maxWidth: 450, width: '90%', padding: 40, textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ background: 'var(--amber-100)', color: 'var(--amber-700)', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <ShieldCheck size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--gray-900)' }}>Amalat SSO Login</h2>
        <p style={{ color: 'var(--gray-600)', marginBottom: 32, fontSize: '0.875rem' }}>Secure access for Aamil Sahebs & Authorized Delegates</p>

        <div style={{ background: 'var(--gray-50)', padding: 20, borderRadius: 12, marginBottom: 32, textAlign: 'left', border: '1px solid var(--gray-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
             <div style={{ background: 'var(--gray-200)', width: 32, height: 32, borderRadius: '50%' }}></div>
             <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Aamil Saheb (Dholka)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>ITS: 50401234</div>
             </div>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lock size={14} /> session secured by Amalat Infrastructure
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '14px', borderRadius: 8, display: 'flex', justifyContent: 'center', gap: 8, background: 'var(--amber-600)', borderColor: 'var(--amber-700)' }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Authenticating...' : (
            <>Continue to JFMS <ArrowRight size={18}/></>
          )}
        </button>

        <div style={{ marginTop: 24, fontSize: '0.75rem', color: 'var(--gray-400)' }}>
          You will be redirected back to JFMS Jamaat End after verification.
        </div>
      </div>
    </div>
  );
}
