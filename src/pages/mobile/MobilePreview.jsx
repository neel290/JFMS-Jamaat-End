import React, { useState } from 'react';
import { Smartphone, RefreshCw, Layers, Zap } from 'lucide-react';

export default function MobilePreview() {
  const [activeTab, setActiveTab] = useState('Home');

  // Simulated mobile UI
  return (
    <div className="mobile-preview-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Native Mobile Preview</h1>
          <p className="page-subtitle">Preview how JFMS feels on iOS and Android devices</p>
        </div>
      </div>

      <div style={{display:'flex', gap: 48, justifyContent:'center', alignItems:'start', marginTop: 40}}>
        {/* Mobile Device Frame */}
        <div style={{
          width: 375, 
          height: 760, 
          background:'black', 
          borderRadius: 48, 
          padding: 12, 
          boxShadow:'0 24px 48px rgba(0,0,0,0.2)',
          position:'relative',
          border:'4px solid #333'
        }}>
          {/* Notch */}
          <div style={{position:'absolute', top: 0, left:'50%', transform:'translateX(-50%)', width: 160, height: 30, background:'black', borderBottomLeftRadius: 18, borderBottomRightRadius: 18, zIndex: 10}}></div>
          
          <div style={{width:'100%', height:'100%', background:'white', borderRadius: 36, overflow:'hidden', position:'relative', display:'flex', flexDirection:'column'}}>
            
            {/* Mobile Header */}
            <div style={{padding:'48px 16px 16px', background:'var(--env-sabeel)', color:'white'}}>
               <div style={{fontSize:'0.75rem', opacity: 0.8}}>Sabeel Number</div>
               <div style={{fontSize:'1.25rem', fontWeight: 700}}>50401234</div>
            </div>

            {/* Mobile Content (Simulated) */}
            <div style={{flex: 1, padding: 16, background:'#F8F9FA', overflowY:'auto'}}>
               <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12, marginBottom: 20}}>
                  <div style={{background:'white', padding: 16, borderRadius: 16, textAlign:'center'}}>
                     <Zap size={24} color="var(--amber-500)" style={{margin:'0 auto 8px'}}/>
                     <div style={{fontSize:'0.7rem', fontWeight: 600}}>Quick Pay</div>
                  </div>
                  <div style={{background:'white', padding: 16, borderRadius: 16, textAlign:'center'}}>
                     <Layers size={24} color="var(--blue-500)" style={{margin:'0 auto 8px'}}/>
                     <div style={{fontSize:'0.7rem', fontWeight: 600}}>My Ledger</div>
                  </div>
               </div>

               <h4 style={{marginBottom: 12, fontSize:'0.875rem'}}>Recent Receipts</h4>
               <div style={{background:'white', borderRadius: 16, padding: 16, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8}}>
                  <div>
                    <div style={{fontSize:'0.8125rem', fontWeight: 600}}>Takhmeen Receipt</div>
                    <div style={{fontSize:'0.7rem', color:'var(--gray-500)'}}>28 Mar 2026</div>
                  </div>
                  <div style={{fontWeight: 700, color:'var(--green-600)'}}>₹4,500</div>
               </div>
               <div style={{background:'white', borderRadius: 16, padding: 16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontSize:'0.8125rem', fontWeight: 600}}>Niabat Receipt</div>
                    <div style={{fontSize:'0.7rem', color:'var(--gray-500)'}}>25 Mar 2026</div>
                  </div>
                  <div style={{fontWeight: 700, color:'var(--green-600)'}}>₹1,200</div>
               </div>
            </div>

            {/* Mobile Nav */}
            <div style={{padding: 12, background:'white', borderTop:'1px solid var(--gray-100)', display:'flex', justifyContent:'space-around'}}>
               <button style={{background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap: 4, color:'var(--env-sabeel)'}}>
                  <Smartphone size={20}/>
                  <span style={{fontSize:'0.65rem', fontWeight: 700}}>Home</span>
               </button>
               <button style={{background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap: 4, color:'var(--gray-400)'}}>
                  <RefreshCw size={20}/>
                  <span style={{fontSize:'0.65rem'}}>History</span>
               </button>
            </div>
          </div>
        </div>

        {/* Info Column */}
        <div style={{maxWidth: 400}}>
           <div className="card" style={{borderLeft:'4px solid var(--env-sabeel)'}}>
              <h3 style={{marginBottom: 12}}>Mobile Features</h3>
              <ul style={{display:'flex', flexDirection:'column', gap: 12, paddingLeft: 20, fontSize:'0.875rem', color:'var(--gray-600)'}}>
                 <li><strong>Paperless Receipts:</strong> Instant PDF download on WhatsApp.</li>
                 <li><strong>One-Tap Takhmeen:</strong> Apply and pay for common purposes easily.</li>
                 <li><strong>Household Management:</strong> View all family member ledgers in one place.</li>
                 <li><strong>Safai Chitthi:</strong> Digital clearance certificate for travels/events.</li>
              </ul>
              <div style={{marginTop: 32, padding: 20, background:'var(--gray-50)', borderRadius: 12, textAlign:'center'}}>
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jfms-m.jamaat.com" alt="QR Code" style={{width: 120, height: 120, marginBottom: 12}}/>
                 <p style={{fontSize:'0.75rem', color:'var(--gray-500)'}}>Scan to download the PWA on your mobile device</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}