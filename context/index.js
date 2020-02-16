const $id = require('./id');
const $logger = require('./logger');
const Security = require('./security');
const Mongo = require('./mongo');
const loadModules = require('./modules/loadModules');
const $atdw = require('./atdw');
const Image = require('./image');
const $axios = require('./axios');
const $aws = require('./aws');

const config = require(process.cwd() + '/whppt.config.js');

module.exports = () => {
  return Promise.all([Mongo({ $logger })]).then(([$mongo]) => {
    return {
      $id,
      $logger,
      $image: Image({ $logger, $mongo, $aws }),
      $security: Security({ $logger, $id, config }),
      $mongo,
      $modules: loadModules,
      $atdw,
      $axios,
    };
  });
};
