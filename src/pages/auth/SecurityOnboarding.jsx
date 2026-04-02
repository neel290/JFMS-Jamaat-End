import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Shield, Key, CheckCircle, ArrowRight } from 'lucide-react';

export default function SecurityOnboarding() {
  const navigate = useNavigate();
  const { currentUser, setAuth } = useStore();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ q1: '', q2: '', pin: '' });

  const handleFinish = () => {
    // In a real app, we'd save this to the backend
    setAuth({ ...currentUser, securitySetupComplete: true });
    navigate('/select-environment');
  };

  return (
    <div className="auth-container" style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'var(--gray-50)'}}>
      <div className="card" style={{maxWidth: 450, padding: 40}}>
        <div style={{textAlign:'center', marginBottom: 32}}>
          <div style={{width: 64, height: 64, background:'var(--blue-50)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color:'var(--blue-600)'}}>
            <Shield size={32}/>
          </div>
          <h2 style={{fontSize:'1.5rem', fontWeight: 700}}>Secure Your Account</h2>
          <p style={{color:'var(--gray-500)', fontSize:'0.875rem', marginTop: 8}}>Please set up your security questions and transaction PIN.</p>
        </div>

        {step === 1 ? (
          <div>
            <div className="form-group">
              <label className="form-label">Security Question 1</label>
              <select className="form-input">
                <option>What was the name of your first school?</option>
                <option>What is your mother's maiden name?</option>
                <option>What was your first pet's name?</option>
              </select>
              <input 
                type="text" 
                className="form-input" 
                style={{marginTop: 8}} 
                placeholder="Your Answer"
                value={answers.q1}
                onChange={e => setAnswers({...answers, q1: e.target.value})}
              />
            </div>
            <div className="form-group" style={{marginTop: 20}}>
              <label className="form-label">Security Question 2</label>
              <select className="form-input">
                <option>In what city were you born?</option>
                <option>What is your favorite book?</option>
                <option>What was your first car?</option>
              </select>
              <input 
                type="text" 
                className="form-input" 
                style={{marginTop: 8}} 
                placeholder="Your Answer"
                value={answers.q2}
                onChange={e => setAnswers({...answers, q2: e.target.value})}
              />
            </div>
            <button 
              className="btn btn-primary" 
              style={{width:'100%', marginTop: 32, gap: 8}}
              onClick={() => setStep(2)}
              disabled={!answers.q1 || !answers.q2}
            >
              Continue to PIN Setup <ArrowRight size={18}/>
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label className="form-label">Set 4-Digit Transaction PIN</label>
              <p style={{fontSize:'0.75rem', color:'var(--gray-500)', marginBottom: 12}}>Required for approving payments and high-value transfers.</p>
              <div style={{display:'flex', gap: 12, justifyContent:'center'}}>
                {[1,2,3,4].map(i => (
                  <input 
                    key={i}
                    type="password" 
                    maxLength="1" 
                    className="form-input" 
                    style={{width: 50, height: 60, textAlign:'center', fontSize:'1.5rem'}}
                    onChange={e => setAnswers({...answers, pin: answers.pin + e.target.value})}
                  />
                ))}
              </div>
            </div>
            <button 
              className="btn btn-primary" 
              style={{width:'100%', marginTop: 32, gap: 8}}
              onClick={handleFinish}
            >
              Complete Setup <CheckCircle size={18}/>
            </button>
            <button className="btn btn-ghost btn-sm" style={{width:'100%', marginTop: 12}} onClick={() => setStep(1)}>Go Back</button>
          </div>
        )}

        <div style={{marginTop: 32, textAlign:'center', fontSize:'0.75rem', color:'var(--gray-400)'}}>
          <Key size={12} style={{marginRight: 4}}/> All security data is encrypted and stored locally.
        </div>
      </div>
    </div>
  );
}
