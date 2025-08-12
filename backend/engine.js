const fs = require('fs');
const yaml = require('yaml');
const store = require('./store');
function run(pbPath, alert) {
  const pb = yaml.parse(fs.readFileSync(pbPath, 'utf8'));
  for (const s of pb.steps) {
    if (s.action === 'tag') alert.tags = (alert.tags || []).concat(s.value);
    if (s.action === 'close') alert.status = 'closed';
    if (s.action === 'comment') alert.comments = (alert.comments || []).concat(s.value);
  }
  store.addExecution({ playbook: pb.name, alertId: alert.id, ts: Date.now() });
}
module.exports = { run };
