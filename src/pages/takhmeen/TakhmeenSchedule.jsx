export default function TakhmeenSchedule() {
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Payment Schedule (E-Mandate)</h1><p className="page-subtitle">Set up recurring payment mandates for Sabeels</p></div></div>
    <div className="card" style={{maxWidth:640}}>
      <div className="form-group"><label className="form-label">Sabeel No <span className="required">*</span></label><input className="form-input" placeholder="Search Sabeel No..."/></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Payment Frequency</label><select className="form-input form-select"><option>Monthly</option><option>Quarterly</option><option>Half-yearly</option></select></div><div className="form-group"><label className="form-label">Amount per Instalment</label><input className="form-input" defaultValue="₹4,167"/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date"/></div><div className="form-group"><label className="form-label">End Date</label><input className="form-input" type="date"/></div></div>
      <div className="form-group"><label className="form-label">Mandate Type</label><select className="form-input form-select"><option>e-NACH</option><option>UPI Autopay</option></select></div>
      <button className="btn btn-primary">Generate Mandate</button>
    </div>
  </div>);
}