import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Trash2, FileText, CheckCircle2, ChevronRight, Package } from 'lucide-react';

export default function PurchaseOrder() {
  const { vendors, purchaseOrders, createPO } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [vendorId, setVendorId] = useState('');
  const [items, setItems] = useState([{ name: '', qty: 0, rate: 0 }]);
  const [toast, setToast] = useState(null);

  const addItem = () => setItems([...items, { name: '', qty: 0, rate: 0 }]);
  const updateItem = (i, f, v) => {
    const ni = [...items];
    ni[i] = { ...ni[i], [f]: v };
    setItems(ni);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vendorId || items.some(i => !i.name || i.qty <= 0)) return alert('Please fill all details');
    
    createPO({ 
      vendorId, 
      items, 
      date: new Date().toISOString().split('T')[0],
      total: items.reduce((s, i) => s + (i.qty * i.rate), 0)
    });
    
    setToast('Purchase Order Created Successfully!');
    setVendorId('');
    setItems([{ name: '', qty: 0, rate: 0 }]);
    setShowForm(false);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="po-container">
      {toast && <div className="toast toast-success">{toast}</div>}
      
      <div className="page-header">
        <div>
          <h1 className="page-title">FMB Purchase Orders</h1>
          <p className="page-subtitle">Manage procurement for daily Niaz/FMB services</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'View All POs' : <><Plus size={16}/> Create New PO</>}
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="card" style={{maxWidth: 800, margin:'0 auto'}}>
          <h3 style={{marginBottom: 20}}>Create Purchase Order</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Select Vendor <span className="required">*</span></label>
              <select className="form-input" value={vendorId} onChange={e => setVendorId(e.target.value)}>
                <option value="">-- Choose Vendor --</option>
                {vendors.map(v => <option key={v.id} value={v.id}>{v.name} ({v.type})</option>)}
              </select>
            </div>

            <h4 style={{marginTop: 24, marginBottom: 12}}>Order Items</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th style={{width: 100}}>Qty</th>
                  <th style={{width: 120}}>Rate (₹)</th>
                  <th style={{width: 120, textAlign:'right'}}>Total</th>
                  <th style={{width: 40}}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td><input type="text" className="form-input" placeholder="e.g. Basmati Rice" value={item.name} onChange={e => updateItem(i, 'name', e.target.value)}/></td>
                    <td><input type="number" className="form-input" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)}/></td>
                    <td><input type="number" className="form-input" value={item.rate} onChange={e => updateItem(i, 'rate', e.target.value)}/></td>
                    <td style={{textAlign:'right', fontWeight: 600}}>₹{(item.qty * item.rate).toLocaleString('en-IN')}</td>
                    <td><button type="button" className="btn btn-ghost btn-sm text-error" onClick={() => setItems(items.filter((_, idx) => idx !== i))}><Trash2 size={14}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{marginTop: 16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <button type="button" className="btn btn-outline btn-sm" onClick={addItem}><Plus size={14}/> Add Item</button>
              <div style={{fontSize:'1.125rem', fontWeight: 700}}>
                Grand Total: ₹{items.reduce((s, i) => s + (i.qty * i.rate), 0).toLocaleString('en-IN')}
              </div>
            </div>

            <div style={{marginTop: 32, display:'flex', gap: 12}}>
              <button type="submit" className="btn btn-primary" style={{flex: 1}}>Confirm & Issue PO</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card" style={{padding:0, overflow:'hidden'}}>
          <div className="data-table-wrapper">
             <table className="data-table">
               <thead>
                 <tr>
                   <th>PO Number</th>
                   <th>Date</th>
                   <th>Vendor</th>
                   <th style={{textAlign:'right'}}>Amount</th>
                   <th>Status</th>
                   <th>Action</th>
                 </tr>
               </thead>
               <tbody>
                 {purchaseOrders.map(po => {
                   const vendor = vendors.find(v => v.id === po.vendorId);
                   return (
                     <tr key={po.id}>
                       <td style={{fontWeight: 600}}>{po.id}</td>
                       <td>{po.date}</td>
                       <td>{vendor?.name || 'Unknown'}</td>
                       <td style={{textAlign:'right', fontWeight: 600}}>₹{po.total.toLocaleString('en-IN')}</td>
                       <td><span className={`badge badge-${po.status === 'Open' ? 'pending' : 'active'}`}>{po.status}</span></td>
                       <td><button className="btn btn-ghost btn-sm"><FileText size={14}/> View</button></td>
                     </tr>
                   );
                 })}
                 {purchaseOrders.length === 0 && (
                   <tr>
                     <td colSpan="6" style={{textAlign:'center', padding: 48, color:'var(--gray-500)'}}>
                       <Package size={48} style={{opacity: 0.1, marginBottom: 12}}/><br/>
                       No purchase orders found.
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
          </div>
        </div>
      )}
    </div>
  );
}