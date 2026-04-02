import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, MessageSquare, BookOpen, ArrowRight, Search, Sparkles, Wand2, Lightbulb, Activity } from 'lucide-react';

export default function SupportHome() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    if (!query) {
      setSuggestion(null);
      return;
    }
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      if (query.toLowerCase().includes('takhmeen')) {
        setSuggestion({
          title: 'Managing Takhmeen Overrides',
          desc: "It looks like you're asking about Takhmeen. Did you know you can request an override from the Sabeel Profile?",
          link: '/support/faq'
        });
      } else if (query.toLowerCase().includes('receipt')) {
        setSuggestion({
          title: 'Receipt Cancellation Workflow',
          desc: "Need to cancel a receipt? Digital approvals are required for all reversals.",
          link: '/support/faq'
        });
      } else {
        setSuggestion({
          title: 'General Support',
          desc: "Searching knowledge base for '" + query + "'...",
          link: '/support/faq'
        });
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="support-home">
      <div className="page-header">
        <div>
          <h1 className="page-title">Help & Support</h1>
          <p className="page-subtitle">AI-assisted guidance and technical support for JFMS</p>
        </div>
      </div>

      <div className="card" style={{padding: 40, background:'linear-gradient(135deg, white 0%, #F5F7FF 100%)', border:'1px solid var(--blue-100)', marginBottom: 32}}>
        <div style={{maxWidth: 600, margin:'0 auto', textAlign:'center'}}>
          <div style={{display:'inline-flex', alignItems:'center', gap: 8, padding:'4px 12px', background:'var(--blue-50)', color:'var(--blue-600)', borderRadius: 100, fontSize:'0.75rem', fontWeight: 700, marginBottom: 16}}>
            <Sparkles size={14}/> AI-POWERED ASSISTANT
          </div>
          <h2 style={{fontSize:'1.75rem', marginBottom: 24}}>How Can We Help You Today?</h2>
          <div style={{position:'relative'}}>
             <Search size={20} style={{position:'absolute', left: 16, top:'50%', transform:'translateY(-50%)', color:'var(--gray-400)'}}/>
             <input 
               type="text" 
               className="form-input form-lg" 
               style={{paddingLeft: 48, borderRadius: 16, boxShadow:'0 4px 12px rgba(0,0,0,0.05)', fontSize:'1.125rem'}} 
               placeholder="Ask about journals, receipts, migration..."
               value={query}
               onChange={e => setQuery(e.target.value)}
             />
             {isTyping && (
               <div style={{position:'absolute', right: 16, top:'50%', transform:'translateY(-50%)', display:'flex', gap: 4}}>
                  <div className="dot-blink" style={{width: 4, height: 4, background:'var(--blue-600)', borderRadius:'50%'}}></div>
                  <div className="dot-blink" style={{width: 4, height: 4, background:'var(--blue-600)', borderRadius:'50%', animationDelay:'0.2s'}}></div>
                  <div className="dot-blink" style={{width: 4, height: 4, background:'var(--blue-600)', borderRadius:'50%', animationDelay:'0.4s'}}></div>
               </div>
             )}
          </div>

          {suggestion && (
            <div className="fade-in" style={{marginTop: 24, padding: 16, background:'white', borderRadius: 12, border:'1px solid var(--gray-200)', textAlign:'left', display:'flex', gap: 16, alignItems:'start'}}>
               <div style={{width: 40, height: 40, background:'var(--blue-50)', borderRadius: 8, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--blue-600)', flexShrink: 0}}>
                 <Lightbulb size={20}/>
               </div>
               <div>
                  <div style={{fontWeight: 700, color:'var(--gray-800)'}}>{suggestion.title}</div>
                  <p style={{fontSize:'0.875rem', color:'var(--gray-500)', marginTop: 4}}>{suggestion.desc}</p>
                  <button className="btn btn-ghost btn-sm" style={{marginTop: 8, padding:0, color:'var(--blue-600)'}} onClick={() => navigate(suggestion.link)}>
                    Read Documentation <ArrowRight size={14} style={{marginLeft: 4}}/>
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:32}}>
        <div className="card hover-scale" style={{cursor:'pointer', textAlign:'center', padding:32}} onClick={()=>navigate('/support/faq')}>
          <BookOpen size={32} color="var(--blue-600)" style={{marginBottom:16}}/>
          <h3 style={{marginBottom:8}}>Knowledge Base</h3>
          <p style={{fontSize:'0.8125rem', color:'var(--gray-500)'}}>Browse frequently asked questions and how-to guides</p>
        </div>
        <div className="card hover-scale" style={{cursor:'pointer', textAlign:'center', padding:32}} onClick={()=>navigate('/support/ticket')}>
          <MessageSquare size={32} color="var(--amber-600)" style={{marginBottom:16}}/>
          <h3 style={{marginBottom:8}}>Raise a Ticket</h3>
          <p style={{fontSize:'0.8125rem', color:'var(--gray-500)'}}>Report a technical issue or request data correction</p>
        </div>
        <div className="card hover-scale" style={{cursor:'pointer', textAlign:'center', padding:32}}>
          <Wand2 size={32} color="var(--purple-600)" style={{marginBottom:16}}/>
          <h3 style={{marginBottom:8}}>Guided Walkthrough</h3>
          <p style={{fontSize:'0.8125rem', color:'var(--gray-500)'}}>Interactive tour of specific JFMS modules</p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title" style={{marginBottom:16, display:'flex', alignItems:'center', gap: 8}}>
           <Activity size={18}/> Active Support Tickets
        </h3>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Ticket #</th><th>Subject</th><th>Status</th><th>Raised On</th><th>Priority</th></tr>
            </thead>
            <tbody>
              <tr><td style={{fontWeight:600}}>TKT-001</td><td>Unable to generate Safai Chitthi</td><td><span className="badge badge-success">Resolved</span></td><td>28-Mar-2026</td><td><span className="badge badge-pending">Medium</span></td></tr>
              <tr><td style={{fontWeight:600}}>TKT-002</td><td>Cheque deposit not reflecting in bank</td><td><span className="badge badge-pending">In Progress</span></td><td>01-Apr-2026</td><td><span className="badge badge-critical">High</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}