var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mynodeproj'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/blog'
  },

  test: {
    root: rootPath,
    app: {
      name: 'mynodeproj'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mynodeproj-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'mynodeproj'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mynodeproj-production'
  }
};

module.exports = config[env];
