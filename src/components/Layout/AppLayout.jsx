import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import { useEnv } from '../../contexts/AppContexts';

export default function AppLayout() {
  const { activeEnv } = useEnv();
  return (
    <div className="app-layout" data-env={activeEnv.type.toLowerCase()}>
      <Sidebar />
      <div className="app-main">
        <Header />
        <Breadcrumbs />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
