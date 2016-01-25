import Ember from 'ember';
import CPM from 'ember-cpm';
import data from '../data/zones';
import moment from 'moment';
import fmtc from './fmtc';

const product = CPM.Macros.product;
const quotient = CPM.Macros.quotient;
const difference = CPM.Macros.difference;
const sum = CPM.Macros.sum;
const join = CPM.Macros.join;
const alias = Ember.computed.alias;
const esc = CPM.Macros.htmlEscape;


const Zone = Ember.Object.extend({
  value: alias("zone.name"),
  presentation: join("value", "currentTime", " - "),
  currentTime: Ember.computed("value", {
    get () {
      return moment().tz(this.get("value")).format("hh:mm z");
    }
  }).volatile(),
  xp: product("x", 100),
  yp: product("y", 100),
  x: quotient(sum("zone.long", 180), 360),
  y: quotient(difference(90, "zone.lat"), 180),
  zoneStyleRaw: fmtc("xp", "yp", "left: %@%; top: %@%;"),
  zoneStyle: esc("zoneStyleRaw"),
  distSqr (px, py) {
    var dx = this.get("x") - px,
      dy = this.get("y") - py;
    return dx * dx + dy * dy; 
  }
});

var zones = Ember.A();

for (let name in data.zones) {
  zones.pushObject(Zone.create({
    zone: data.zones[name]
  }));
}

var zonesSortedByDistance = zones.sortBy("x");

export default zones;
export { zonesSortedByDistance };