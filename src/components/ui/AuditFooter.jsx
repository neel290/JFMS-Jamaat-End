import React from 'react';
import { User, Clock } from 'lucide-react';

export default function AuditFooter({ createdBy, createdAt, modifiedBy, modifiedAt }) {
  return (
    <div style={{
      marginTop: 40,
      paddingTop: 16,
      borderTop: '1px solid var(--gray-200)',
      display: 'flex',
      gap: 24,
      fontSize: '0.75rem',
      color: 'var(--gray-500)'
    }}>
      <div style={{display:'flex', alignItems:'center', gap: 6}}>
        <User size={14} />
        <span>Created by <strong>{createdBy || 'System'}</strong> on {createdAt || '01-Apr-2026'}</span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap: 6}}>
        <Clock size={14} />
        <span>Last modified by <strong>{modifiedBy || createdBy || 'System'}</strong> on {modifiedAt || createdAt || '01-Apr-2026'}</span>
      </div>
    </div>
  );
}
