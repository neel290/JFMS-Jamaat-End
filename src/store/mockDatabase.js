// src/store/mockDatabase.js

// 1. Organizational & Legal Entities (Super Admin Layer)
export const initialJamiats = [{ id: 'JT1', name: 'AHMEDABAD' }, { id: 'JT2', name: 'CALCUTTA' }];

export const initialMauzes = [
  { id: 'MZ1', name: 'AHMEDABAD', type: 'Ummal', jamiatId: 'JT1', aamilId: '30415623' },
  { id: 'MZ2', name: 'DHOLKA', type: 'Mamureen', jamiatId: 'JT1', parentMauzeId: 'MZ1' }
];

export const initialTrusts = [
  { id: 'TR1', name: 'Anjuman-e-Burhani Trust', mauzeId: 'MZ1', gstEnabled: true, gstNumber: '24AAATA1234A1Z5' },
  { id: 'TR2', name: 'Al-Madrasah-tul-Taiyebiyah', mauzeId: 'MZ1', gstEnabled: false }
];

// 2. Global Configurations (Super Admin Layer)
export const initialCOA = [
  { id: 'L1', name: 'Wajebaat Income', group: 'Income', isCorpus: false },
  { id: 'L2', name: 'Fitra Income', group: 'Income', isCorpus: false },
  { id: 'L3', name: 'Corpus Donation', group: 'Income', isCorpus: true },
  { id: 'L4', name: 'Cash in Hand', group: 'Asset', type: 'Cash', isCorpus: false },
  { id: 'L5', name: 'SBI Bank A/C', group: 'Asset', type: 'Bank', isCorpus: false },
  { id: 'L6', name: 'HDFC Corpus A/C', group: 'Asset', type: 'Bank', isCorpus: true },
  { id: 'L7', name: 'Suspense Receipts', group: 'Liability', type: 'Holding', isCorpus: false },
  { id: 'L8', name: 'Deshawar Payables', group: 'Liability', type: 'Liability', isCorpus: false },
  { id: 'L9', name: 'Maintenance Expense', group: 'Expense', isCorpus: false },
];

export const initialIncomePurposes = [
  { id: 'IP1', name: 'Wajebaat - Takhmeen', ledgerId: 'L1', active: true, isCorpus: false, allowTakhmeen: true, bankId: 'B1' },
  { id: 'IP2', name: 'Fitra', ledgerId: 'L2', active: true, isCorpus: false, allowTakhmeen: true, bankId: 'B1' },
  { id: 'IP3', name: 'Building Corpus', ledgerId: 'L3', active: true, isCorpus: true, allowTakhmeen: false, bankId: 'B2' },
  { id: 'IP4', name: 'Deshawar Remittance', ledgerId: 'L8', active: true, isCorpus: false, allowTakhmeen: false, bankId: 'B1', isLiability: true } // Liability receipt
];

export const initialExpenseCategories = [
  { id: 'EC1', name: 'Property Maintenance', subcategories: [{ id: 'SC1', name: 'Repairs', ledgerId: 'L9', isCorpus: false }] }
];

export const initialRoles = [
  { id: 'R1', name: 'President (Aamil)', permissions: ['view_all', 'approve_takhmeen', 'edit_approved_takhmeen', 'approve_payments'] },
  { id: 'R2', name: 'Secretary', permissions: ['view_all', 'manage_users', 'manage_sabeel', 'enter_receipts', 'initiate_payments'] },
  { id: 'R3', name: 'Accountant', permissions: ['view_all', 'enter_receipts', 'initiate_payments', 'reconciliation', 'journal_entries'] }
];

export const initialBanks = [
  { id: 'B1', name: 'State Bank of India', accountNo: '1234567890', ledgerId: 'L5', isCorpus: false, status: 'Approved', h2hEnabled: true, balance: 1245678 },
  { id: 'B2', name: 'HDFC Bank', accountNo: '0987654321', ledgerId: 'L6', isCorpus: true, status: 'Approved', h2hEnabled: false, balance: 5000000 },
  { id: 'B3', name: 'Cash in Hand', accountNo: 'CASH', ledgerId: 'L4', isCorpus: false, status: 'Approved', h2hEnabled: false, balance: 45000 }
];

// 3. Operational Data (Sabeel Environment mapped to MZ1 / TR1)
export const initialUsers = [
  { id: 'U1', itsId: '30415623', name: 'Syedna Mufaddal Saifuddin', roleId: 'R1', active: true, email: 'aamil@jfms.org' },
  { id: 'U2', itsId: '30410001', name: 'Husain Johar', roleId: 'R2', active: true, email: 'sec@jfms.org', phone: '+919000000001' },
  { id: 'U3', itsId: '30410002', name: 'Taher Accountant', roleId: 'R3', active: true, email: 'acc@jfms.org' }
];

export const initialMuminDirectory = [
  { itsId: '30410101', name: 'Abbas Bhai Suratwala', mauze: 'AHMEDABAD', nationality: 'IN' },
  { itsId: '30410102', name: 'Batool Ben Suratwala', mauze: 'AHMEDABAD', nationality: 'IN' },
  { itsId: '30410201', name: 'Murtaza Bhai Dubaiwala', mauze: 'DUBAI', nationality: 'AE' } // NRI
];

export const initialSabeels = [
  { id: 'SBL001', sabeelNo: 'A-101', type: 'Regular', mauzeId: 'MZ1', hofIts: '30410101', members: ['30410101', '30410102'], active: true },
  { id: 'SBL002', sabeelNo: 'M-101', type: 'Mutawatteen', mauzeId: 'MZ1', hofIts: '30410201', members: ['30410201'], active: true } // Foreign
];

export const initialTakhmeens = [
  { id: 'TK1', sabeelId: 'SBL001', year: '1445H', status: 'Approved', purposes: [
    { purposeId: 'IP1', amount: 15000, paid: 5000 },
    { purposeId: 'IP2', amount: 5000, paid: 0 }
  ]},
  { id: 'TK2', sabeelId: 'SBL002', year: '1445H', status: 'Draft', purposes: [
    { purposeId: 'IP1', amount: 50000, paid: 0 }
  ]}
];

export const initialSchedules = [
  { id: 'SCH1', sabeelId: 'SBL001', purposeId: 'IP1', frequency: 'Monthly', amount: 1250, startDate: '2026-04-05', endDate: '2027-03-05', mandateType: 'UPI Autopay', status: 'Active' }
];

export const initialCampaigns = [
  { id: 'C1', purposeId: 'IP4', description: 'Masjid Renovation Fund', structure: 'Fixed', amount: 10000, expiryDays: 15, status: 'Draft' }
];

export const initialTakhmeenGroups = [
  { id: 'TG1', name: 'Standard Takhmeen 1445H', year: '1445H', status: 'Approved', 
    purposes: [{purposeId: 'IP1', amount: 15000}, {purposeId: 'IP2', amount: 5000}], 
    sabeelCount: 1 }
];

export const initialReceipts = [
  { id: 'R-1445-001', date: '2026-04-01', sabeelId: 'SBL001', payerIts: '30410101', 
    lines: [{ purposeId: 'IP1', amount: 5000 }], total: 5000, mode: 'UPI', status: 'Reconciled', bankId: 'B1' },
];

export const initialDeposits = [
  { id: 'DEP-1445-001', date: '2026-04-01', amount: 5000, mode: 'Cash', bankId: 'B1', status: 'Deposited', denominations: { '2000': 2, '500': 2 } }
];

export const initialPayments = [
  { id: 'P-1445-001', date: '2026-04-02', payee: 'Ace Hardware', amount: 12000, 
    subcategoryId: 'SC1', mode: 'Bank Transfer', status: 'Pending Approval', bankId: 'B1' }
];

export const initialVendors = [
  { id: 'V1', name: 'Ace Hardware', pan: 'ABCDE1234F', type: 'Goods', tdsRate: 0, bankAccount: '1122334455' },
  { id: 'V2', name: 'Star Catering', pan: 'FGHIJ5678K', type: 'Services', tdsRate: 2, bankAccount: '5566778899' }
];

export const initialSuspense = [
  { id: 'SUSP-001', date: '2026-04-01', amount: 4500, bankId: 'B1', description: 'NEFT TRANSFER FROM UNKNOWN', status: 'Unresolved' }
];

export const initialNotificationConfig = {
  takhmeenReminders: true,
  paymentAlerts: true,
  receiptEmails: true,
  cashThreshold: 10000 // PAN mandatory above 10K
};

export const initialJournalEntries = [
  { id: 'JE-1445-001', date: '2026-03-15', narration: 'Opening balance correction', status: 'Posted', lines: [
    { ledgerId: 'L1', debit: 5000, credit: 0 },
    { ledgerId: 'L2', debit: 0, credit: 5000 }
  ], audit: [{ user: 'Taher Accountant', action: 'Created', time: '2026-03-15T10:00:00Z' }, { user: 'Husain Johar', action: 'Verified', time: '2026-03-15T11:30:00Z' }, { user: 'Aamil Saheb', action: 'Posted', time: '2026-03-15T14:00:00Z' }] },
  { id: 'JE-1445-002', date: '2026-04-01', narration: 'Suspense entry reclassification', status: 'Submitted', lines: [
    { ledgerId: 'L8', debit: 4500, credit: 0 },
    { ledgerId: 'L1', debit: 0, credit: 4500 }
  ], audit: [{ user: 'Taher Accountant', action: 'Created', time: '2026-04-01T09:15:00Z' }] }
];

export const initialProperties = [
  { id: 'PROP-001', name: 'Al-Madina Complex Shop 1', type: 'Commercial', status: 'Occupied', tenant: 'Burhani Traders', rent: 15000, deposit: 45000, dueDate: '05' },
  { id: 'PROP-002', name: 'Al-Madina Complex Shop 2', type: 'Commercial', status: 'Vacant', tenant: '', rent: 14000, deposit: 42000, dueDate: '05' },
  { id: 'PROP-003', name: 'Saifee Villa Flat 401', type: 'Residential', status: 'Occupied', tenant: 'Mustafa Bhai', rent: 25000, deposit: 75000, dueDate: '10' }
];

export const initialHallBookings = [
  { id: 'HB-1001', hall: 'Burhani Hall', date: '2026-05-15', event: 'Nikah', customer: 'Murtaza Johar', amount: 35000, status: 'Confirmed', deposit: 10000 },
  { id: 'HB-1002', hall: 'Saifee Garden', date: '2026-06-10', event: 'Ziyafat', customer: 'Abdeali Bhai', amount: 20000, status: 'Pending', deposit: 5000 }
];
