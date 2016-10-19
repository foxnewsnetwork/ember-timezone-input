import Ember from 'ember';
import data from '../data/zones';
import moment from 'moment';
import fmtc from './fmtc';
import { join, product, quotient, sum, difference2, esc } from './computed';

const { computed, computed: { readOnly } } = Ember;

const Zone = Ember.Object.extend({
  value: readOnly("zone.name"),
  presentation: join("value", "currentTime", " - "),
  currentTime: computed("value", {
    get () {
      return moment().tz(this.get("value")).format("hh:mm z");
    }
  }).readOnly().volatile(),
  xp: product("x", 100),
  yp: product("y", 100),
  greaterLongitude: sum("zone.long", 180),
  lesserLatitude: difference2(90, "zone.lat"),
  x: quotient('greaterLongitude', 360),
  y: quotient('lesserLatitude', 180),
  zoneStyleRaw: fmtc("xp", "yp", "left: %@%; top: %@%;"),
  zoneStyle: esc("zoneStyleRaw"),
  distSqr (px, py) {
    let dx = this.get("x") - px,
      dy = this.get("y") - py;
    return dx * dx + dy * dy;
  }
});

let zones = Ember.A();

for (let name in data.zones) {
  zones.pushObject(Zone.create({
    zone: data.zones[name]
  }));
}

let zonesSortedByDistance = zones.sortBy("x");

export default zones;
export { zonesSortedByDistance };
