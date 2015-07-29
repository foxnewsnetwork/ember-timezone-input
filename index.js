/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-timezone-input',
  included: function(app, parentAddon) {
    this._super.included(app);
    var target = (parentAddon || app);

    target.import("./vendor/timezone/bg.png", { destDir: "images/timezone" });
    target.import("./vendor/timezone/world.png", { destDir: "images/timezone" });
  }
};
