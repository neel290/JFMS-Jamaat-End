import { Search, Filter, Download, Plus, Upload } from 'lucide-react';
export default function SabeelMaster() {
  const rows = [['101','Shabbir Bhai Cyclewala','30410123','Dholka',5,'Active'],['102','Mustafa Bhai Bohra','30410456','Dholka',4,'Active'],['103','Yusuf Bhai Udaipurwala','30410789','Dholka',6,'Active'],['104','Hatim Bhai Jamali','30411012','Dholka',3,'Active'],['105','Juzer Bhai Shikari','30411345','Dholka',7,'Active'],['106','Amil Bhai Contractor','30411678','Dholka',2,'Inactive'],['107','Taiyeb Bhai Kapasi','30411901','Dholka',4,'Active'],['108','Quresh Bhai Badri','30412234','Dholka',5,'Active']];
  return (<div>
    <div className="page-header">
      <div><h1 className="page-title">Sabeel No Master</h1><p className="page-subtitle">Manage Sabeel household records</p></div>
      <div className="page-actions"><button className="btn btn-secondary"><Upload size={16} /> Bulk Import</button><button className="btn btn-primary"><Plus size={16} /> Add Sabeel No</button></div>
    </div>
    <div className="data-table-wrapper">
      <div className="data-table-toolbar"><div className="search-box"><Search size={16} /><input placeholder="Search by Sabeel No or ITS ID..." /></div><button className="filter-btn"><Filter size={14} /> Status</button><div style={{marginLeft:'auto'}}><button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button></div></div>
      <table className="data-table"><thead><tr><th>Sabeel No</th><th>Head of Household</th><th>ITS ID</th><th>Mauze</th><th>Members</th><th>Status</th></tr></thead>
        <tbody>{rows.map(([no,hd,its,mz,mem,st], i) => (<tr key={i}><td style={{fontWeight:600}}>{no}</td><td>{hd}</td><td>{its}</td><td>{mz}</td><td>{mem}</td><td><span className={'badge badge-' + (st==='Active'?'active':'inactive')}>{st}</span></td></tr>))}</tbody>
      </table>
      <div className="table-pagination"><span>Showing 1-8 of 8</span><span>Page 1 of 1</span></div>
    </div>
  </div>);
}