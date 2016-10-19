var RSVP = require('rsvp');

module.exports = {
  description: 'Moves the image files into place',

  normalizeEntityName: function() {

  },

  afterInstall: function(options) {
    return RSVP.all([
      this.addAddonToProject('ember-moment', ">=4.1.0"),
      this.addAddonToProject('ember-truth-helpers', ">=1.2.0")
    ]);
  }
};
