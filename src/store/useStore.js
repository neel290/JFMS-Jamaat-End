import { create } from 'zustand';
import {
  initialJamiats, initialMauzes, initialTrusts, initialCOA, initialIncomePurposes,
  initialExpenseCategories, initialRoles, initialBanks, initialUsers,
  initialMuminDirectory, initialSabeels, initialTakhmeens, initialTakhmeenGroups,
  initialSchedules, initialCampaigns, initialReceipts, initialDeposits,
  initialPayments, initialVendors, initialSuspense, initialNotificationConfig,
  initialJournalEntries, initialProperties, initialHallBookings
} from './mockDatabase';
import { format } from 'date-fns';

export const useStore = create((set, get) => ({
  // --- Data States ---
  jamiats: initialJamiats,
  mauzes: initialMauzes,
  trusts: initialTrusts,
  coa: initialCOA,
  incomePurposes: initialIncomePurposes,
  expenseCategories: initialExpenseCategories,
  roles: initialRoles,
  banks: initialBanks,
  users: initialUsers,
  muminDirectory: initialMuminDirectory,
  sabeels: initialSabeels,
  takhmeens: initialTakhmeens,
  takhmeenGroups: initialTakhmeenGroups,
  schedules: initialSchedules,
  campaigns: initialCampaigns,
  receipts: initialReceipts,
  deposits: initialDeposits,
  payments: initialPayments,
  pettyCash: [],
  vendors: initialVendors,
  suspense: initialSuspense,
  config: initialNotificationConfig,
  journalEntries: initialJournalEntries,
  properties: initialProperties,
  hallBookings: initialHallBookings,
  purchaseOrders: [],
  grns: [],
  auditLogs: [],

  // --- Auth & Env State ---
  currentUser: initialUsers[1], // Husain Johar by default
  currentEnv: { id: 'ENV1', type: 'sabeel', mauzeId: 'MZ1', trustId: 'TR1', name: 'Sabeel Main Account' },
  ndaAccepted: true,

  setAuth: (user) => set({ currentUser: user }),
  setEnv: (env) => set({ currentEnv: env }),
  acceptNda: () => set({ ndaAccepted: true }),
  logout: () => set({ currentUser: null, ndaAccepted: false }),

  // --- Utility Actions ---
  logAction: (action, details) => {
    const user = get().currentUser;
    set(state => ({
      auditLogs: [{
        id: 'AL-' + Date.now(),
        timestamp: new Date().toISOString(),
        userId: user ? user.id : 'SYSTEM',
        userName: user ? user.name : 'System',
        action,
        details
      }, ...state.auditLogs]
    }));
  },

  // --- Business Logic Actions ---

  // 0. Admin & Configuration
  addUser: (userDetails) => {
    const newUser = { 
      ...userDetails, 
      id: 'U' + Date.now(),
      active: userDetails.active !== undefined ? userDetails.active : false, // Requires approval usually, but we will simplify
      status: 'Pending Approval'
    };
    set(state => ({ users: [...state.users, newUser] }));
    get().logAction('ADD_USER', `Added user ${newUser.name} with ITS ${newUser.itsId || 'Non-Mumin'}`);
    return newUser;
  },

  deactivateUser: (userId) => {
    set(state => ({
      users: state.users.map(u => u.id === userId ? { ...u, active: false, status: 'Inactive' } : u)
    }));
    get().logAction('DEACTIVATE_USER', `Deactivated user ${userId}`);
  },

  updateUserPermissions: (userId, permissions) => {
    set(state => ({
      users: state.users.map(u => u.id === userId ? { ...u, customPermissions: permissions } : u)
    }));
    get().logAction('UPDATE_USER_PERMISSIONS', `Updated permissions for user ${userId}`);
  },

  // 1. Sabeel & ITS

  addSabeel: (sabeelDetails) => {
    const newSabeel = { ...sabeelDetails, id: 'SBL' + Date.now() };
    set(state => ({ sabeels: [...state.sabeels, newSabeel] }));
    get().logAction('CREATE_SABEEL', `Created Sabeel ${newSabeel.sabeelNo}`);
    return newSabeel;
  },

  // 2. Takhmeen
  createTakhmeenGroup: (groupDetails, sabeelIds) => {
    const groupId = 'TG-' + Date.now();
    const newGroup = {
      id: groupId,
      name: groupDetails.name,
      year: groupDetails.year,
      status: 'Draft',
      purposes: groupDetails.purposes.map(p => ({ purposeId: p.purposeId, amount: p.amount })),
      sabeelCount: sabeelIds.length
    };

    // Generate draft takhmeens for all selected sabeels
    const newTakhmeens = sabeelIds.map(sId => ({
      id: 'TK-' + Date.now() + Math.random(),
      sabeelId: sId,
      groupId: groupId,
      year: groupDetails.year,
      status: 'Draft',
      purposes: groupDetails.purposes.map(p => ({ purposeId: p.purposeId, amount: p.amount, paid: 0 }))
    }));

    set(state => ({ 
      takhmeenGroups: [newGroup, ...state.takhmeenGroups],
      takhmeens: [...state.takhmeens, ...newTakhmeens] 
    }));
    get().logAction('CREATE_TAKHMEEN_GROUP', `Created draft takhmeen for ${sabeelIds.length} sabeels`);
  },

  approveTakhmeenGroup: (groupId) => {
    set(state => ({
      takhmeenGroups: state.takhmeenGroups.map(g => g.id === groupId ? { ...g, status: 'Approved' } : g),
      takhmeens: state.takhmeens.map(t => t.groupId === groupId ? { ...t, status: 'Approved' } : t)
    }));
    get().logAction('APPROVE_TAKHMEEN_GROUP', `Approved Takhmeen Group ${groupId}`);
  },

  rejectTakhmeenGroup: (groupId) => {
    set(state => ({
      takhmeenGroups: state.takhmeenGroups.map(g => g.id === groupId ? { ...g, status: 'Rejected' } : g),
      takhmeens: state.takhmeens.map(t => t.groupId === groupId ? { ...t, status: 'Rejected' } : t)
    }));
    get().logAction('REJECT_TAKHMEEN_GROUP', `Rejected Takhmeen Group ${groupId}`);
  },

  approveTakhmeen: (takhmeenId) => {
    set(state => ({
      takhmeens: state.takhmeens.map(t => 
        t.id === takhmeenId ? { ...t, status: 'Approved' } : t
      )
    }));
    get().logAction('APPROVE_TAKHMEEN', `Approved Takhmeen ${takhmeenId}`);
  },

  rejectTakhmeen: (takhmeenId) => {
    set(state => ({
      takhmeens: state.takhmeens.map(t => 
        t.id === takhmeenId ? { ...t, status: 'Rejected' } : t
      )
    }));
    get().logAction('REJECT_TAKHMEEN', `Rejected Takhmeen ${takhmeenId}`);
  },

  editTakhmeen: (takhmeenId, newPurposes, reason) => {
    set(state => ({
      takhmeens: state.takhmeens.map(t => 
        t.id === takhmeenId ? { ...t, status: 'Pending Approval', purposes: newPurposes, pendingEditReason: reason } : t
      )
    }));
    get().logAction('EDIT_TAKHMEEN', `Requested edit for Takhmeen ${takhmeenId} - Reason: ${reason}`);
  },

  createSchedule: (scheduleDetails) => {
    const newSchedule = { ...scheduleDetails, id: 'SCH-' + Date.now(), status: 'Active' };
    set(state => ({ schedules: [...state.schedules, newSchedule] }));
    get().logAction('CREATE_SCHEDULE', `Created mandate for Sabeel ${newSchedule.sabeelId}`);
  },

  createCampaign: (campaignDetails) => {
    const newCampaign = { ...campaignDetails, id: 'C-' + Date.now(), status: 'Draft' };
    set(state => ({ campaigns: [...state.campaigns, newCampaign] }));
    get().logAction('CREATE_CAMPAIGN', `Created draft campaign for Purpose ${newCampaign.purposeId}`);
  },

  // 3. Receipts
  addReceipt: (receiptDetails) => {
    // Basic logic for adding a receipt and reducing outstanding takhmeen
    const newReceipt = { 
      ...receiptDetails, 
      id: 'R-' + Date.now(),
      status: 'Confirmed'
    };

    set(state => {
      let updatedTakhmeens = [...state.takhmeens];
      let updatedBanks = [...state.banks];

      // Update Bank Balance
      const bankIndex = updatedBanks.findIndex(b => b.id === receiptDetails.bankId);
      if (bankIndex >= 0) {
        updatedBanks[bankIndex] = {
          ...updatedBanks[bankIndex],
          balance: updatedBanks[bankIndex].balance + receiptDetails.total
        };
      }

      // Update Takhmeen if it's tied to one
      if (receiptDetails.sabeelId && receiptDetails.isTakhmeen) {
        const tIndex = updatedTakhmeens.findIndex(t => t.sabeelId === receiptDetails.sabeelId && t.year === receiptDetails.year);
        if (tIndex >= 0) {
          let tObj = { ...updatedTakhmeens[tIndex], purposes: [...updatedTakhmeens[tIndex].purposes] };
          receiptDetails.lines.forEach(line => {
            const pIndex = tObj.purposes.findIndex(p => p.purposeId === line.purposeId);
            if (pIndex >= 0) {
              tObj.purposes[pIndex].paid += line.amount;
            }
          });
          updatedTakhmeens[tIndex] = tObj;
        }
      }

      return { receipts: [newReceipt, ...state.receipts], takhmeens: updatedTakhmeens, banks: updatedBanks };
    });

    get().logAction('CREATE_RECEIPT', `Created receipt ${newReceipt.id} for ${receiptDetails.total}`);
    return newReceipt;
  },

  cancelReceipt: (receiptId, reason) => {
    set(state => ({
      receipts: state.receipts.map(r => 
        r.id === receiptId ? { ...r, status: 'Cancelled', cancelReason: reason } : r
      )
    }));
    get().logAction('CANCEL_RECEIPT', `Cancelled receipt ${receiptId}: ${reason}`);
  },

  requestReceiptCancellation: (receiptId, reason) => {
    set(state => ({
      receipts: state.receipts.map(r => r.id === receiptId ? { ...r, status: 'Pending Cancellation', cancellationReason: reason } : r)
    }));
    get().logAction('REQUEST_RECEIPT_CANCELLATION', `Requested cancellation for ${receiptId} - Reason: ${reason}`);
  },

  // 4. Suspense Management
  resolveSuspense: (suspenseId, resolutionDetails) => {
    set(state => ({
      suspense: state.suspense.map(s => s.id === suspenseId ? { ...s, status: 'Resolved', resolutionDetails } : s)
    }));
    get().logAction('RESOLVE_SUSPENSE', `Resolved suspense ${suspenseId}`);
  },

  addDeposit: (depositDetails) => {
    const newDeposit = {
      ...depositDetails,
      id: 'DEP-' + Date.now(),
      status: depositDetails.mode === 'Cheque' ? 'Pending Clearance' : 'Deposited'
    };
    
    if (depositDetails.mode === 'Cheque' && depositDetails.receiptIds?.length > 0) {
      set(state => ({
        receipts: state.receipts.map(r => 
          depositDetails.receiptIds.includes(r.id) ? { ...r, status: 'Pending Clearance' } : r
        ),
        deposits: [...state.deposits, newDeposit]
      }));
    } else {
      set(state => ({ deposits: [...state.deposits, newDeposit] }));
    }
    
    get().logAction('ADD_DEPOSIT', `Added deposit slip ${newDeposit.id}`);
    return newDeposit;
  },

  updateDepositStatus: (depositId, newStatus) => {
    set(state => ({
      deposits: state.deposits.map(d => d.id === depositId ? { ...d, status: newStatus } : d),
      // If it's cleared, we also clear all associated receipts for simplicity in prototype
      receipts: state.receipts.map(r => {
        const deposit = state.deposits.find(x => x.id === depositId);
        if (deposit?.receiptIds?.includes(r.id) && newStatus === 'Cleared') {
          return { ...r, status: 'Cleared' };
        }
        return r;
      })
    }));
    get().logAction('UPDATE_DEPOSIT', `Deposit ${depositId} marked as ${newStatus}`);
  },

  markReceiptBounced: (receiptId, bankCharges, reason) => {
    set(state => ({
      receipts: state.receipts.map(r => r.id === receiptId ? { ...r, status: 'Bounced', bounceReason: reason, bounceCharges: bankCharges } : r)
    }));
    get().logAction('BOUNCE_CHEQUE', `Receipt ${receiptId} bounced. Charges: ${bankCharges}`);
  },

  // 5. Payments
  addPaymentRequest: (paymentDetails) => {
    const newPayment = {
      ...paymentDetails,
      id: 'P-' + Date.now(),
      status: 'Pending Approval'
    };
    set(state => ({ payments: [newPayment, ...state.payments] }));
    get().logAction('CREATE_PAYMENT', `Created payment request ${newPayment.id} for ${paymentDetails.amount}`);
    return newPayment;
  },

  approveAndExecutePayment: (paymentId, bankId) => {
    set(state => {
      let updatedPayments = [...state.payments];
      let updatedBanks = [...state.banks];

      const pIndex = updatedPayments.findIndex(p => p.id === paymentId);
      if (pIndex >= 0) {
        const amount = updatedPayments[pIndex].amount;
        updatedPayments[pIndex] = { ...updatedPayments[pIndex], status: 'Processed', bankId };

        const bIndex = updatedBanks.findIndex(b => b.id === bankId);
        if (bIndex >= 0) {
          updatedBanks[bIndex] = { ...updatedBanks[bIndex], balance: updatedBanks[bIndex].balance - amount };
        }
      }
      return { payments: updatedPayments, banks: updatedBanks };
    });
    get().logAction('EXECUTE_PAYMENT', `Executed payment ${paymentId} from bank ${bankId}`);
  },

  addPettyCash: (details) => {
    const entry = { ...details, id: 'PC-' + Date.now() };
    set(state => ({ pettyCash: [entry, ...state.pettyCash] }));
    get().logAction('ADD_PETTY_CASH', `Added petty cash expense: ₹${entry.amount}`);
  },

  // 6. FMB Procurement
  createPO: (po) => {
    const newPO = { ...po, id: 'PO-' + Date.now(), status: 'Open' };
    set(state => ({ purchaseOrders: [newPO, ...state.purchaseOrders] }));
    get().logAction('CREATE_PO', `Created PO ${newPO.id} for Vendor ${po.vendorId}`);
    return newPO;
  },

  createGRN: (grn) => {
    const newGRN = { ...grn, id: 'GRN-' + Date.now() };
    set(state => ({ 
      grns: [newGRN, ...state.grns],
      purchaseOrders: state.purchaseOrders.map(po => 
        po.id === grn.poId ? { ...po, status: 'Received' } : po
      )
    }));
    get().logAction('CREATE_GRN', `Created GRN ${newGRN.id} for PO ${grn.poId}`);
    return newGRN;
  },
  addJournalEntry: (entryDetails) => {
    const newEntry = {
      ...entryDetails,
      id: 'JE-' + Date.now(),
      status: 'Draft',
      audit: [{ user: get().currentUser.name, action: 'Created', time: new Date().toISOString() }]
    };
    set(state => ({ journalEntries: [newEntry, ...state.journalEntries] }));
    get().logAction('CREATE_JE', `Created Journal Entry ${newEntry.id}`);
    return newEntry;
  },

  updateJournalStatus: (id, newStatus) => {
    set(state => ({
      journalEntries: state.journalEntries.map(e => {
        if (e.id === id) {
          const action = newStatus === 'Submitted' ? 'Submitted' : (newStatus === 'Verified' ? 'Verified' : 'Posted');
          return {
            ...e,
            status: newStatus,
            audit: [...e.audit, { user: get().currentUser.name, action, time: new Date().toISOString() }]
          };
        }
        return e;
      })
    }));
    get().logAction('UPDATE_JE_STATUS', `Journal Entry ${id} moved to ${newStatus}`);
  },

}));
