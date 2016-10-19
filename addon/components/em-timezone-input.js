import Ember from 'ember';
import {zonesSortedByDistance} from '../utils/zones';
import fmtc from '../utils/fmtc';

const esc = (key) => Ember.computed(key, {
  get() { return Ember.String.htmlSafe(this.get(key)); }
}).readOnly();
const product = (compKey, constVal) => Ember.computed(compKey, {
  get() { return this.get(compKey) * constVal; }
}).readOnly();

export default Ember.Component.extend({
  mapClickMode: true,
  classNames: ["em-timezone-input"],
  zones: zonesSortedByDistance,
  wrapImg: "images/timezone/bg.png",
  wrapColor: "#4e7cad",
  wrapStylesRaw: fmtc("wrapColor", "wrapImg", "background: %@ url(%@); position: relative;"),
  wrapStyles: esc("wrapStylesRaw"),
  insetImg: "images/timezone/world.png",
  insetStylesRaw: fmtc("insetImg", "background: url(%@) 50% 50%; background-size: cover; padding-bottom: 50%;"),
  insetStyles: esc("insetStylesRaw"),
  selectClass: "ember-timezone-select",
  axisXTop: product("selectedZone.x", 100),
  axisYLeft: product("selectedZone.y", 100),
  axisXStyleRaw: fmtc("axisXTop", "wrapColor", "left: %@%;"),
  axisXStyle: esc("axisXStyleRaw"),
  axisYStyleRaw: fmtc("axisYLeft", "wrapColor", "top: %@%;"),
  axisYStyle: esc("axisYStyleRaw"),
  value: Ember.computed("selectedZone", {
    get () {
      return this.get("selectedZone.value");
    },
    set (_, value) {
      let zone = this.get("zones").findBy("value", value);
      this.set("selectedZone", zone);
      return value;
    }
  }),
  init () {
    this._super(...arguments);
    if ( Ember.isBlank(this.get("selectedZone")) ) {
      this.set("selectedZone", this.get("zones.firstObject"));
    }
  },
  willDestroyElement () {
    this.$(".map-inset").off("mousemove");
  },
  didInsertElement () {
    this.$(".map-inset").mousemove(this.onMousemove.bind(this));
  },
  enableMapClickMode() {
    this.$(".map-inset").mousemove(this.onMousemove.bind(this));
    this.set("mapClickMode", true);
  },
  disableMapClickMode() {
    this.set("mapClickMode", false);
    this.$(".map-inset").off("mousemove");
  },
  onMousemove (e) {
    var m$ = this.$(".map-inset"),
      offset = m$.offset(),
      x = e.pageX - offset.left,
      y = e.pageY - offset.top,
      width = m$.outerWidth(),
      height = m$.outerHeight(),
      px = x / width,
      py = y / height,
      zones = this.get("zones"),
      dist,
      closestDist = 100,
      closestZone,
      i;

    for (i = 0; i < zones.length; i++) {
      dist = zones[i].distSqr(px, py);
      if (dist < closestDist) {
        closestZone = zones[i];
        closestDist = dist;
      }
    }

    if (closestZone) {
      this.set("selectedZone", closestZone);
    }
  },
  actions: {
    change () {
      let i = this.$("select")[0].selectedIndex;
      let zone = this.get("zones").objectAt(i);
      this.set("selectedZone", zone);
    },
    click () {
      if (this.get("mapClickMode")) {
        this.disableMapClickMode();
      } else {
        this.enableMapClickMode();
      }
    }
  }
});
