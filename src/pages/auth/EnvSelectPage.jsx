import { useNavigate } from 'react-router-dom';
import { useEnv } from '../../contexts/AppContexts';
import { environments } from '../../data/dummyData';
import { LogIn } from 'lucide-react';

export default function EnvSelectPage() {
  const navigate = useNavigate();
  const { switchEnv } = useEnv();

  const handleSelect = (env) => {
    switchEnv(env.id);
    const route = env.type === 'fmb' ? '/fmb' : env.type === 'construction' ? '/construction' : env.type === 'other' ? '/committee' : '/dashboard';
    navigate(route);
  };

  return (
    <div className="env-select-page">
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div className="login-logo" style={{ background: 'var(--env-sabeel-gradient)', margin: '0 auto 16px' }}>J</div>
        <h2 style={{ marginBottom: 8 }}>Select Environment</h2>
        <p style={{ color: 'var(--gray-500)', fontSize: '0.9375rem' }}>Choose the environment you want to work in</p>
      </div>

      <div className="env-cards">
        {environments.map(env => (
          <div key={env.id} className="env-card" onClick={() => handleSelect(env)}>
            <div className={`env-card-strip ${env.type}`} />
            <div className="env-card-body">
              <div className="env-card-type">
                <span className={`badge badge-env ${env.type}`}>
                  {env.type === 'fmb' ? 'FMB' : env.type.charAt(0).toUpperCase() + env.type.slice(1)}
                </span>
              </div>
              <div className="env-card-name">{env.name}</div>
              <div className="env-card-details">
                {env.committee} · {env.mauze}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 4 }}>
                {env.jamiat} → {env.trust}
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: `var(--env-${env.type})`, fontWeight: 600 }}>
                <LogIn size={14} /> Enter Environment
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
