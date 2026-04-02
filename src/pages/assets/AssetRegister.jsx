import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, MapPin, Calendar, IndianRupee } from 'lucide-react';

const initialAssets = [
  { id: 'AST001', name: 'Sound System - Bose L1', category: 'Electronics', location: 'Masjid Main Hall', donor: 'Abbas Bhai Suratwala', donorIts: '30410101', dateAcquired: '2024-06-15', value: 85000, condition: 'Good', depreciationRate: 15, status: 'Active' },
  { id: 'AST002', name: 'Generator 5KVA', category: 'Machinery', location: 'Utility Block', donor: 'Jamaat Fund', donorIts: null, dateAcquired: '2023-01-10', value: 120000, condition: 'Fair', depreciationRate: 10, status: 'Active' },
  { id: 'AST003', name: 'Office Furniture Set', category: 'Furniture', location: 'Admin Office', donor: 'Murtaza Bhai Dubaiwala', donorIts: '30410201', dateAcquired: '2025-03-20', value: 45000, condition: 'Excellent', depreciationRate: 10, status: 'Active' },
  { id: 'AST004', name: 'CCTV Camera System (8ch)', category: 'Electronics', location: 'Compound', donor: 'Jamaat Fund', donorIts: null, dateAcquired: '2022-11-05', value: 35000, condition: 'Good', depreciationRate: 15, status: 'Active' },
  { id: 'AST005', name: 'Old Projector', category: 'Electronics', location: 'Store', donor: 'Unknown', donorIts: null, dateAcquired: '2019-07-01', value: 22000, condition: 'Scrapped', depreciationRate: 15, status: 'Scrapped' },
];

export default function AssetRegister() {
  const [assets] = useState(initialAssets);
  const totalValue = assets.filter(a => a.status === 'Active').reduce((s, a) => s + a.value, 0);
  const conditionColor = { Excellent: 'var(--green-600)', Good: 'var(--blue-600)', Fair: 'var(--amber-600)', Scrapped: 'var(--red-600)' };

  return (<div>
    <div className="page-header">
      <div><h1 className="page-title">Asset Register</h1><p className="page-subtitle">Track all fixed assets, in-kind donations, and their lifecycle</p></div>
      <div className="page-actions"><button className="btn btn-primary"><Plus size={16}/> Add Asset</button></div>
    </div>

    <div className="stat-cards" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:24}}>
      <div className="stat-card"><div className="stat-icon blue"><Package size={20}/></div><div className="stat-content"><div className="stat-label">Total Assets</div><div className="stat-value">{assets.length}</div></div></div>
      <div className="stat-card"><div className="stat-icon green"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Gross Book Value</div><div className="stat-value">₹{totalValue.toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className="stat-icon amber"><MapPin size={20}/></div><div className="stat-content"><div className="stat-label">Locations</div><div className="stat-value">{new Set(assets.map(a=>a.location)).size}</div></div></div>
      <div className="stat-card"><div className="stat-icon red"><Trash2 size={20}/></div><div className="stat-content"><div className="stat-label">Scrapped</div><div className="stat-value">{assets.filter(a=>a.status==='Scrapped').length}</div></div></div>
    </div>

    <div className="card" style={{padding:0, overflow:'hidden'}}>
      <div className="data-table-wrapper"><table className="data-table">
        <thead><tr><th>Asset ID</th><th>Name</th><th>Category</th><th>Location</th><th>Donor</th><th>Acquired</th><th style={{textAlign:'right'}}>Value</th><th>Condition</th><th>Status</th></tr></thead>
        <tbody>{assets.map(a => (
          <tr key={a.id}>
            <td style={{fontWeight:600}}>{a.id}</td>
            <td>{a.name}</td>
            <td><span className="badge badge-pending">{a.category}</span></td>
            <td><MapPin size={12} style={{marginRight:4, verticalAlign:'middle'}}/>{a.location}</td>
            <td>{a.donor}</td>
            <td><Calendar size={12} style={{marginRight:4, verticalAlign:'middle'}}/>{a.dateAcquired}</td>
            <td style={{textAlign:'right', fontWeight:600}}>₹{a.value.toLocaleString('en-IN')}</td>
            <td><span style={{color: conditionColor[a.condition], fontWeight:500}}>{a.condition}</span></td>
            <td><span className={"badge badge-" + (a.status === 'Active' ? 'active' : 'critical')}>{a.status}</span></td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  </div>);
}