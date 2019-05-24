const packagebind = require('packagebind');

module.exports = {
  'presets': [['@babel/preset-env', {
    'targets': {
      'browsers': [
        '> 5%',
        'not ie > 0',
      ],
    },
  }]],
  'plugins': [
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-object-rest-spread', {}, 'rest-spread'],
    'brahmos',
    ['module-resolver', {
      'alias': {
        // 'brahmos': '../brahmos/src',
      }
    }]
  ],
};