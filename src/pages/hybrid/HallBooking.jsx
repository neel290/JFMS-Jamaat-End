import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Calendar, Users, MapPin, CheckCircle, Clock, Plus, Filter } from 'lucide-react';

export default function HallBooking() {
  const { hallBookings } = useStore();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? hallBookings : hallBookings.filter(b => b.status === filter);

  const getStatusBadge = (status) => {
    const classes = {
      'Confirmed': 'badge-success',
      'Pending': 'badge-pending',
      'Cancelled': 'badge-error'
    };
    return <span className={`badge ${classes[status] || 'badge-gray'}`}>{status}</span>;
  };

  return (
    <div className="hall-booking-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Community Hall Bookings</h1>
          <p className="page-subtitle">Manage reservations for Burhani Hall, Saifee Garden, and other venues</p>
        </div>
        <div className="page-actions">
           <button className="btn btn-primary" onClick={() => alert('New Booking Form')}><Plus size={16}/> New Booking</button>
        </div>
      </div>

      <div className="tabs" style={{marginBottom: 24}}>
        {['All', 'Confirmed', 'Pending', 'Cancelled'].map(t => (
          <button key={t} className={`tab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      <div className="grid-3" style={{gap: 20}}>
        {filtered.map(booking => (
          <div key={booking.id} className="card" style={{display:'flex', flexDirection:'column', gap: 16}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
              <div>
                <h3 style={{fontSize:'1.125rem'}}>{booking.event}</h3>
                <div style={{display:'flex', alignItems:'center', gap: 6, fontSize:'0.8125rem', color:'var(--gray-500)', marginTop: 4}}>
                   <MapPin size={14}/> {booking.hall}
                </div>
              </div>
              {getStatusBadge(booking.status)}
            </div>

            <div style={{display:'flex', gap: 12, padding:'12px 16px', background:'var(--gray-50)', borderRadius: 12}}>
               <Calendar size={18} color="var(--blue-600)"/>
               <div>
                  <div style={{fontWeight: 700, fontSize:'0.9375rem'}}>{new Date(booking.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</div>
                  <div style={{fontSize:'0.75rem', color:'var(--gray-500)'}}>Customer: {booking.customer}</div>
               </div>
            </div>

            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'auto'}}>
               <div>
                  <div style={{fontSize:'0.65rem', color:'var(--gray-500)', textTransform:'uppercase'}}>Total Amount</div>
                  <div style={{fontWeight: 700, fontSize:'1.125rem'}}>₹{booking.amount.toLocaleString()}</div>
               </div>
               <div style={{textAlign:'right'}}>
                  <div style={{fontSize:'0.65rem', color:'var(--gray-500)', textTransform:'uppercase'}}>Deposit Paid</div>
                  <div style={{fontWeight: 700, color:'var(--green-600)'}}>₹{booking.deposit.toLocaleString()}</div>
               </div>
            </div>

            <div style={{display:'flex', gap: 8, marginTop: 8}}>
               <button className="btn btn-outline btn-sm" style={{flex: 1}}>Edit</button>
               <button className="btn btn-ghost btn-sm" style={{flex: 1}}>Cancel</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card" style={{textAlign:'center', padding: 60, color:'var(--gray-400)'}}>
           <Calendar size={48} style={{margin:'0 auto 16px', opacity: 0.2}}/>
           <p>No bookings found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}