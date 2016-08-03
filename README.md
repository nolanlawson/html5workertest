html5workertest [![Build Status](https://travis-ci.org/nolanlawson/html5workertest.svg?branch=master)](https://travis-ci.org/nolanlawson/html5workertest) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
=====

Test suite that checks the supported browser APIs in Web Workers and Service Workers, as well as a site to display the browser-by-browser breakdown.

Zuul, Travis, and SauceLabs are used to run the automated tests. To add a new browser version, it first must exist in SauceLabs, next it should be added to `.zuul.yml`.

Building and testing
====

First:

    npm install

Then to run the Zuul tests against all browsers in `.zuul.yml` (requires SaucLabs credentials):

    npm test

To build the site:

    npm run build-site

To develop the site:

    npm run watch-site

To publish the site to gh-pages:

    npm run publish-site
