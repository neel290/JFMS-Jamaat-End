import React from 'react';
import { FileSearch } from 'lucide-react';

export default function EmptyState({ icon: Icon = FileSearch, title, description, action }) {
  return (
    <div className="empty-state" style={{ padding: '48px 24px', textAlign: 'center', border: '1px dashed #e2e8f0', borderRadius: '8px', margin: '24px 0', backgroundColor: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '50%', color: '#3b82f6' }}>
          <Icon size={32} />
        </div>
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>{title || 'No records found'}</h3>
      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
        {description || 'There are no records to display matching your criteria.'}
      </p>
      {action && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {action}
        </div>
      )}
    </div>
  );
}
