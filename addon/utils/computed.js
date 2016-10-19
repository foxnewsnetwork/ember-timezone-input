import Ember from 'ember';

export function join(...depKeys) {
  const valKeys = depKeys.slice(0, depKeys.length - 1);
  const joiner = depKeys[depKeys.length - 1];
  return Ember.computed(...valKeys, function() {
    return valKeys.map(key => this.get(key)).join(joiner);
  });
}
export const sum = (compKey, constVal) => Ember.computed(compKey, {
  get() { return this.get(compKey) + constVal; }
}).readOnly();
export const difference = (compKey, constVal) => Ember.computed(compKey, {
  get() { return this.get(compKey) - constVal; }
}).readOnly();
export const difference2 = (constVal, compKey) => Ember.computed(compKey, {
  get() { return constVal - this.get(compKey); }
}).readOnly();
export const quotient = (compKey, constVal) => Ember.computed(compKey, {
  get() { return this.get(compKey) / constVal; }
}).readOnly();
export const esc = (key) => Ember.computed(key, {
  get() { return Ember.String.htmlSafe(this.get(key)); }
}).readOnly();
export const product = (compKey, constVal) => Ember.computed(compKey, {
  get() { return this.get(compKey) * constVal; }
}).readOnly();
