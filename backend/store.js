const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'db.json');
let data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : { alerts: [], executions: [] };
function save() { fs.writeFileSync(file, JSON.stringify(data)); }
module.exports = {
  listAlerts: () => data.alerts,
  getAlert: id => data.alerts.find(a => a.id === id),
  addAlert: alert => { if (!data.alerts.some(a => a.id === alert.id)) { data.alerts.push(alert); save(); } },
  addExecution: exec => { data.executions.push(exec); save(); },
  reset: () => { data = { alerts: [], executions: [] }; save(); }
};
