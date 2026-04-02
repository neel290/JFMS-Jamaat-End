import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useEnv } from '../../contexts/AppContexts';
import { Bell, ChevronDown, LogOut, RefreshCw } from 'lucide-react';
import { notifications } from '../../data/dummyData';

export default function Header() {
  const { user, logout } = useAuth();
  const { activeEnv, allEnvs, switchEnv } = useEnv();
  const navigate = useNavigate();
  const [showEnvDropdown, setShowEnvDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Custom display labels for environment types
  const getEnvLabel = (type) => {
    if (type === 'fmb') return 'FMB';
    if (type === 'sabeel') return 'SABEEL';
    return type.toUpperCase();
  };

  const envLabel = getEnvLabel(activeEnv.type);

  const handleEnvSwitch = (envId) => {
    const env = allEnvs.find(e => e.id === envId);
    switchEnv(envId);
    setShowEnvDropdown(false);
    
    // Navigate to the appropriate home page for the environment type
    if (env.type === 'fmb') navigate('/fmb');
    else if (env.type === 'construction') navigate('/construction');
    else if (env.type === 'other') navigate('/committee');
    else navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="env-strip" />
      <div className="header-env-info">
        <span className={`badge badge-env ${activeEnv.type}`}>{envLabel}</span>
        <span className="header-env-name">{activeEnv.name}</span>
      </div>

      <div className="header-spacer" />

      <div className="header-actions">
        {/* Environment Switcher */}
        <div style={{ position: 'relative' }}>
          <button className="env-switcher" onClick={() => setShowEnvDropdown(!showEnvDropdown)}>
            <RefreshCw size={14} />
            <span>Switch Environment</span>
            <ChevronDown size={14} />
          </button>
          {showEnvDropdown && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowEnvDropdown(false)} />
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: 4, width: 300,
                background: 'white', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)', zIndex: 100, overflow: 'hidden'
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--gray-100)', fontWeight: 600, fontSize: '0.8125rem', color: 'var(--gray-500)' }}>
                  Available Environments
                </div>
                {allEnvs.map(env => (
                  <div
                    key={env.id}
                    onClick={() => handleEnvSwitch(env.id)}
                    style={{
                      padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                      borderBottom: '1px solid var(--gray-50)',
                      background: env.id === activeEnv.id ? 'var(--gray-50)' : 'white'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                    onMouseLeave={e => e.currentTarget.style.background = env.id === activeEnv.id ? 'var(--gray-50)' : 'white'}
                  >
                    <div style={{ width: 4, height: 36, borderRadius: 4, background: `var(--env-${env.type})` }} />
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gray-800)' }}>{env.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{env.committee} · {env.mauze}</div>
                    </div>
                    <span className={`badge badge-env ${env.type}`} style={{ marginLeft: 'auto', fontSize: '0.625rem' }}>
                      {env.type}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notification Bell */}
        <button className="notification-bell" onClick={() => navigate('/notifications')}>
          <Bell size={20} />
          {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
        </button>

        {/* User Menu */}
        <div style={{ position: 'relative' }}>
          <div className="user-menu" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="user-avatar">{user.avatar}</div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role} · ITS {user.itsId}</span>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--gray-400)' }} />
          </div>
          {showUserMenu && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowUserMenu(false)} />
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: 4, width: 200,
                background: 'white', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)', zIndex: 100, overflow: 'hidden'
              }}>
                <div
                  onClick={handleLogout}
                  style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--color-error)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}
                >
                  <LogOut size={16} /> Sign Out
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
