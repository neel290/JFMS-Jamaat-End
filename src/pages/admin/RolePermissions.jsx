export default function RolePermissions() {
  const roles = ['Secretary','Treasurer','Accountant','Viewer'];
  const crits = ['Critical','Critical','Standard','Basic'];
  const mods = ['Dashboard','Income Entry','Payments','Approvals','Reports','Administration','Takhmeen','Reconciliation'];
  const perms = [[1,1,1,1],[1,1,1,0],[1,1,1,0],[1,1,0,0],[1,1,1,1],[1,0,0,0],[1,1,0,0],[1,1,1,0]];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Role Permissions</h1><p className="page-subtitle">View predefined role permission matrix</p></div></div>
    <div className="data-table-wrapper"><table className="data-table">
      <thead><tr><th>Module</th>{roles.map((r,i) => <th key={r}><div>{r}</div><span className={'badge badge-' + (crits[i]==='Critical'?'critical':crits[i]==='Standard'?'standard':'basic')}>{crits[i]}</span></th>)}</tr></thead>
      <tbody>{mods.map((mod, mi) => (
        <tr key={mod}><td style={{fontWeight:500}}>{mod}</td>
          {perms[mi].map((ok, j) => <td key={j} style={{textAlign:'center', color:ok?'var(--color-success)':'var(--gray-300)', fontSize:'1.25rem'}}>{ok ? '✓' : '✗'}</td>)}
        </tr>
      ))}</tbody>
    </table></div>
  </div>);
}