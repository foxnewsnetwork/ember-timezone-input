/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-timezone-input',
  included(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    const vendor = this.treePaths.vendor;

    app.import(vendor + "/timezone/bg.png", { destDir: "images/timezone" });
    app.import(vendor + "/timezone/world.png", { destDir: "images/timezone" });
  }
};
