'use strict';

var proxyquire = require('proxyquire');
var path = require('path');

exports.bower = {

  setUp: function (cb) {
    this.bowerConfig = {};

    this.pathMock = {
      join: path.join,
      sep: '/'
    };

    this.bowerMock = {
      config: this.bowerConfig
    };

    this.bowerUtil = proxyquire('../util/bower', {
      bower: this.bowerMock,
      path: this.pathMock
    });

    cb();
  },

  joinComponent: function (test) {
    this.bowerConfig.directory = 'app/bower_components';

    var result = this.bowerUtil.joinComponent('jquery/jquery-2.0.js');
    test.equal(result, 'bower_components/jquery/jquery-2.0.js');

    test.done();
  },

  joinComponentW32Regression: function (test) {
    this.pathMock = '\\';
    this.bowerConfig.directory = 'app/bower_components';

    var result = this.bowerUtil.joinComponent('jquery\\jquery-2.0.js');
    test.equal(result, 'bower_components/jquery/jquery-2.0.js');

    test.done();
  }
};
