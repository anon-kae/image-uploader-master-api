const { constants } = require('../../configs');
const { whitelistOrigins } = constants;
const fs = require('fs');

exports.WHITELIST_ORIGINS = whitelistOrigins.split(',');

exports.getUrlImage = (image) => {
  return image ? `${constants.staticURL}/${image}` : '';
};

exports.getPathImage = (image) => {
  image = image ? image.replace(/\\/g, '/').replace('public', 'static') : '';
  return image;
};

exports.unlinkFile = (files = []) => {
  files.forEach((element) => {
    fs.unlink(element.path, () => { });
  });
};
