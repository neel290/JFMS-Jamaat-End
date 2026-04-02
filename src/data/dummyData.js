// Dummy data for the JFMS prototype
export const environments = [
  {
    id: 'env-sabeel-1',
    type: 'sabeel',
    name: 'Sabeel Main Account',
    committee: 'Finance Committee',
    mauze: 'Dholka',
    jamiat: 'Ahmedabad Jamiat',
    trust: 'Anjuman-e-Burhani Trust',
    color: 'sabeel',
  },
  {
    id: 'env-fmb-1',
    type: 'fmb',
    name: 'Faiz-ul-Mawaid-il-Burhaniyah',
    committee: 'FMB Committee',
    mauze: 'Dholka',
    jamiat: 'Ahmedabad Jamiat',
    trust: 'Anjuman-e-Burhani Trust',
    color: 'fmb',
  },
  {
    id: 'env-construction-1',
    type: 'construction',
    name: 'Masjid Renovation Project',
    committee: 'Construction Committee',
    mauze: 'Mumbai',
    jamiat: 'Mumbai Jamiat',
    trust: 'Saifee Burhani Trust',
    color: 'construction',
  },
  {
    id: 'env-other-1',
    type: 'other',
    name: 'Madrasah-tul-Burhaniyah',
    committee: 'Education Committee',
    mauze: 'Dholka',
    jamiat: 'Ahmedabad Jamiat',
    trust: 'Anjuman-e-Burhani Trust',
    color: 'other',
  },
];

export const currentUser = {
  name: 'Husain Johar',
  itsId: '30412587',
  role: 'Treasurer',
  avatar: 'HJ',
  email: 'husain.johar@example.com',
  phone: '+91 98765 43210',
  lastLogin: '2026-04-01 10:30 AM',
};

export const users = [
  { id: 1, name: 'Husain Johar', itsId: '30412587', role: 'Treasurer', status: 'Active', lastLogin: '01-Apr-2026 10:30 AM' },
  { id: 2, name: 'Mufaddal Saifuddin', itsId: '30415623', role: 'Secretary', status: 'Active', lastLogin: '01-Apr-2026 09:15 AM' },
  { id: 3, name: 'Taher Bhai Rangwala', itsId: '30418901', role: 'Accountant', status: 'Active', lastLogin: '31-Mar-2026 04:45 PM' },
  { id: 4, name: 'Burhanuddin Hakimuddin', itsId: '30422456', role: 'Accountant', status: 'Active', lastLogin: '31-Mar-2026 02:00 PM' },
  { id: 5, name: 'Abdeali Bhaisaheb', itsId: '30425789', role: 'Viewer', status: 'Inactive', lastLogin: '15-Mar-2026 11:00 AM' },
  { id: 6, name: 'Qaidjohar Ezzi', itsId: '30429012', role: 'Accountant', status: 'Pending Approval', lastLogin: 'Never' },
];

export const roles = [
  { name: 'Secretary', criticality: 'Critical', permissions: { dashboard: true, income: true, payments: true, approvals: true, reports: true, admin: true, takhmeen: true, reconciliation: true } },
  { name: 'Treasurer', criticality: 'Critical', permissions: { dashboard: true, income: true, payments: true, approvals: true, reports: true, admin: false, takhmeen: true, reconciliation: true } },
  { name: 'Accountant', criticality: 'Standard', permissions: { dashboard: true, income: true, payments: true, approvals: false, reports: true, admin: false, takhmeen: false, reconciliation: true } },
  { name: 'Viewer', criticality: 'Basic', permissions: { dashboard: true, income: false, payments: false, approvals: false, reports: true, admin: false, takhmeen: false, reconciliation: false } },
];

export const sabeels = [
  { sabeelNo: '101', headName: 'Shabbir Bhai Cyclewala', itsId: '30410123', mauze: 'Dholka', status: 'Active', members: 5 },
  { sabeelNo: '102', headName: 'Mustafa Bhai Bohra', itsId: '30410456', mauze: 'Dholka', status: 'Active', members: 4 },
  { sabeelNo: '103', headName: 'Yusuf Bhai Udaipurwala', itsId: '30410789', mauze: 'Dholka', status: 'Active', members: 6 },
  { sabeelNo: '104', headName: 'Hatim Bhai Jamali', itsId: '30411012', mauze: 'Dholka', status: 'Active', members: 3 },
  { sabeelNo: '105', headName: 'Juzer Bhai Shikari', itsId: '30411345', mauze: 'Dholka', status: 'Active', members: 7 },
  { sabeelNo: '106', headName: 'Amil Bhai Contractor', itsId: '30411678', mauze: 'Dholka', status: 'Inactive', members: 2 },
  { sabeelNo: '107', headName: 'Taiyeb Bhai Kapasi', itsId: '30411901', mauze: 'Dholka', status: 'Active', members: 4 },
  { sabeelNo: '108', headName: 'Quresh Bhai Badri', itsId: '30412234', mauze: 'Dholka', status: 'Active', members: 5 },
];

export const bankAccounts = [
  { id: 1, bankName: 'State Bank of India', accountNo: '****4521', ifsc: 'SBIN0001234', type: 'Current', status: 'Active', balance: '₹12,45,678' },
  { id: 2, bankName: 'Bank of Baroda', accountNo: '****7890', ifsc: 'BARB0DHOLKA', type: 'Savings', status: 'Active', balance: '₹8,32,450' },
  { id: 3, bankName: 'HDFC Bank', accountNo: '****3456', ifsc: 'HDFC0002345', type: 'Current', status: 'Pending Approval', balance: '₹0' },
];

export const incomePurposes = [
  { id: 1, name: 'Takhmeen — Wajebaat', type: 'Takhmeen', bankAccount: 'SBI ****4521', status: 'Active' },
  { id: 2, name: 'Takhmeen — Fitra', type: 'Takhmeen', bankAccount: 'SBI ****4521', status: 'Active' },
  { id: 3, name: 'Takhmeen — Zakat', type: 'Takhmeen', bankAccount: 'BOB ****7890', status: 'Active' },
  { id: 4, name: 'Niyaz', type: 'Voluntary', bankAccount: 'SBI ****4521', status: 'Active' },
  { id: 5, name: 'Sabeel', type: 'Voluntary', bankAccount: 'SBI ****4521', status: 'Active' },
  { id: 6, name: 'Anjuman Fund', type: 'Voluntary', bankAccount: 'BOB ****7890', status: 'Active' },
  { id: 7, name: 'Masjid Maintenance', type: 'Other', bankAccount: 'BOB ****7890', status: 'Active' },
  { id: 8, name: 'Madrasah Donation', type: 'Other', bankAccount: 'BOB ****7890', status: 'Pending Approval' },
];

export const takhmeenGroups = [
  { id: 1, name: 'Standard Takhmeen 1445H', sabeelCount: 85, purposes: ['Wajebaat', 'Fitra', 'Zakat'], totalAmount: '₹42,50,000', status: 'Approved', year: '1445H' },
  { id: 2, name: 'Premium Takhmeen 1445H', sabeelCount: 23, purposes: ['Wajebaat', 'Fitra', 'Zakat', 'Niyaz'], totalAmount: '₹18,40,000', status: 'Approved', year: '1445H' },
  { id: 3, name: 'New Members 1445H', sabeelCount: 8, purposes: ['Wajebaat', 'Fitra'], totalAmount: '₹2,40,000', status: 'Draft', year: '1445H' },
];

export const incomeEntries = [
  { id: 1, date: '01-Apr-2026', sabeelNo: '101', itsId: '30410123', name: 'Shabbir Bhai Cyclewala', purpose: 'Wajebaat', amount: '₹15,000', mode: 'UPI', receiptNo: 'REC-2026-0451', status: 'Confirmed' },
  { id: 2, date: '01-Apr-2026', sabeelNo: '102', itsId: '30410456', name: 'Mustafa Bhai Bohra', purpose: 'Fitra', amount: '₹5,000', mode: 'Cash', receiptNo: 'REC-2026-0452', status: 'Confirmed' },
  { id: 3, date: '31-Mar-2026', sabeelNo: '103', itsId: '30410789', name: 'Yusuf Bhai Udaipurwala', purpose: 'Zakat', amount: '₹25,000', mode: 'Cheque', receiptNo: 'REC-2026-0450', status: 'Confirmed' },
  { id: 4, date: '31-Mar-2026', sabeelNo: '104', itsId: '30411012', name: 'Hatim Bhai Jamali', purpose: 'Niyaz', amount: '₹2,000', mode: 'Cash', receiptNo: 'REC-2026-0449', status: 'Confirmed' },
  { id: 5, date: '30-Mar-2026', sabeelNo: '105', itsId: '30411345', name: 'Juzer Bhai Shikari', purpose: 'Wajebaat', amount: '₹10,000', mode: 'Bank Transfer', receiptNo: 'REC-2026-0448', status: 'Confirmed' },
  { id: 6, date: '30-Mar-2026', sabeelNo: '107', itsId: '30411901', name: 'Taiyeb Bhai Kapasi', purpose: 'Sabeel', amount: '₹3,500', mode: 'UPI', receiptNo: 'REC-2026-0447', status: 'Pending' },
  { id: 7, date: '29-Mar-2026', sabeelNo: '108', itsId: '30412234', name: 'Quresh Bhai Badri', purpose: 'Anjuman Fund', amount: '₹7,500', mode: 'Cash', receiptNo: 'REC-2026-0446', status: 'Confirmed' },
];

export const paymentEntries = [
  { id: 1, date: '01-Apr-2026', vendor: 'Mehboob Electric Works', category: 'Maintenance', amount: '₹12,500', mode: 'Bank Transfer', status: 'Approved', tds: '₹0', requestedBy: 'Taher Bhai' },
  { id: 2, date: '31-Mar-2026', vendor: 'Saifee Catering', category: 'FMB Expenses', amount: '₹45,000', mode: 'Cheque', status: 'Pending Approval', tds: '₹4,500', requestedBy: 'Husain Johar' },
  { id: 3, date: '30-Mar-2026', vendor: 'Rashid Bhai Plumber', category: 'Repairs', amount: '₹8,000', mode: 'Cash', status: 'Approved', tds: '₹0', requestedBy: 'Taher Bhai' },
  { id: 4, date: '29-Mar-2026', vendor: 'Gujarat Electricity Board', category: 'Utilities', amount: '₹18,750', mode: 'Online', status: 'Paid', tds: '₹0', requestedBy: 'Burhanuddin' },
  { id: 5, date: '28-Mar-2026', vendor: 'Staff Salary — Mar 2026', category: 'Salary', amount: '₹95,000', mode: 'Bank Transfer', status: 'Paid', tds: '₹9,500', requestedBy: 'Husain Johar' },
];

export const deposits = [
  { id: 1, date: '01-Apr-2026', account: 'SBI ****4521', type: 'Cash', amount: '₹35,000', slipNo: 'DEP-001', status: 'Deposited' },
  { id: 2, date: '31-Mar-2026', account: 'SBI ****4521', type: 'Cheque', amount: '₹25,000', slipNo: 'DEP-002', chequeNo: '456789', status: 'Cleared' },
  { id: 3, date: '30-Mar-2026', account: 'BOB ****7890', type: 'Cash', amount: '₹18,500', slipNo: 'DEP-003', status: 'Deposited' },
  { id: 4, date: '29-Mar-2026', account: 'SBI ****4521', type: 'Cheque', amount: '₹50,000', slipNo: 'DEP-004', chequeNo: '456790', status: 'Bounced' },
];

export const reconEntries = [
  { id: 1, bankRef: 'NEFT/2026/04/001234', bankDate: '01-Apr-2026', bankAmount: '₹15,000', matchedEntry: 'REC-2026-0451 — Shabbir Bhai', confidence: '98%', status: 'Auto-Matched' },
  { id: 2, bankRef: 'UPI/2026/04/567890', bankDate: '01-Apr-2026', bankAmount: '₹3,500', matchedEntry: 'REC-2026-0447 — Taiyeb Bhai', confidence: '95%', status: 'Suggested' },
  { id: 3, bankRef: 'NEFT/2026/03/998877', bankDate: '31-Mar-2026', bankAmount: '₹10,000', matchedEntry: 'REC-2026-0448 — Juzer Bhai', confidence: '92%', status: 'Auto-Matched' },
  { id: 4, bankRef: 'IMPS/2026/03/112233', bankDate: '30-Mar-2026', bankAmount: '₹8,200', matchedEntry: 'Unmatched', confidence: '—', status: 'Suspense' },
];

export const journalEntries = [
  { id: 1, date: '31-Mar-2026', type: 'Year-end Balancing', debitLedger: 'Income & Expenditure A/c', creditLedger: 'Surplus Fund', amount: '₹2,34,500', enteredBy: 'Taher Bhai', approvedBy: 'Husain Johar', status: 'Approved' },
  { id: 2, date: '28-Mar-2026', type: 'Error Correction', debitLedger: 'Wajebaat Collection', creditLedger: 'Fitra Collection', amount: '₹5,000', enteredBy: 'Burhanuddin', approvedBy: 'Husain Johar', status: 'Approved' },
  { id: 3, date: '25-Mar-2026', type: 'Provision', debitLedger: 'Audit Fees Expense', creditLedger: 'Outstanding Expenses', amount: '₹15,000', enteredBy: 'Taher Bhai', approvedBy: '—', status: 'Pending Approval' },
];

export const properties = [
  { id: 1, propertyId: 'PROP-001', name: 'Saifee Hall', type: 'Hall', tenant: '—', rent: '₹25,000/event', gst: 'Yes (18%)', status: 'Available' },
  { id: 2, propertyId: 'PROP-002', name: 'Shop No. 3, Market Complex', type: 'Shop', tenant: 'Moiz Bhai Stationery', rent: '₹8,500/month', gst: 'Yes (18%)', status: 'Rented' },
  { id: 3, propertyId: 'PROP-003', name: 'Shop No. 7, Market Complex', type: 'Shop', tenant: 'Taher Bhai Hardware', rent: '₹12,000/month', gst: 'Yes (18%)', status: 'Rented' },
  { id: 4, propertyId: 'PROP-004', name: 'Ground Floor Office', type: 'Office', tenant: '—', rent: '₹15,000/month', gst: 'No', status: 'Vacant' },
];

export const notifications = [
  { id: 1, type: 'Approval', message: 'Vendor payment request of ₹45,000 pending your approval', time: '10 min ago', read: false, module: 'payments' },
  { id: 2, type: 'Alert', message: 'PAN threshold breach: Shabbir Bhai has crossed ₹50,000 without PAN on file', time: '1 hr ago', read: false, module: 'compliance' },
  { id: 3, type: 'Transaction', message: 'Receipt REC-2026-0451 generated for ₹15,000 from Sabeel 101', time: '2 hr ago', read: true, module: 'income' },
  { id: 4, type: 'Reminder', message: 'Monthly bank reconciliation pending for BOB account', time: '5 hr ago', read: true, module: 'reconciliation' },
  { id: 5, type: 'Transaction', message: 'Salary payment of ₹95,000 processed successfully', time: '1 day ago', read: true, module: 'payments' },
];

export const dashboardStats = {
  secretary: {
    totalIncome: '₹4,85,230',
    pendingApprovals: 7,
    activeSabeels: 108,
    memberActivity: 'High',
    upcomingObligations: ['Fitra collection closes in 5 days', 'Quarterly audit due 15-Apr'],
  },
  treasurer: {
    sbiBalance: '₹12,45,678',
    bobBalance: '₹8,32,450',
    cashFlow: '+₹2,35,000',
    tdsLiability: '₹14,000',
    unreconciledCount: 4,
    incomeThisMonth: '₹3,25,500',
    expenseThisMonth: '₹1,79,250',
  },
  accountant: {
    pendingEntries: 3,
    unreconciledTxns: 4,
    suspenseEntries: 1,
    monthlyCloseChecklist: ['Post depreciation', 'Reconcile SBI', 'Reconcile BOB', 'Close petty cash'],
  },
};

export const fmbData = {
  thaliCount: 142,
  dailyCost: '₹18,500',
  perThaliCost: '₹130',
  pendingPOs: 3,
  pendingPayments: 2,
  stockLevels: [
    { item: 'Rice (Basmati)', qty: '45 kg', status: 'OK' },
    { item: 'Wheat Flour', qty: '28 kg', status: 'OK' },
    { item: 'Cooking Oil', qty: '8 L', status: 'Low' },
    { item: 'Sugar', qty: '15 kg', status: 'OK' },
    { item: 'Dal (Toor)', qty: '5 kg', status: 'Low' },
  ],
};

export const migrationSteps = [
  { step: 1, name: 'Environment Setup', status: 'Completed', description: 'Configure environment type, name, trust, and committee details.' },
  { step: 2, name: 'Master Data Import', status: 'In Progress', description: 'Import Sabeel Nos, Income Purposes, Bank Accounts, and Vendor Masters.' },
  { step: 3, name: 'Opening Balances', status: 'Pending', description: 'Enter opening balances for all ledger accounts as of migration date.' },
  { step: 4, name: 'Historical Transactions', status: 'Pending', description: 'Import up to 3 years of historical receipt and payment data.' },
  { step: 5, name: 'Review & Sign-off', status: 'Pending', description: 'Final review of all imported data. Super Admin sign-off required.' },
];

export const faqs = [
  { category: 'Income Entry', question: 'How do I record a Takhmeen payment?', answer: 'Navigate to Income → Record Takhmeen Payment. Search for the Sabeel No, select the income purposes, enter the amount and payment mode, then click Save. A receipt will be auto-generated.' },
  { category: 'Income Entry', question: 'Can I cancel a receipt after it has been issued?', answer: 'Yes. Go to Income → Receipt Cancellation. Enter the receipt number, provide a reason, and submit for approval. Once approved by the Secretary, the receipt will be cancelled and the entry reversed.' },
  { category: 'Payments', question: 'How does TDS get applied to vendor payments?', answer: 'TDS is auto-applied based on the vendor PAN and expense category configuration set by Super Admin. If a vendor\'s total payments exceed the threshold and PAN is on file, TDS is calculated automatically.' },
  { category: 'Reconciliation', question: 'What is a suspense entry?', answer: 'A suspense entry is a bank credit that could not be automatically matched to any system entry. It remains in suspense until manually resolved by matching it to an income entry or creating a new entry.' },
  { category: 'Reports', question: 'How do I generate a Safai Chitthi?', answer: 'Go to Sabeel Profile, search for the Sabeel No, and scroll to the Safai Chitthi section. If all dues are cleared, click Generate & Download. If dues remain, the Sabeel will not be eligible.' },
  { category: 'User Management', question: 'How do I add a new user to the environment?', answer: 'Navigate to Admin → Users → Add New User. Enter the ITS ID (the name will auto-populate), assign a role, and optionally customize permissions. The user will need approval before activation.' },
];
