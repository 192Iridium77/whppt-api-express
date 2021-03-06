const $id = require('./id');
const $logger = require('./logger');
const Security = require('./security');
const Mongo = require('./mongo');
const loadModules = require('./modules/loadModules');
const $atdw = require('./atdw');
const Image = require('./image');
const ImageV2 = require('./imageV2');
const Video = require('./video');
const File = require('./file');
const $axios = require('./axios');
const $aws = require('./aws');
const Smtp = require('./smtp');

const config = require(process.cwd() + '/whppt.config.js');

module.exports = options => {
  return Promise.all([Mongo({ $logger })]).then(([$mongo]) => {
    return {
      $id,
      $logger,
      $image: Image({ $logger, $mongo, $aws, $id }),
      $imageV2: ImageV2({ $logger, $mongo, $aws, $id, disablePublishing: options.disablePublishing }),
      $video: Video({ $logger, $mongo, $aws, $id, disablePublishing: options.disablePublishing }),
      $file: File({ $logger, $mongo, $aws, $id, disablePublishing: options.disablePublishing }),
      $security: Security({ $logger, $id, config: options }),
      $mongo,
      $modules: loadModules,
      $atdw,
      $axios,
      $email: { send: $aws.sendEmail, getDomainList: $aws.getDomainIdentities },
      $objectTypes: config.supportedTypes,
      $smtp: Smtp({ $mongo }),
    };
  });
};
