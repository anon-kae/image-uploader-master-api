const { database } = require('../../configs');

/**
 * Get connection options
 * @return {object}
 */
module.exports = function getOptions() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: false,
    autoIndex: false,
    maxPoolSize: 3,
  };

  Object.assign(options, {
    ssl: true,
    sslCert: database.cert,
    sslKey: database.cert,
    authMechanism: 'MONGODB-X509',
    authSource: '$external'
  });
  return options;
};
