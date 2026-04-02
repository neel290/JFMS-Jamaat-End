import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, EnvProvider } from './contexts/AppContexts';
import AppLayout from './components/Layout/AppLayout';
import LoginPage from './pages/auth/LoginPage';
import OTPPage from './pages/auth/OTPPage';
import NDAPage from './pages/auth/NDAPage';
import EnvSelectPage from './pages/auth/EnvSelectPage';
import RecoveryPage from './pages/auth/RecoveryPage';
import SecurityOnboarding from './pages/auth/SecurityOnboarding';
import Dashboard from './pages/dashboard/Dashboard';
import UsersList from './pages/admin/UsersList';
import AddUser from './pages/admin/AddUser';
import UserDetail from './pages/admin/UserDetail';
import RolePermissions from './pages/admin/RolePermissions';
import SabeelMaster from './pages/admin/SabeelMaster';
import BankAccounts from './pages/admin/BankAccounts';
import IncomePurposeMapping from './pages/admin/IncomePurposeMapping';
import AccessControl from './pages/admin/AccessControl';
import TakhmeenDashboard from './pages/takhmeen/TakhmeenDashboard';
import TakhmeenGroups from './pages/takhmeen/TakhmeenGroups';
import CreateTakhmeenGroup from './pages/takhmeen/CreateTakhmeenGroup';
import TakhmeenOverride from './pages/takhmeen/TakhmeenOverride';
import TakhmeenApproval from './pages/takhmeen/TakhmeenApproval';
import TakhmeenSchedule from './pages/takhmeen/TakhmeenSchedule';
import VoluntaryCampaign from './pages/takhmeen/VoluntaryCampaign';
import IncomeHome from './pages/income/IncomeHome';
import TakhmeenIncomeEntry from './pages/income/TakhmeenIncomeEntry';
import VoluntaryIncomeEntry from './pages/income/VoluntaryIncomeEntry';
import OrgIncomeEntry from './pages/income/OrgIncomeEntry';
import EnayatIncomeEntry from './pages/income/EnayatIncomeEntry';
import AgriIncomeEntry from './pages/income/AgriIncomeEntry';
import OtherIncomeEntry from './pages/income/OtherIncomeEntry';
import IncomeListing from './pages/income/IncomeListing';
import ReceiptCancellation from './pages/income/ReceiptCancellation';
import SuspenseManagement from './pages/income/SuspenseManagement';
import IncomeDashboard from './pages/income/IncomeDashboard';
import DepositEntry from './pages/deposits/DepositEntry';
import DepositListing from './pages/deposits/DepositListing';
import PaymentsDashboard from './pages/payments/PaymentsDashboard';
import VendorPaymentRequest from './pages/payments/VendorPaymentRequest';
import PaymentApproval from './pages/payments/PaymentApproval';
import BulkPayment from './pages/payments/BulkPayment';
import MuminPayment from './pages/payments/MuminPayment';
import DawatPayment from './pages/payments/DawatPayment';
import UtilityPayment from './pages/payments/UtilityPayment';
import TaxPayment from './pages/payments/TaxPayment';
import SalaryPayment from './pages/payments/SalaryPayment';
import PettyCash from './pages/payments/PettyCash';
import BankTransfer from './pages/payments/BankTransfer';
import PaymentListing from './pages/payments/PaymentListing';
import PropertyRent from './pages/hybrid/PropertyRent';
import HallBooking from './pages/hybrid/HallBooking';
import OtherReceipts from './pages/hybrid/OtherReceipts';
import ReconDashboard from './pages/reconciliation/ReconDashboard';
import AutoRecon from './pages/reconciliation/AutoRecon';
import ManualRecon from './pages/reconciliation/ManualRecon';
import SuspenseResolution from './pages/reconciliation/SuspenseResolution';
import InKindDonation from './pages/assets/InKindDonation';
import AssetRegister from './pages/assets/AssetRegister';
import JournalEntry from './pages/journal/JournalEntry';
import JournalListing from './pages/journal/JournalListing';
import SabeelSearch from './pages/sabeel/SabeelSearch';
import SabeelProfile from './pages/sabeel/SabeelProfile';
import TallyExport from './pages/other/TallyExport';
import NotificationCentre from './pages/other/NotificationCentre';
import IncomeReport from './pages/reports/IncomeReport';
import ExpenseReport from './pages/reports/ExpenseReport';
import BalanceSheet from './pages/reports/BalanceSheet';
import IEStatement from './pages/reports/IEStatement';
import BankSummary from './pages/reports/BankSummary';
import TakhmeenReport from './pages/reports/TakhmeenReport';
import ComplianceReport from './pages/reports/ComplianceReport';
import AuditLogReport from './pages/reports/AuditLogReport';
import FMBDashboard from './pages/fmb/FMBDashboard';
import PurchaseOrder from './pages/fmb/PurchaseOrder';
import GRNEntry from './pages/fmb/GRNEntry';
import DailyCostSheet from './pages/fmb/DailyCostSheet';
import Inventory from './pages/fmb/Inventory';
import InvoiceMatching from './pages/fmb/InvoiceMatching';
import ConstructionDashboard from './pages/construction/ConstructionDashboard';
import CommitteeDashboard from './pages/committee/CommitteeDashboard';
import WaqfDashboard from './pages/waqf/WaqfDashboard';
import MigrationWizard from './pages/migration/MigrationWizard';
import SupportHome from './pages/support/SupportHome';
import RaiseTicket from './pages/support/RaiseTicket';
import FAQPage from './pages/support/FAQPage';
import MobilePreview from './pages/mobile/MobilePreview';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EnvProvider>
          <Routes>
            {/* Auth routes — no sidebar */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/nda" element={<NDAPage />} />
            <Route path="/security-onboarding" element={<SecurityOnboarding />} />
            <Route path="/select-environment" element={<EnvSelectPage />} />
            <Route path="/recovery" element={<RecoveryPage />} />

            {/* Main app routes — with sidebar layout */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Admin */}
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/users/add" element={<AddUser />} />
              <Route path="/admin/users/:id" element={<UserDetail />} />
              <Route path="/admin/roles" element={<RolePermissions />} />
              <Route path="/admin/sabeels" element={<SabeelMaster />} />
              <Route path="/admin/banks" element={<BankAccounts />} />
              <Route path="/admin/mappings" element={<IncomePurposeMapping />} />
              <Route path="/admin/access" element={<AccessControl />} />

              {/* Takhmeen */}
              <Route path="/takhmeen" element={<TakhmeenDashboard />} />
              <Route path="/takhmeen/groups" element={<TakhmeenGroups />} />
              <Route path="/takhmeen/groups/create" element={<CreateTakhmeenGroup />} />
              <Route path="/takhmeen/override" element={<TakhmeenOverride />} />
              <Route path="/takhmeen/approvals" element={<TakhmeenApproval />} />
              <Route path="/takhmeen/schedule" element={<TakhmeenSchedule />} />
              <Route path="/takhmeen/campaigns" element={<VoluntaryCampaign />} />

              {/* Income */}
              <Route path="/income" element={<IncomeHome />} />
              <Route path="/income/takhmeen" element={<TakhmeenIncomeEntry />} />
              <Route path="/income/voluntary" element={<VoluntaryIncomeEntry />} />
              <Route path="/income/organization" element={<OrgIncomeEntry />} />
              <Route path="/income/enayat" element={<EnayatIncomeEntry />} />
              <Route path="/income/agriculture" element={<AgriIncomeEntry />} />
              <Route path="/income/other" element={<OtherIncomeEntry />} />
              <Route path="/income/listing" element={<IncomeListing />} />
              <Route path="/income/cancel" element={<ReceiptCancellation />} />
              <Route path="/income/suspense" element={<SuspenseManagement />} />
              <Route path="/income/dashboard" element={<IncomeDashboard />} />

              {/* Deposits */}
              <Route path="/deposits/entry" element={<DepositEntry />} />
              <Route path="/deposits" element={<DepositListing />} />

              {/* Payments */}
              <Route path="/payments" element={<PaymentsDashboard />} />
              <Route path="/payments/vendor" element={<VendorPaymentRequest />} />
              <Route path="/payments/approvals" element={<PaymentApproval />} />
              <Route path="/payments/bulk" element={<BulkPayment />} />
              <Route path="/payments/mumin" element={<MuminPayment />} />
              <Route path="/payments/dawat" element={<DawatPayment />} />
              <Route path="/payments/utility" element={<UtilityPayment />} />
              <Route path="/payments/tax" element={<TaxPayment />} />
              <Route path="/payments/salary" element={<SalaryPayment />} />
              <Route path="/payments/petty-cash" element={<PettyCash />} />
              <Route path="/payments/bank-transfer" element={<BankTransfer />} />
              <Route path="/payments/listing" element={<PaymentListing />} />

              {/* Hybrid Receipt & Payment */}
              <Route path="/hybrid/rent" element={<PropertyRent />} />
              <Route path="/hybrid/hall" element={<HallBooking />} />
              <Route path="/hybrid/other" element={<OtherReceipts />} />

              {/* Reconciliation */}
              <Route path="/reconciliation" element={<ReconDashboard />} />
              <Route path="/reconciliation/auto" element={<AutoRecon />} />
              <Route path="/reconciliation/manual" element={<ManualRecon />} />
              <Route path="/reconciliation/suspense" element={<SuspenseResolution />} />

              {/* Assets */}
              <Route path="/assets/donate" element={<InKindDonation />} />
              <Route path="/assets/register" element={<AssetRegister />} />

              {/* Journal */}
              <Route path="/journal/entry" element={<JournalEntry />} />
              <Route path="/journal/entry/:id" element={<JournalEntry />} />
              <Route path="/journal" element={<JournalListing />} />

              {/* Sabeel Profile */}
              <Route path="/sabeel" element={<SabeelSearch />} />
              <Route path="/sabeel/:id" element={<SabeelProfile />} />

              {/* Other */}
              <Route path="/tally-export" element={<TallyExport />} />
              <Route path="/notifications" element={<NotificationCentre />} />

              {/* Reports */}
              <Route path="/reports/income" element={<IncomeReport />} />
              <Route path="/reports/expense" element={<ExpenseReport />} />
              <Route path="/reports/balance-sheet" element={<BalanceSheet />} />
              <Route path="/reports/ie-statement" element={<IEStatement />} />
              <Route path="/reports/bank-summary" element={<BankSummary />} />
              <Route path="/reports/takhmeen" element={<TakhmeenReport />} />
              <Route path="/reports/compliance" element={<ComplianceReport />} />

              {/* FMB */}
              <Route path="/fmb" element={<FMBDashboard />} />
              <Route path="/fmb/purchase-order" element={<PurchaseOrder />} />
              <Route path="/fmb/grn" element={<GRNEntry />} />
              <Route path="/fmb/invoice" element={<InvoiceMatching />} />
              <Route path="/fmb/daily-cost" element={<DailyCostSheet />} />
              <Route path="/fmb/inventory" element={<Inventory />} />

              {/* Construction */}
              <Route path="/construction" element={<ConstructionDashboard />} />

              {/* Committee */}
              <Route path="/committee" element={<CommitteeDashboard />} />

              {/* Waqf */}
              <Route path="/waqf" element={<WaqfDashboard />} />

              {/* Migration */}
              <Route path="/migration" element={<MigrationWizard />} />

              {/* Support */}
              <Route path="/support" element={<SupportHome />} />
              <Route path="/support/ticket" element={<RaiseTicket />} />
              <Route path="/support/faq" element={<FAQPage />} />

              {/* Mobile Preview */}
              <Route path="/mobile" element={<MobilePreview />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </EnvProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
