import React, { useState } from 'react';
import { Package, Search, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import AuditFooter from '../../components/ui/AuditFooter';

export default function InKindDonation() {
  const [items, setItems] = useState([{ type: 'Consumable', desc: 'Rice Bag (25kg)', qty: 10, estValue: 12000 }]);
  const [success, setSuccess] = useState(false);

  const addItem = () => setItems([...items, { type: 'Consumable', desc: '', qty: 1, estValue: 0 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  return (
    <div>
      {success && <div className="toast toast-success"><CheckCircle2 size={16}/> In-kind donation recorded and asset register updated!</div>}
      <div className="page-header">
        <div>
          <h1 className="page-title">In-Kind Donation Entry</h1>
          <p className="page-subtitle">Record physical assets and consumables received from Mumineen</p>
        </div>
      </div>

      <div className="grid-3-1" style={{gap: 24}}>
        <div className="card">
          <div className="form-group">
            <label className="form-label">Donor Selection (ITS / Sabeel No) <span className="required">*</span></label>
            <div style={{display:'flex', gap: 8}}>
              <input type="text" className="form-input" placeholder="e.g. 101" defaultValue="101" />
              <button className="btn btn-secondary">Fetch</button>
            </div>
          </div>

          <div style={{background: 'var(--gray-50)', padding: 16, borderRadius: 8, marginBottom: 24, display:'flex', gap: 12, alignItems:'center'}}>
             <div style={{background:'var(--blue-600)', color:'white', width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>S</div>
             <div>
                <div style={{fontWeight: 600}}>Shabbir Bhai Cyclewala</div>
                <div style={{fontSize: '0.75rem', color:'var(--gray-500)'}}>Sabeel: 101 • Mauze: 1</div>
             </div>
          </div>

          <h3 className="card-title" style={{marginBottom: 16}}>Donated Items</h3>
          <table className="data-table" style={{marginBottom: 16}}>
            <thead>
              <tr>
                <th>Classification</th>
                <th>Description</th>
                <th style={{width: 80}}>Qty</th>
                <th style={{width: 150}}>Est. Value (₹)</th>
                <th style={{width: 40}}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td>
                    <select className="form-input form-select" style={{padding: '4px 8px'}}>
                      <option>Consumable</option>
                      <option>Fixed Asset (Capital)</option>
                    </select>
                  </td>
                  <td><input type="text" className="form-input" style={{padding: '4px 8px'}} placeholder="Item description..." defaultValue={item.desc}/></td>
                  <td><input type="number" className="form-input" style={{padding: '4px 8px'}} defaultValue={item.qty}/></td>
                  <td><input type="number" className="form-input" style={{padding: '4px 8px'}} defaultValue={item.estValue}/></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => removeItem(i)}><Trash2 size={14} style={{color:'var(--red-600)'}}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-secondary btn-sm" onClick={addItem}><Plus size={14}/> Add Item</button>

          <div style={{marginTop: 32, display:'flex', justifyContent:'flex-end'}}>
             <button className="btn btn-primary" onClick={() => setSuccess(true)}>Record Donation</button>
          </div>
        </div>

        <div>
          <div className="card" style={{borderColor:'var(--blue-200)', background:'var(--blue-50)'}}>
             <h4 style={{display:'flex', alignItems:'center', gap: 8, color:'var(--blue-700)', marginBottom: 8}}>
                <Package size={18}/> Asset Classification
             </h4>
             <ul style={{fontSize:'0.75rem', color:'var(--blue-800)', paddingLeft: 20, listStyleType:'disc'}}>
                <li><strong>Fixed Assets:</strong> Will be auto-added to Asset Register (C.8.2) for depreciation.</li>
                <li><strong>Consumables:</strong> Marked for FMB Kitchen / Office usage.</li>
             </ul>
          </div>
        </div>
      </div>
      <AuditFooter createdBy="Taher Bhai" createdAt="03-Apr-2026 11:45" />
    </div>
  );
}
