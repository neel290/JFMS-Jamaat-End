import { useLocation, Link } from 'react-router-dom';
import { useEnv } from '../../contexts/AppContexts';
import { ChevronRight } from 'lucide-react';

const routeLabels = {
  dashboard: 'Dashboard',
  admin: 'Administration',
  users: 'User Management',
  add: 'Add New',
  roles: 'Role Permissions',
  sabeels: 'Sabeel Master',
  banks: 'Bank Accounts',
  mappings: 'Purpose Mapping',
  access: 'Access Control',
  takhmeen: 'Takhmeen',
  groups: 'Groups',
  create: 'Create New',
  override: 'Individual Override',
  approvals: 'Approval Queue',
  schedule: 'Payment Schedule',
  campaigns: 'Campaigns',
  income: 'Income',
  voluntary: 'Voluntary',
  organization: 'Organization',
  enayat: 'Enayat',
  agriculture: 'Agriculture',
  other: 'Other',
  listing: 'Listing',
  cancel: 'Receipt Cancellation',
  suspense: 'Suspense Entries',
  deposits: 'Deposits',
  entry: 'New Entry',
  payments: 'Payments',
  vendor: 'Vendor Payment',
  bulk: 'Bulk Payment',
  mumin: 'Mumin Payment',
  dawat: 'Dawat Payment',
  utility: 'Utility Payment',
  tax: 'Tax Payment',
  salary: 'Salary Payment',
  'petty-cash': 'Petty Cash',
  'bank-transfer': 'Bank Transfer',
  hybrid: 'Property & Receipts',
  rent: 'Property Rent',
  hall: 'Hall Booking',
  reconciliation: 'Reconciliation',
  auto: 'Auto Reconciliation',
  manual: 'Manual Reconciliation',
  assets: 'Assets',
  donate: 'In-Kind Donation',
  register: 'Asset Register',
  journal: 'Journal Entries',
  sabeel: 'Sabeel Profile',
  'tally-export': 'Tally Export',
  notifications: 'Notifications',
  reports: 'Reports',
  'balance-sheet': 'Balance Sheet',
  'ie-statement': 'I&E Statement',
  'bank-summary': 'Bank Summary',
  compliance: 'Compliance',
  fmb: 'FMB',
  'purchase-order': 'Purchase Orders',
  grn: 'Goods Receipt',
  'daily-cost': 'Daily Cost Sheet',
  inventory: 'Inventory',
  construction: 'Construction',
  committee: 'Committee',
  waqf: 'Waqf / Trust',
  migration: 'Data Migration',
  support: 'Support',
  ticket: 'Raise Ticket',
  faq: 'FAQ',
  mobile: 'Mobile Preview',
  expense: 'Expense Report',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const { activeEnv } = useEnv();
  const pathParts = location.pathname.split('/').filter(Boolean);

  if (pathParts.length === 0) return null;

  return (
    <div className="breadcrumbs">
      <span className="breadcrumb-item">
        <Link to="/dashboard">{activeEnv.name}</Link>
      </span>
      {pathParts.map((part, i) => {
        const path = '/' + pathParts.slice(0, i + 1).join('/');
        const label = routeLabels[part] || part.charAt(0).toUpperCase() + part.slice(1);
        const isLast = i === pathParts.length - 1;
        return (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChevronRight size={12} className="breadcrumb-separator" />
            <span className={`breadcrumb-item ${isLast ? 'current' : ''}`}>
              {isLast ? label : <Link to={path}>{label}</Link>}
            </span>
          </span>
        );
      })}
    </div>
  );
}
