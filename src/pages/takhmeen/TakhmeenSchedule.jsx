import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle2, Search } from 'lucide-react';

export default function TakhmeenSchedule() {
  const { sabeels, takhmeens, createSchedule, schedules } = useStore();
  const [sabeelQuery, setSabeelQuery] = useState('');
  const [foundSabeel, setFoundSabeel] = useState(null);
  const [activeTakhmeen, setActiveTakhmeen] = useState(null);
  
  const [frequency, setFrequency] = useState('Monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mandateType, setMandateType] = useState('e-NACH');
  const [toast, setToast] = useState(null);
  const handleSearch = () => {
    const s = sabeels.find(x => x.sabeelNo === sabeelQuery);
    if(s) {
      setFoundSabeel(s);
      const t = takhmeens.find(x => x.sabeelId === s.id && x.year === '1445H' && x.status === 'Approved');
      setActiveTakhmeen(t);
    } else {
      setFoundSabeel(null);
      setActiveTakhmeen(null);
    }
  };

  const calculateAmount = () => {
    if(!activeTakhmeen) return 0;
    const totalAmount = activeTakhmeen.purposes.reduce((sum, p) => sum + p.amount, 0);
    const divisors = { 'Monthly': 12, 'Quarterly': 4, 'Half-yearly': 2 };
    return Math.round(totalAmount / divisors[frequency]);
  };

  const handleGenerate = () => {
    if(!activeTakhmeen || !startDate || !endDate) {
      setToast('Please complete all fields.');
      setTimeout(()=>setToast(null),2000);
      return;
    }
    
    createSchedule({
      sabeelId: foundSabeel.id,
      takhmeenId: activeTakhmeen.id,
      frequency,
      amount: calculateAmount(),
      startDate,
      endDate,
      type: mandateType
    });
    setToast('Mandate Generated Successfully!');
    setTimeout(() => { setToast(null); setFoundSabeel(null); setActiveTakhmeen(null); }, 2000);
  };

  return (<div>
    {toast && <div className="toast toast-success" style={{zIndex:9999}}><CheckCircle2 size={16}/> {toast}</div>}
    <div className="page-header"><div><h1 className="page-title">Payment Schedule (E-Mandate)</h1><p className="page-subtitle">Set up recurring payment mandates for Sabeels</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group" style={{display:'flex', gap:8, alignItems:'flex-end'}}>
        <div style={{flex:1}}>
          <label className="form-label">Sabeel No <span className="required">*</span></label>
          <input className="form-input" placeholder="Search Sabeel No..." value={sabeelQuery} onChange={e => setSabeelQuery(e.target.value)} />
        </div>
        <button className="btn btn-secondary" onClick={handleSearch}><Search size={16}/></button>
      </div>

      {foundSabeel && !activeTakhmeen && (
        <div style={{color:'red', marginBottom: 16}}>No Approved Takhmeen found for Sabeel {foundSabeel.sabeelNo} (1445H). Must be approved first.</div>
      )}

      {activeTakhmeen && (
        <>
          <div style={{background:'var(--env-color-light)',padding:16,borderRadius:'var(--radius-md)',marginBottom:16}}>
            <h4 style={{marginBottom:4}}>Sabeel {foundSabeel.sabeelNo} Summary</h4>
            <p style={{fontSize:'0.8125rem'}}>Total Takhmeen (1445H): ₹{activeTakhmeen.purposes.reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}</p>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Payment Frequency</label>
              <select className="form-input form-select" value={frequency} onChange={e => setFrequency(e.target.value)}>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half-yearly">Half-yearly</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Amount per Instalment</label>
              <input className="form-input" value={'₹' + calculateAmount().toLocaleString('en-IN')} readOnly style={{background:'#f5f5f5'}}/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}/></div>
            <div className="form-group"><label className="form-label">End Date</label><input className="form-input" type="date" value={endDate} onChange={e=>setEndDate(e.target.value)}/></div>
          </div>
          <div className="form-group">
            <label className="form-label">Mandate Type</label>
            <select className="form-input form-select" value={mandateType} onChange={e=>setMandateType(e.target.value)}>
              <option value="e-NACH">e-NACH</option>
              <option value="UPI Autopay">UPI Autopay</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleGenerate}>Generate Mandate</button>
        </>
      )}
    </div>
  </div>);
}