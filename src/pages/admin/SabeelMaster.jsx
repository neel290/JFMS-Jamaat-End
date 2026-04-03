import { useState } from 'react';
import { Search, Filter, Download, Plus, Upload, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function SabeelMaster() {
  const { sabeels, addSabeel, muminDirectory, currentUser } = useStore();
  const canExportExcel = currentUser?.customPermissions?.includes('export_excel');
  const canExportPdf = currentUser?.customPermissions?.includes('export_pdf');
  const [isAdding, setIsAdding] = useState(false);
  const [newSabeel, setNewSabeel] = useState({ sabeelNo: '', type: 'Regular', hofIts: '', error: '' });

  return (<div>
    <div className="page-header">
      <div><h1 className="page-title">Sabeel No Master</h1><p className="page-subtitle">Manage Sabeel household records</p></div>
      <div className="page-actions">
        <button className="btn btn-secondary"><Upload size={16} /> Bulk Import</button>
        <button className="btn btn-primary" onClick={() => setIsAdding(true)}><Plus size={16} /> Add Sabeel No</button>
      </div>
    </div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar">
        <div className="search-box"><Search size={16} /><input placeholder="Search by Sabeel No or ITS ID..." /></div>
        <button className="filter-btn"><Filter size={14} /> Status</button>
        <div style={{marginLeft:'auto', display:'flex', gap: 8}}>
          {canExportExcel && <button className="btn btn-secondary btn-sm"><Download size={14} /> Export Excel</button>}
          {canExportPdf && <button className="btn btn-secondary btn-sm"><Download size={14} /> Export PDF</button>}
        </div>
      </div>
      <table className="data-table"><thead><tr><th>Sabeel No</th><th>Head of Household</th><th>ITS ID</th><th>Type</th><th>Members</th><th>Status</th></tr></thead>
        <tbody>{sabeels.map((s, i) => {
          const hof = muminDirectory.find(m => m.itsId === s.hofIts) || { name: 'Unknown' };
          return (
            <tr key={s.id}><td style={{fontWeight:600}}>{s.sabeelNo}</td><td>{hof.name}</td><td>{s.hofIts}</td><td>{s.type}</td><td>{s.members?.length || 1}</td><td><span className={'badge badge-' + (s.active?'active':'inactive')}>{s.active ? 'Active' : 'Inactive'}</span></td></tr>
          );
        })}</tbody>
      </table>
      <div className="table-pagination"><span>Showing 1-{sabeels.length} of {sabeels.length}</span><span>Page 1 of 1</span></div>
    </div>

    {isAdding && (
      <div className="drawer-overlay" onClick={() => setIsAdding(false)}>
        <div className="drawer" onClick={e => e.stopPropagation()}>
          <div className="drawer-header">
            <h3 style={{fontWeight:600}}>Create New Sabeel</h3>
            <button className="modal-close" onClick={() => setIsAdding(false)}><X size={18} /></button>
          </div>
          <div className="drawer-body">
            {newSabeel.error && <div style={{color:'red', marginBottom:12, fontSize:'0.875rem'}}>{newSabeel.error}</div>}
            
            <div className="form-group">
              <label className="form-label">Sabeel No <span className="required">*</span></label>
              <input type="text" className="form-input" placeholder="Alphanumeric, max 15" maxLength={15} value={newSabeel.sabeelNo} onChange={e => {
                const val = e.target.value.toUpperCase();
                if (val === '' || /^[A-Z0-9]+$/.test(val)) {
                  setNewSabeel(prev => ({...prev, sabeelNo: val, error: ''}));
                }
              }} />
              <div className="form-hint" style={{color: newSabeel.sabeelNo.length === 15 ? 'orange' : 'var(--gray-500)'}}>
                {newSabeel.sabeelNo.length}/15 characters
              </div>
            </div>

            <div className="form-group">
              <label className="form-checkbox">
                <input type="checkbox" checked={newSabeel.type === 'Mutawatteen'} onChange={e => setNewSabeel(prev => ({...prev, type: e.target.checked ? 'Mutawatteen' : 'Regular'}))} />
                Is Mutawatteen (Resides outside Mauze)
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Sabeel Head ITS <span className="required">*</span></label>
              <input type="text" className="form-input" placeholder="8 digit ITS" maxLength={8} value={newSabeel.hofIts} onChange={e => setNewSabeel(prev => ({...prev, hofIts: e.target.value}))} />
            </div>

            <button className="btn btn-primary" style={{width:'100%', marginTop:16}} onClick={() => {
              if(!newSabeel.sabeelNo || !newSabeel.hofIts) {
                setNewSabeel(prev => ({...prev, error: 'Sabeel No and HOF ITS are required.'}));
                return;
              }
              if(sabeels.some(s => s.sabeelNo.toLowerCase() === newSabeel.sabeelNo.toLowerCase())) {
                setNewSabeel(prev => ({...prev, error: 'Sabeel No already exists.'}));
                return;
              }
              addSabeel({ sabeelNo: newSabeel.sabeelNo, type: newSabeel.type, hofIts: newSabeel.hofIts, members: [newSabeel.hofIts], mauzeId: 'MZ1', active: true });
              setIsAdding(false);
              setNewSabeel({ sabeelNo: '', type: 'Regular', hofIts: '', error: '' });
            }}>Create Sabeel</button>
          </div>
        </div>
      </div>
    )}
  </div>);
}