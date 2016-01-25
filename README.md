# Ember-timezone-input

>warning: it works, but it's pretty alpha and not super-well tested, use at your own peril!

```handlebars
{{em-timezone-input value=value}}
```
This is essentially a select with a picture of the earth over it

Build the application for a dummy test, otherwise, it's pretty much this thing:

http://momentjs.com/timezone/

except as a form select input.

If you're seeing CSRP warnings regarding inline-styles, add the following:

```javascript
contentSecurityPolicy: { 
  "style-src": "'self' 'unsafe-inline' *",
},
```
To your config/environment.js

You'll need to either import the scss file into your app like so:
```scss
@import "ember-timezone-input";
```
Or configure your setup to import the dummy css file:
```javascript
app.import("vendor/ember-timezone-input.css");
```
To properly style the thing (don't do both).

## Usage

This is built on ember 1.13, I know it works there, but I have no idea if it will work on an earlier version or not (lol sorry). Install with:

```sh
ember install ember-timezone-input
```
Requires ember-moment, ember-cpm, ember-truth-helpers.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
