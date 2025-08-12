import { useEffect, useState } from 'react';
export default function App() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => { fetch('/alerts').then(r => r.json()).then(setAlerts); }, []);
  const list = alerts.filter(a => a.title.includes(filter));
  return (
    <div>
      <input placeholder="filter" value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {list.map(a => (
          <li key={a.id}>
            {a.title}
            <button onClick={() => fetch(`/alerts/${a.id}/run/close`, { method: 'POST' })}>run</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
