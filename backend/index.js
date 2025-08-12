const express = require('express');
const store = require('./store');
const engine = require('./engine');
const connectors = require('./connectors');
const path = require('path');
const app = express();
app.use(express.json());
app.get('/alerts', (req, res) => res.json(store.listAlerts()));
app.post('/ingest', (req, res) => { store.addAlert(req.body); res.json({ ok: 1 }); });
app.post('/alerts/:id/run/:pb', (req, res) => {
  const a = store.getAlert(req.params.id);
  engine.run(path.join(__dirname, '../samples', req.params.pb + '.yml'), a);
  res.json(a);
});
app.get('/connectors/:name/alerts', (req, res) => res.json(connectors[req.params.name]?.listAlerts() || []));
app.listen(3001, () => console.log('backend on 3001'));
