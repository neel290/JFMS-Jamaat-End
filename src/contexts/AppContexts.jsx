import { createContext, useContext, useEffect } from 'react';
import { useStore } from '../store/useStore';

const AuthContext = createContext();
const EnvContext = createContext();

export function AuthProvider({ children }) {
  const { currentUser, login, logout, ndaAccepted, acceptNda } = useStore();
  
  // Backward compatibility wrapper
  const value = {
    isLoggedIn: !!currentUser,
    user: currentUser,
    login: () => useStore.getState().setAuth(useStore.getState().users[1]), // Default dev login
    logout,
    ndaAccepted,
    acceptNda
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function EnvProvider({ children }) {
  const { currentEnv, setEnv } = useStore();
  
  // Comprehensive list of available environments
  const allEnvs = [
    { id: 'ENV1', type: 'sabeel', mauzeId: 'MZ1', trustId: 'TR1', name: 'Sabeel Main Account', committee: 'Jamaat Committee', mauze: 'Ahmedabad' },
    { id: 'ENV2', type: 'fmb', mauzeId: 'MZ1', trustId: 'TR1', name: 'Faiz-ul-Mawaid-il-Burhaniyah', committee: 'FMB Committee', mauze: 'Ahmedabad' },
    { id: 'ENV3', type: 'construction', mauzeId: 'MZ1', trustId: 'TR1', name: 'Masjid Expansion Project', committee: 'Construction Committee', mauze: 'Ahmedabad' },
    { id: 'ENV4', type: 'other', mauzeId: 'MZ1', trustId: 'TR1', name: 'Al-Hasanat Madrasa', committee: 'Education Committee', mauze: 'Ahmedabad' }
  ];

  const value = {
    activeEnv: currentEnv,
    allEnvs,
    switchEnv: (envId) => {
      const e = allEnvs.find(x => x.id === envId);
      if(e) setEnv(e);
    }
  };

  return (
    <EnvContext.Provider value={value}>
      {children}
    </EnvContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useEnv = () => useContext(EnvContext);
