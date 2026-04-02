import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Filter, Download, Calendar, User, Activity } from 'lucide-react';

export default function AuditLogReport() {
  const { auditLogs } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('All');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.details?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === 'All' || log.action.includes(filterAction);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="audit-log-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Digital Audit Trail</h1>
          <p className="page-subtitle">Comprehensive log of all financial and administrative actions</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline" style={{gap: 8}}><Download size={16}/> Export CSV</button>
        </div>
      </div>

      <div className="card" style={{marginBottom: 24}}>
        <div className="grid-3" style={{gap: 16, alignItems:'end'}}>
          <div className="form-group">
            <label className="form-label">Search Logs</label>
            <div style={{position:'relative'}}>
              <Search size={16} style={{position:'absolute', left: 12, top:'50%', transform:'translateY(-50%)', color:'var(--gray-400)'}}/>
              <input 
                type="text" 
                className="form-input" 
                style={{paddingLeft: 36}} 
                placeholder="Search by action, user, or details..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Action Type</label>
            <select className="form-input" value={filterAction} onChange={e => setFilterAction(e.target.value)}>
              <option value="All">All Actions</option>
              <option value="CREATE">Creation</option>
              <option value="UPDATE">Updates</option>
              <option value="APPROVE">Approvals</option>
              <option value="DELETE">Deletions</option>
              <option value="LOGIN">Auth Events</option>
            </select>
          </div>
          <div className="form-group">
             <label className="form-label">Date Range</label>
             <button className="btn btn-outline" style={{width:'100%', justifyContent:'space-between'}}>
                Last 30 Days <Calendar size={16}/>
             </button>
          </div>
        </div>
      </div>

      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td style={{fontSize:'0.75rem', color:'var(--gray-500)', whiteSpace:'nowrap'}}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap: 8}}>
                      <div style={{width: 24, height: 24, background:'var(--gray-100)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', fontWeight:600}}>
                        {log.userName?.charAt(0)}
                      </div>
                      <span style={{fontWeight: 600}}>{log.userName}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-active" style={{fontSize:'0.65rem'}}>{log.action}</span></td>
                  <td style={{maxWidth: 400}}>{log.details}</td>
                  <td><span className="badge badge-success">Success</span></td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="5" style={{textAlign:'center', padding: 48, color:'var(--gray-500)'}}>
                    <Activity size={48} style={{opacity: 0.1, marginBottom: 12}}/><br/>
                    No audit logs matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
