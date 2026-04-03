import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, FileText, Landmark, ClipboardList, ShieldCheck } from 'lucide-react';

export default function ReportsCatalog() {
  const navigate = useNavigate();

  const reportGroups = [
    {
      title: 'Financial Reports',
      reports: [
        { name: 'Income Report', desc: 'Detailed breakdown of system income', icon: BarChart3, to: '/reports/income' },
        { name: 'Expense Report', desc: 'Expense analytics and breakdowns', icon: BarChart3, to: '/reports/expense' },
        { name: 'Balance Sheet', desc: 'Tally-compatible balance sheet', icon: FileText, to: '/reports/balance-sheet' },
        { name: 'I&E Statement', desc: 'Income and Expenditure summary', icon: FileText, to: '/reports/ie-statement' },
      ]
    },
    {
      title: 'Operational & Compliance',
      reports: [
        { name: 'Bank Summary', desc: 'Account-wise balances and flows', icon: Landmark, to: '/reports/bank-summary' },
        { name: 'Takhmeen Report', desc: 'Collection, Defaulter and purpose reports', icon: ClipboardList, to: '/reports/takhmeen' },
        { name: 'Compliance Report', desc: 'System level compliance checks', icon: ShieldCheck, to: '/reports/compliance' },
        { name: 'Audit Log', desc: 'Track all manual system overrides', icon: ClipboardList, to: '/reports/audit' },
      ]
    }
  ];

  return (
    <div>
      <div className="page-header">
         <div>
            <h1 className="page-title">Reports Catalog</h1>
            <p className="page-subtitle">Access unified system reports and data exports</p>
         </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap: 32}}>
        {reportGroups.map((group, i) => (
          <div key={i}>
            <h3 style={{marginBottom: 16, borderBottom: '1px solid var(--gray-200)', paddingBottom: 8, color: 'var(--gray-800)'}}>{group.title}</h3>
            <div className="grid-3-1" style={{gap: 16}}>
              {group.reports.map((report, j) => (
                <div key={j} className="card" style={{cursor:'pointer', display:'flex', gap:16, alignItems:'center'}} onClick={() => navigate(report.to)}>
                   <div style={{background:'var(--env-color-light)', color:'var(--env-color)', padding: 12, borderRadius: 'var(--radius-md)'}}>
                      <report.icon size={24} />
                   </div>
                   <div>
                      <h4 style={{fontSize:'0.875rem', fontWeight:600}}>{report.name}</h4>
                      <p style={{fontSize:'0.75rem', color:'var(--gray-500)', marginTop: 4}}>{report.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
