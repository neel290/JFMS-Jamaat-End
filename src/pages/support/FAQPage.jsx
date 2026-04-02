import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search, BookOpen } from 'lucide-react';

const faqData = [
  { cat: 'Takhmeen', items: [
    { q: 'How is Takhmeen amount calculated?', a: 'Takhmeen is assigned per Sabeel by the Aamil Saheb through Takhmeen Groups. Each group defines purpose-wise amounts. Individual overrides can be requested with proper justification and require Aamil approval.' },
    { q: 'Can I change my Takhmeen after it is approved?', a: 'Yes, you can request an edit through the "Takhmeen Override" screen. The request goes through the Maker-Checker approval workflow and requires the Aamil\'s consent.' },
    { q: 'What is a Payment Schedule / Mandate?', a: 'A Payment Schedule (mandate) allows Sabeels to set up recurring auto-payments (UPI Autopay, Standing Instructions) for their Takhmeen dues. You can configure the frequency, start date, and amount.' },
  ]},
  { cat: 'Receipts & Income', items: [
    { q: 'What payment modes are supported?', a: 'JFMS supports Cash, Cheque, UPI, Net Banking, DD/Pay Order, and Foreign Wire Transfer. Each mode has specific validation rules (e.g., PAN mandatory for cash > ₹10,000).' },
    { q: 'How do I cancel a receipt?', a: 'Go to Income → Receipt Cancellation. Select the receipt number, provide a reason, and submit. The cancellation follows the Maker-Checker approval flow.' },
    { q: 'What is Suspense Income?', a: 'Suspense entries are unidentified bank credits that cannot be immediately mapped to a Sabeel or purpose. These must be resolved through the Reconciliation module.' },
  ]},
  { cat: 'Payments', items: [
    { q: 'How is TDS calculated on vendor payments?', a: 'TDS is auto-calculated based on the vendor\'s PAN status. If PAN is available, TDS is deducted at the applicable section rate (e.g., 194C at 2%). Without PAN, the system applies 20% under section 206AA.' },
    { q: 'What is the Maker-Checker flow for payments?', a: 'All payments above the petty cash threshold require two-step approval: the Maker creates the payment request, and the Checker (usually Secretary or Aamil) approves and executes it.' },
  ]},
  { cat: 'Reports & Compliance', items: [
    { q: 'How do I export data to Tally?', a: 'Use the Tally Export module under "Other" in the sidebar. Select the financial period, choose XML or Excel format, and select the data categories to export.' },
    { q: 'Is GST applicable to Jamaat transactions?', a: 'GST applicability depends on the Trust registration. If the Trust is GST-registered (as configured in Admin → Trust settings), applicable GST rates are auto-applied on taxable transactions.' },
  ]},
];

export default function FAQPage() {
  const [open, setOpen] = useState({});
  const [search, setSearch] = useState('');
  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }));

  const filteredFaq = faqData.map(cat => ({
    ...cat,
    items: cat.items.filter(i => !search || i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase()))
  })).filter(cat => cat.items.length > 0);

  return (<div>
    <div className="page-header"><div><h1 className="page-title">Frequently Asked Questions</h1><p className="page-subtitle">Search or browse by category</p></div></div>

    <div style={{marginBottom:24, position:'relative', maxWidth:500}}>
      <Search size={16} style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--gray-400)'}}/>
      <input type="text" className="form-input" placeholder="Search FAQs..." value={search} onChange={e=>setSearch(e.target.value)} style={{paddingLeft:36}}/>
    </div>

    {filteredFaq.map(cat => (<div key={cat.cat} className="card" style={{marginBottom:16}}>
      <h3 className="card-title" style={{marginBottom:16, display:'flex', alignItems:'center', gap:8}}><BookOpen size={18}/> {cat.cat}</h3>
      {cat.items.map((item, i) => {
        const key = cat.cat + i;
        return (<div key={key} style={{borderBottom:'1px solid var(--gray-100)'}}>
          <div onClick={()=>toggle(key)} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', cursor:'pointer', fontWeight:500, fontSize:'0.875rem'}}>
            {item.q} {open[key] ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
          </div>
          {open[key] && <div style={{padding:'0 0 14px', fontSize:'0.8125rem', color:'var(--gray-600)', lineHeight:1.6}}>{item.a}</div>}
        </div>);
      })}
    </div>))}
  </div>);
}