import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
export default function IncomeDashboard() {
  const byPurpose = [{name:'Wajebaat',v:185000},{name:'Fitra',v:45000},{name:'Zakat',v:65000},{name:'Niyaz',v:18500},{name:'Sabeel',v:12000}];
  const split=[{name:'Cash',value:40},{name:'Digital',value:60}];
  const trend=[{m:'Oct',v:225},{m:'Nov',v:280},{m:'Dec',v:350},{m:'Jan',v:310},{m:'Feb',v:265},{m:'Mar',v:325}];
  return (<div>
    <div className="page-header"><div><h1 className="page-title">Income Dashboard</h1><p className="page-subtitle">Visual overview of income collections</p></div></div>
    <div className="grid-2">
      <div className="chart-container"><div className="chart-header"><span className="chart-title">Income by Purpose</span></div>
        <ResponsiveContainer width="100%" height={250}><BarChart data={byPurpose}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/><XAxis dataKey="name" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Bar dataKey="v" fill="#0B6E4F" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
      <div className="chart-container"><div className="chart-header"><span className="chart-title">Cash vs Digital</span></div>
        <ResponsiveContainer width="100%" height={250}><PieChart><Pie data={split} cx="50%" cy="50%" outerRadius={80} innerRadius={50} dataKey="value" label={({name,value})=>name+' '+value+'%'}><Cell fill="#D97706"/><Cell fill="#0B6E4F"/></Pie></PieChart></ResponsiveContainer></div>
    </div>
    <div className="chart-container" style={{marginTop:20}}><div className="chart-header"><span className="chart-title">Monthly Trend (₹ thousands)</span></div>
      <ResponsiveContainer width="100%" height={250}><LineChart data={trend}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/><XAxis dataKey="m"/><YAxis/><Tooltip/><Line type="monotone" dataKey="v" stroke="#0B6E4F" strokeWidth={2} dot={{r:4}}/></LineChart></ResponsiveContainer></div>
  </div>);
}