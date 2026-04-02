import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2 } from 'lucide-react';

export default function RaiseTicket() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ subject: '', category: 'Bug', priority: 'Medium', description: '' });

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => navigate('/support'), 2000); };

  if (submitted) return (<div style={{textAlign:'center', padding:60}}><CheckCircle2 size={48} color="var(--green-600)" style={{marginBottom:16}}/><h2 style={{color:'var(--green-700)', marginBottom:8}}>Ticket Submitted!</h2><p style={{color:'var(--gray-500)'}}>Your ticket TKT-{String(Date.now()).slice(-4)} has been raised. Our team will respond shortly.</p></div>);

  return (<div>
    <div className="page-header"><div><h1 className="page-title">Raise a Support Ticket</h1><p className="page-subtitle">Describe your issue and we will get back to you within 24 hours</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label className="form-label">Subject <span className="required">*</span></label><input type="text" className="form-input" placeholder="Brief description of the issue" value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} required/></div>
        <div className="grid-2" style={{marginTop:16}}>
          <div className="form-group"><label className="form-label">Category</label><select className="form-input form-select" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}><option>Bug</option><option>Feature Request</option><option>Data Issue</option><option>Access Problem</option></select></div>
          <div className="form-group"><label className="form-label">Priority</label><select className="form-input form-select" value={form.priority} onChange={e=>setForm({...form, priority:e.target.value})}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></div>
        </div>
        <div className="form-group" style={{marginTop:16}}><label className="form-label">Description <span className="required">*</span></label><textarea className="form-input" rows={5} placeholder="Provide detailed steps to reproduce the issue..." value={form.description} onChange={e=>setForm({...form, description:e.target.value})} required/></div>
        <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:16}}><Send size={16}/> Submit Ticket</button>
      </form>
    </div>
  </div>);
}