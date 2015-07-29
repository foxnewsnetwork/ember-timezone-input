import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('em-timezone-input', 'Integration | Component | em timezone input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{em-timezone-input}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#em-timezone-input}}
      template block text
    {{/em-timezone-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
