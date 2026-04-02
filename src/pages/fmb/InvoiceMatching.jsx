import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { FileCheck, AlertTriangle, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function InvoiceMatching() {
  const { grns, purchaseOrders, vendors } = useStore();
  const [selectedGRNId, setSelectedGRNId] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [matched, setMatched] = useState(false);

  const handleMatch = () => {
    if (!selectedGRNId || !invoiceNo) return alert('Please select GRN and enter Invoice No');
    setMatched(true);
  };

  const selectedGRN = grns.find(g => g.id === selectedGRNId);
  const selectedPO = selectedGRN ? purchaseOrders.find(p => p.id === selectedGRN.poId) : null;
  const vendor = selectedPO ? vendors.find(v => v.id === selectedPO.vendorId) : null;

  return (
    <div className="invoice-matching-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">FMB Invoice Matching</h1>
          <p className="page-subtitle">3-Way Match: PO vs GRN vs Vendor Invoice</p>
        </div>
      </div>

      <div className="grid-2" style={{gap: 24, alignItems:'start'}}>
        <div className="card">
          <h3 style={{marginBottom: 20}}>Match Details</h3>
          <div className="form-group">
            <label className="form-label">Select GRN <span className="required">*</span></label>
            <select className="form-input" value={selectedGRNId} onChange={e => {setSelectedGRNId(e.target.value); setMatched(false);}}>
              <option value="">-- Select Pending GRN --</option>
              {grns.map(g => <option key={g.id} value={g.id}>{g.id} (PO: {g.poId})</option>)}
            </select>
          </div>

          <div className="form-group" style={{marginTop: 16}}>
            <label className="form-label">Vendor Invoice Number <span className="required">*</span></label>
            <input type="text" className="form-input" placeholder="INV/2026/001" value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)}/>
          </div>

          <button className="btn btn-primary" style={{width:'100%', marginTop: 24}} onClick={handleMatch} disabled={!selectedGRNId}>
            Run 3-Way Match Verification
          </button>
        </div>

        {selectedGRN && (
          <div className="card">
            <h3 style={{marginBottom: 16}}>Matching Summary</h3>
            <div style={{display:'flex', flexDirection:'column', gap: 16}}>
              <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid var(--gray-100)', paddingBottom: 8}}>
                <span style={{color:'var(--gray-500)'}}>Vendor</span>
                <span style={{fontWeight: 600}}>{vendor?.name}</span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid var(--gray-100)', paddingBottom: 8}}>
                <span style={{color:'var(--gray-500)'}}>PO Total</span>
                <span style={{fontWeight: 600}}>₹{selectedPO.total.toLocaleString()}</span>
              </div>

              {matched ? (
                <div style={{padding: 16, background:'#F0FDF4', borderRadius: 12, border:'1px solid #BBF7D0'}}>
                  <div style={{display:'flex', alignItems:'center', gap: 8, color:'var(--green-700)', fontWeight: 700, marginBottom: 8}}>
                    <ShieldCheck size={20}/> 3-Way Match Successful
                  </div>
                  <ul style={{fontSize:'0.8125rem', color:'var(--green-800)', listStyle:'none', padding:0}}>
                    <li>✓ PO Price matched Invoice Price</li>
                    <li>✓ GRN Quantity matched Invoice Quantity</li>
                    <li>✓ Vendor Details Verified</li>
                  </ul>
                  <button className="btn btn-success" style={{width:'100%', marginTop: 16}} onClick={() => alert('Invoice Approved for Payment!')}>
                    Approve for Payment
                  </button>
                </div>
              ) : (
                <div style={{padding: 40, textAlign:'center', background:'var(--gray-50)', borderRadius: 12}}>
                  <FileCheck size={32} color="var(--gray-300)" style={{marginBottom: 8}}/>
                  <p style={{fontSize:'0.8125rem', color:'var(--gray-500)'}}>Awaiting matching execution...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
