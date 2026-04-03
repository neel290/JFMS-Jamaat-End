import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Home, User, CreditCard, AlertCircle, Search, Building2, CheckCircle2, History, Calendar } from 'lucide-react';
import AuditFooter from '../../components/ui/AuditFooter';

export default function PropertyRent() {
  const { properties } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProp, setSelectedProp] = useState(null);

  const filtered = properties.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="property-rent-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Property Rental Management</h1>
          <p className="page-subtitle">Track Jamaat-owned commercial and residential assets</p>
        </div>
      </div>

      <div className="grid-3-1" style={{gap: 24}}>
        <div className="card">
          <div style={{position:'relative', marginBottom: 20}}>
            <Search size={18} style={{position:'absolute', left: 12, top:'50%', transform:'translateY(-50%)', color:'var(--gray-400)'}}/>
            <input 
              type="text" 
              className="form-input" 
              style={{paddingLeft: 40}} 
              placeholder="Search by property name or tenant..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Property Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Monthly Rent</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} onClick={() => setSelectedProp(p)} style={{cursor:'pointer', background: selectedProp?.id === p.id ? 'var(--blue-50)' : 'transparent'}}>
                    <td style={{fontWeight: 600}}>{p.name}</td>
                    <td>{p.type}</td>
                    <td><span className={`badge badge-${p.status === 'Occupied' ? 'success' : 'pending'}`}>{p.status}</span></td>
                    <td style={{fontWeight: 600}}>₹{p.rent.toLocaleString()}</td>
                    <td>{p.dueDate}th of month</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="property-sidebar">
          {selectedProp ? (
            <div className="card">
              <h3 style={{marginBottom: 16}}>{selectedProp.name}</h3>
              <div style={{display:'flex', flexDirection:'column', gap: 16}}>
                <div style={{padding: 12, background:'var(--gray-50)', borderRadius: 8}}>
                  <div style={{fontSize:'0.65rem', color:'var(--gray-500)', textTransform:'uppercase', fontWeight: 700}}>Tenant Info</div>
                  <div style={{fontWeight: 600, marginTop: 4}}>{selectedProp.tenant || 'VACANT'}</div>
                </div>
                <div style={{display:'flex', gap: 12}}>
                  <div style={{flex: 1, padding: 12, border:'1px solid var(--gray-200)', borderRadius: 8}}>
                    <div style={{fontSize:'0.65rem', color:'var(--gray-500)'}}>Security Deposit</div>
                    <div style={{fontWeight: 700}}>₹{selectedProp.deposit.toLocaleString()}</div>
                  </div>
                  <div style={{flex: 1, padding: 12, border:'1px solid var(--gray-200)', borderRadius: 8}}>
                    <div style={{fontSize:'0.65rem', color:'var(--gray-500)'}}>Last Paid</div>
                    <div style={{fontWeight: 700, color:'var(--green-600)'}}>Mar 2026</div>
                  </div>
                </div>

                <div style={{margin:'8px 0'}}>
                  <h4 style={{fontSize:'0.8125rem', marginBottom: 12, display:'flex', alignItems:'center', gap: 6}}>
                    <History size={14}/> Lease Schedule
                  </h4>
                  <table style={{width:'100%', fontSize:'0.75rem'}}>
                    <thead>
                      <tr style={{color:'var(--gray-500)', textAlign:'left'}}>
                        <th style={{paddingBottom: 8}}>Period</th>
                        <th style={{paddingBottom: 8}}>Amount</th>
                        <th style={{paddingBottom: 8}}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{borderTop:'1px solid var(--gray-100)'}}>
                        <td style={{padding: '8px 0'}}>Apr 2026</td>
                        <td>₹{selectedProp.rent}</td>
                        <td><span className="badge badge-pending" style={{fontSize:'0.6rem'}}>Due</span></td>
                      </tr>
                      <tr style={{borderTop:'1px solid var(--gray-100)'}}>
                        <td style={{padding: '8px 0'}}>Mar 2026</td>
                        <td>₹{selectedProp.rent}</td>
                        <td><span className="badge badge-active" style={{fontSize:'0.6rem'}}>Paid</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button className="btn btn-primary" style={{width:'100%', marginTop: 8}} onClick={() => alert('Rent Receipt Generated!')}>
                  <CreditCard size={16}/> Record Rent Payment
                </button>
                <button className="btn btn-outline" style={{width:'100%'}}>
                   <Calendar size={16}/> Renew Lease Agreement
                </button>
                
                <AuditFooter createdBy="Ishaq Bhai" createdAt="10-Jan-2026" modifiedBy="Mustafa Bhai" modifiedAt="02-Apr-2026" />
              </div>
            </div>
          ) : (
            <div className="card" style={{textAlign:'center', padding:40, color:'var(--gray-400)'}}>
              <Building2 size={48} style={{margin:'0 auto 12px', opacity: 0.3}}/>
              <p style={{fontSize:'0.875rem'}}>Select a property to view detailed lease information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}