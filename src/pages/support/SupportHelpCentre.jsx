import React from 'react';
import { HelpCircle, PlayCircle, BookOpen, MessageSquare, PhoneCall } from 'lucide-react';

export default function SupportHelpCentre() {
  const faqs = [
    { q: 'How do I cancel a wrong receipt?', a: 'Go to Income > Fix/Cancel Request. Search for the receipt and submit for Secretary approval.' },
    { q: 'Can I record a backdated entry?', a: 'Yes, but it will be flagged in the Audit Log for the Amalat review.' },
    { q: 'What is the limit for Petty Cash?', a: 'Single voucher limit is ₹5,000. Total monthly limit is ₹25,000.' }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Support & Help Centre</h1>
          <p className="page-subtitle">Tutorials, FAQs and support contact information</p>
        </div>
      </div>

      <div className="grid-2" style={{ gap: 24, marginBottom: 32 }}>
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 20 }}>Video Tutorials</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid var(--gray-100)', borderRadius: 8, cursor: 'pointer' }}>
               <PlayCircle size={24} style={{ color: 'var(--red-600)' }} />
               <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Income Entry Basics</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>2 min • English/Gujarati</div>
               </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid var(--gray-100)', borderRadius: 8, cursor: 'pointer' }}>
               <PlayCircle size={24} style={{ color: 'var(--red-600)' }} />
               <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Year-End Closing Procedure</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>5 min • Step-by-step Guide</div>
               </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 20 }}>Quick Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: 'var(--blue-100)', color: 'var(--blue-700)', padding: 10, borderRadius: 8 }}><MessageSquare size={20}/></div>
                <div>
                   <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>WhatsApp Support</div>
                   <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>+91 98765 43210</div>
                </div>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: 'var(--amber-100)', color: 'var(--amber-700)', padding: 10, borderRadius: 8 }}><PhoneCall size={20}/></div>
                <div>
                   <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Regional Auditor</div>
                   <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Ahmedabad Zone (West)</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ marginBottom: 20 }}>Frequently Asked Questions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--gray-100)', paddingBottom: 16 }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={14} style={{ color: 'var(--blue-600)' }} /> {f.q}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', paddingLeft: 22 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
