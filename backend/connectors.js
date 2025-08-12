const fs = require('fs');
const path = require('path');
const samples = path.join(__dirname, '../samples');
class Connector {
  constructor(name) { this.name = name; this.data = JSON.parse(fs.readFileSync(path.join(samples, name + '.json'))); }
  listAlerts() { return this.data.alerts; }
}
const names = ['sekoia', 'sentinelone', 'fortiedr', 'rangerad', 'vectra', 'aisiem'];
const objs = Object.fromEntries(names.map(n => [n, new Connector(n)]));
module.exports = objs;
module.exports.Connector = Connector;
