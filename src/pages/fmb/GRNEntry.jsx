import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Package, CheckCircle, ArrowRight, AlertCircle, Search } from 'lucide-react';

export default function GRNEntry() {
  const { purchaseOrders, vendors, createGRN, grns } = useStore();
  const [selectedPOId, setSelectedPOId] = useState('');
  const [receivedItems, setReceivedItems] = useState([]);
  const [toast, setToast] = useState(null);

  const openPOs = purchaseOrders.filter(po => po.status === 'Open');

  const handleSelectPO = (poId) => {
    const po = purchaseOrders.find(p => p.id === poId);
    if (po) {
      setSelectedPOId(poId);
      setReceivedItems(po.items.map(item => ({ ...item, receivedQty: item.qty })));
    }
  };

  const updateReceivedQty = (i, qty) => {
    const ni = [...receivedItems];
    ni[i].receivedQty = Number(qty);
    setReceivedItems(ni);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPOId) return;

    createGRN({
      poId: selectedPOId,
      items: receivedItems,
      date: new Date().toISOString().split('T')[0],
      receivedBy: 'Storekeeper'
    });

    setToast('GRN Recorded Successfully!');
    setSelectedPOId('');
    setReceivedItems([]);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="grn-container">
      {toast && <div className="toast toast-success">{toast}</div>}

      <div className="page-header">
        <div>
          <h1 className="page-title">FMB Goods Receipt Note (GRN)</h1>
          <p className="page-subtitle">Verify and record receipt of goods from vendors</p>
        </div>
      </div>

      <div className="grid-3-1" style={{gap: 24}}>
        <div className="card">
          {!selectedPOId ? (
            <div style={{textAlign:'center', padding:40}}>
              <Package size={48} color="var(--gray-300)" style={{marginBottom: 16}}/>
              <h3>Select a Purchase Order to start</h3>
              <p style={{color:'var(--gray-500)', marginTop: 8}}>Only 'Open' POs are eligible for receipt.</p>
              
              <div style={{marginTop: 24, maxWidth: 400, margin:'24px auto'}}>
                <select className="form-input" onChange={e => handleSelectPO(e.target.value)} value={selectedPOId}>
                  <option value="">-- Select Open PO --</option>
                  {openPOs.map(po => {
                    const vendor = vendors.find(v => v.id === po.vendorId);
                    return <option key={po.id} value={po.id}>{po.id} - {vendor?.name} (₹{po.total.toLocaleString()})</option>
                  })}
                </select>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 20}}>
                <h3>Receiving for PO: {selectedPOId}</h3>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSelectedPOId('')}>Change PO</button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th style={{width: 100}}>Ordered Qty</th>
                    <th style={{width: 120}}>Received Qty</th>
                    <th style={{width: 100}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {receivedItems.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td style={{fontWeight: 600}}>{item.qty}</td>
                      <td>
                        <input 
                          type="number" 
                          className="form-input" 
                          value={item.receivedQty} 
                          onChange={e => updateReceivedQty(i, e.target.value)}
                          max={item.qty}
                        />
                      </td>
                      <td>
                        {item.receivedQty === item.qty ? (
                          <span className="badge badge-success">Full</span>
                        ) : (
                          <span className="badge badge-pending">Partial</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="alert alert-info" style={{marginTop: 24}}>
                <AlertCircle size={18}/> <strong>Note:</strong> Closing this GRN will mark the PO status accordingly.
              </div>

              <div style={{marginTop: 32}}>
                <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Save GRN & Update Inventory</button>
              </div>
            </form>
          )}
        </div>

        <div className="card">
          <h3 className="card-title" style={{marginBottom: 16}}>Recent GRNs</h3>
          <div style={{display:'flex', flexDirection:'column', gap: 12}}>
            {grns.map(g => (
              <div key={g.id} style={{padding: 12, border:'1px solid var(--gray-200)', borderRadius: 8}}>
                <div style={{fontWeight: 600, fontSize:'0.875rem'}}>{g.id}</div>
                <div style={{fontSize:'0.75rem', color:'var(--gray-500)'}}>PO: {g.poId} · {g.date}</div>
              </div>
            ))}
            {grns.length === 0 && <p style={{color:'var(--gray-500)', fontSize:'0.75rem'}}>No recent receipts.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}