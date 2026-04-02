import React from 'react';
import { useStore } from '../../store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IndianRupee, Users, PieChart } from 'lucide-react';

export default function TakhmeenReport() {
  const { takhmeens, sabeels, incomePurposes } = useStore();
  const approved = takhmeens.filter(t => t.status === 'Approved');
  let totalAssigned = 0, totalCollected = 0;
  approved.forEach(t => t.purposes.forEach(p => { totalAssigned += p.amount; totalCollected += p.paid; }));
  const collectionRate = totalAssigned > 0 ? Math.round((totalCollected / totalAssigned) * 100) : 0;

  const purposeBreakdown = {};
  approved.forEach(t => t.purposes.forEach(p => {
    const ip = incomePurposes.find(x => x.id === p.purposeId);
    const name = ip ? ip.name : p.purposeId;
    if (!purposeBreakdown[name]) purposeBreakdown[name] = { assigned: 0, collected: 0 };
    purposeBreakdown[name].assigned += p.amount;
    purposeBreakdown[name].collected += p.paid;
  }));
  const chartData = Object.keys(purposeBreakdown).map(k => ({ name: k, assigned: purposeBreakdown[k].assigned, collected: purposeBreakdown[k].collected }));

  return (<div>
    <div className="page-header"><div><h1 className="page-title">Takhmeen Collection Report</h1><p className="page-subtitle">Year: 1445H — Collection vs Assignment analysis</p></div></div>

    <div className="stat-cards" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:24}}>
      <div className="stat-card"><div className="stat-icon blue"><Users size={20}/></div><div className="stat-content"><div className="stat-label">Sabeels Assigned</div><div className="stat-value">{approved.length}</div></div></div>
      <div className="stat-card"><div className="stat-icon green"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Total Assigned</div><div className="stat-value">₹{totalAssigned.toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className="stat-icon amber"><IndianRupee size={20}/></div><div className="stat-content"><div className="stat-label">Total Collected</div><div className="stat-value">₹{totalCollected.toLocaleString('en-IN')}</div></div></div>
      <div className="stat-card"><div className="stat-icon" style={{background: collectionRate >= 80 ? '#DCFCE7' : '#FEF3C7'}}><PieChart size={20} color={collectionRate >= 80 ? '#16A34A' : '#D97706'}/></div><div className="stat-content"><div className="stat-label">Collection Rate</div><div className="stat-value">{collectionRate}%</div></div></div>
    </div>

    <div className="chart-container" style={{marginBottom:24}}><div className="chart-header"><span className="chart-title">Purpose-wise Assigned vs Collected</span></div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
          <XAxis dataKey="name" tick={{fontSize:11}}/><YAxis tickFormatter={v=>"₹"+(v/1000)+"k"}/>
          <Tooltip formatter={v=>"₹"+v.toLocaleString('en-IN')}/>
          <Bar dataKey="assigned" fill="#3B82F6" name="Assigned" radius={[4,4,0,0]}/>
          <Bar dataKey="collected" fill="#16A34A" name="Collected" radius={[4,4,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="card" style={{padding:0, overflow:'hidden'}}>
      <div className="data-table-wrapper"><table className="data-table">
        <thead><tr><th>Sabeel</th><th>Status</th><th style={{textAlign:'right'}}>Assigned</th><th style={{textAlign:'right'}}>Collected</th><th style={{textAlign:'right'}}>Outstanding</th><th>Rate</th></tr></thead>
        <tbody>{approved.map(t => {
          const sbl = sabeels.find(s => s.id === t.sabeelId);
          const assigned = t.purposes.reduce((s,p)=>s+p.amount,0);
          const collected = t.purposes.reduce((s,p)=>s+p.paid,0);
          const rate = assigned > 0 ? Math.round((collected/assigned)*100) : 0;
          return (<tr key={t.id}>
            <td style={{fontWeight:600}}>{sbl?.sabeelNo || t.sabeelId}</td><td><span className="badge badge-active">{t.status}</span></td>
            <td style={{textAlign:'right'}}>₹{assigned.toLocaleString('en-IN')}</td>
            <td style={{textAlign:'right', color:'var(--green-600)'}}>₹{collected.toLocaleString('en-IN')}</td>
            <td style={{textAlign:'right', color:'var(--red-600)', fontWeight:600}}>₹{(assigned-collected).toLocaleString('en-IN')}</td>
            <td><div style={{display:'flex', alignItems:'center', gap:8}}><div style={{flex:1, height:6, background:'var(--gray-100)', borderRadius:4, overflow:'hidden'}}><div style={{height:'100%', background: rate >= 80 ? 'var(--green-500)' : 'var(--amber-500)', width: rate+'%'}}/></div><span style={{fontSize:'0.75rem', fontWeight:600}}>{rate}%</span></div></td>
          </tr>);
        })}</tbody>
      </table></div>
    </div>
  </div>);
}