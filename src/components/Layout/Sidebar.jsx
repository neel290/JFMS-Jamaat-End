import { NavLink, useLocation } from 'react-router-dom';
import { useEnv } from '../../contexts/AppContexts';
import {
  LayoutDashboard, Users, Building2, Landmark, ArrowLeftRight,
  Receipt, Wallet, CreditCard, BanknoteIcon, FileText, Scale,
  BookOpen, UserCircle, Download, Bell, HelpCircle, Database,
  Smartphone, ChefHat, HardHat, GraduationCap, Home, Settings,
  TrendingUp, BarChart3, ClipboardList, Package, FileSpreadsheet,
  HandCoins, Building, CalendarDays, GitBranch, ShieldCheck, Clock
} from 'lucide-react';

const sidebarConfig = {
  sabeel: [
    { section: 'Main', items: [
      { to: '/dashboard/operational', label: 'Operational Dashboard', icon: LayoutDashboard },
      { to: '/dashboard/analytical', label: 'Analytical Dashboard', icon: BarChart3 },
      { to: '/dashboard/pendency', label: 'Pendency Dashboard', icon: Clock },
    ]},
    { section: 'Administration', items: [
      { to: '/admin/users', label: 'User Management', icon: Users, badge: 1 },
      { to: '/admin/roles', label: 'Role Permissions', icon: ShieldCheck },
      { to: '/admin/sabeels', label: 'Sabeel Master', icon: Home },
      { to: '/admin/banks', label: 'Bank Accounts', icon: Landmark, badge: 1 },
      { to: '/admin/mappings', label: 'Purpose Mapping', icon: GitBranch },
      { to: '/admin/access', label: 'Access Control', icon: Settings },
    ]},
    { section: 'Takhmeen', items: [
      { to: '/takhmeen', label: 'Takhmeen Dashboard', icon: ClipboardList },
      { to: '/takhmeen/groups', label: 'Takhmeen Groups', icon: Users },
      { to: '/takhmeen/approvals', label: 'Approval Queue', icon: Scale, badge: 3 },
      { to: '/takhmeen/schedule', label: 'Payment Schedule', icon: CalendarDays },
      { to: '/takhmeen/campaigns', label: 'Campaigns', icon: TrendingUp },
    ]},
    { section: 'Income', items: [
      { to: '/income', label: 'Income Entry', icon: HandCoins },
      { to: '/income/inkind', label: 'In-Kind Donation', icon: Package },
      { to: '/income/listing', label: 'Income Listing', icon: FileText },
      { to: '/income/dashboard', label: 'Income Dashboard', icon: BarChart3 },
      { to: '/income/suspense', label: 'Suspense Entries', icon: HelpCircle },
    ]},
    { section: 'Deposits', items: [
      { to: '/deposits/entry', label: 'Record Deposit', icon: BanknoteIcon },
      { to: '/deposits', label: 'Deposits Listing', icon: FileText },
    ]},
    { section: 'Payments', items: [
      { to: '/payments', label: 'Payments Dashboard', icon: Wallet },
      { to: '/payments/vendor', label: 'Vendor Payment', icon: CreditCard },
      { to: '/payments/approvals', label: 'Approval Queue', icon: Scale, badge: 2 },
      { to: '/payments/listing', label: 'All Payments', icon: FileText },
      { to: '/payments/petty-cash', label: 'Petty Cash', icon: BanknoteIcon },
      { to: '/payments/bank-transfer', label: 'Bank Transfer', icon: ArrowLeftRight },
    ]},
    { section: 'Property & Receipts', items: [
      { to: '/hybrid/rent', label: 'Property Rent', icon: Building },
      { to: '/hybrid/hall', label: 'Hall Booking', icon: Building2 },
      { to: '/hybrid/other', label: 'Other Receipts', icon: Receipt },
    ]},
    { section: 'Reconciliation', items: [
      { to: '/reconciliation', label: 'Recon Dashboard', icon: ArrowLeftRight },
      { to: '/reconciliation/auto', label: 'Auto Reconciliation', icon: GitBranch },
      { to: '/reconciliation/manual', label: 'Manual Recon', icon: FileSpreadsheet },
    ]},
    { section: 'Assets & Journal', items: [
      { to: '/assets/register', label: 'Asset Register', icon: Package },
      { to: '/journal', label: 'Journal Entries', icon: BookOpen },
    ]},
    { section: 'Profiles', items: [
      { to: '/sabeel', label: 'Sabeel Profile', icon: UserCircle },
    ]},
    { section: 'Reports', items: [
      { to: '/reports/catalog', label: 'Reports Catalog', icon: FileText },
    ]},
    { section: 'Other', items: [
      { to: '/tally-export', label: 'Tally Export', icon: Download },
      { to: '/notifications', label: 'Notifications', icon: Bell },
      { to: '/migration', label: 'Data Migration', icon: Database },
      { to: '/support', label: 'Support & FAQ', icon: HelpCircle },
      { to: '/mobile', label: 'Mobile Preview', icon: Smartphone },
    ]},
  ],
  fmb: [
    { section: 'Main', items: [
      { to: '/fmb', label: 'FMB Dashboard', icon: ChefHat },
    ]},
    { section: 'FMB Operations', items: [
      { to: '/fmb/purchase-order', label: 'Purchase Orders', icon: ClipboardList, badge: 3 },
      { to: '/fmb/grn', label: 'Goods Receipt', icon: Package },
      { to: '/fmb/invoice', label: 'Invoice Matching', icon: ClipboardList },
      { to: '/fmb/daily-cost', label: 'Daily Cost Sheet', icon: FileSpreadsheet },
      { to: '/fmb/inventory', label: 'Inventory', icon: Package },
    ]},
    { section: 'Income', items: [
      { to: '/income', label: 'Thali Contributions', icon: HandCoins },
      { to: '/income/listing', label: 'Income Listing', icon: FileText },
    ]},
    { section: 'Payments', items: [
      { to: '/payments', label: 'Payments Dashboard', icon: Wallet },
      { to: '/payments/vendor', label: 'Vendor Payment', icon: CreditCard },
      { to: '/payments/listing', label: 'All Payments', icon: FileText },
    ]},
    { section: 'Reconciliation', items: [
      { to: '/reconciliation', label: 'Reconciliation', icon: ArrowLeftRight },
    ]},
    { section: 'Reports', items: [
      { to: '/reports/income', label: 'Income Report', icon: BarChart3 },
      { to: '/reports/expense', label: 'Expense Report', icon: BarChart3 },
      { to: '/reports/bank-summary', label: 'Bank Summary', icon: Landmark },
      { to: '/reports/audit', label: 'Audit Log', icon: ClipboardList },
    ]},
    { section: 'Other', items: [
      { to: '/admin/users', label: 'User Management', icon: Users },
      { to: '/admin/banks', label: 'Bank Accounts', icon: Landmark },
      { to: '/support', label: 'Support', icon: HelpCircle },
    ]},
  ],
  construction: [
    { section: 'Main', items: [
      { to: '/construction', label: 'Project Dashboard', icon: HardHat },
    ]},
    { section: 'Income', items: [
      { to: '/income', label: 'Project Income', icon: HandCoins },
      { to: '/income/listing', label: 'Income Listing', icon: FileText },
    ]},
    { section: 'Payments', items: [
      { to: '/payments', label: 'Payments Dashboard', icon: Wallet },
      { to: '/payments/vendor', label: 'Vendor Payment', icon: CreditCard },
      { to: '/payments/listing', label: 'All Payments', icon: FileText },
    ]},
    { section: 'Reconciliation', items: [
      { to: '/reconciliation', label: 'Reconciliation', icon: ArrowLeftRight },
    ]},
    { section: 'Reports', items: [
      { to: '/reports/income', label: 'Income Report', icon: BarChart3 },
      { to: '/reports/expense', label: 'Expense Report', icon: BarChart3 },
      { to: '/reports/balance-sheet', label: 'Balance Sheet', icon: FileText },
    ]},
    { section: 'Other', items: [
      { to: '/admin/users', label: 'User Management', icon: Users },
      { to: '/support', label: 'Support', icon: HelpCircle },
    ]},
  ],
  other: [
    { section: 'Main', items: [
      { to: '/committee', label: 'Committee Dashboard', icon: GraduationCap },
    ]},
    { section: 'Income', items: [
      { to: '/income', label: 'Income Entry', icon: HandCoins },
      { to: '/income/listing', label: 'Income Listing', icon: FileText },
    ]},
    { section: 'Payments', items: [
      { to: '/payments', label: 'Payments', icon: Wallet },
      { to: '/payments/listing', label: 'All Payments', icon: FileText },
    ]},
    { section: 'Reports', items: [
      { to: '/reports/income', label: 'Income Report', icon: BarChart3 },
      { to: '/reports/expense', label: 'Expense Report', icon: BarChart3 },
    ]},
    { section: 'Other', items: [
      { to: '/admin/users', label: 'User Management', icon: Users },
      { to: '/admin/banks', label: 'Bank Accounts', icon: Landmark },
      { to: '/support', label: 'Support', icon: HelpCircle },
    ]},
  ],
};

export default function Sidebar() {
  const { activeEnv } = useEnv();
  const location = useLocation();
  const navItems = sidebarConfig[activeEnv.type.toLowerCase()] || sidebarConfig.sabeel;

  return (
    <aside className="app-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">J</div>
        <span>JFMS</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((section, si) => (
          <div className="sidebar-section" key={si}>
            <div className="sidebar-section-label">{section.section}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || 
                (item.to !== '/dashboard' && item.to !== '/fmb' && item.to !== '/construction' && item.to !== '/committee' && location.pathname.startsWith(item.to + '/'));
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className="icon" size={18} />
                  <span>{item.label}</span>
                  {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
