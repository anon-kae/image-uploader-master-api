const joi = require('joi');
const ApiError = require('../../utils/ApiError');
const httpStatus = require('http-status');
const { constants } = require('../../configs');
const { unlinkFile, getPathImage } = require('../../utils/constants/global');
const runTransaction = require('../../utils/mongoose/runTransaction');
const logger = require('../../configs/logger');
/**
 * Upload API UseCase
 */
class UploadImageUseCase {
  /**
   * Constructor
   * @param UploadService
   * @param dbRepositories
   */
  constructor({ UploadService }, dbRepositories) {
    this.UploadService = UploadService;
    this.dbRepositories = dbRepositories;
  }

  /**
   * Validators
   */
  static getValidators() {
    return joi.object({
      filename: joi.string().required(),
      mimetype: joi.string().valid('image/jpeg', 'image/png').required()
    });
  }

  /**
   * Execute UseCase
   */
  async execute({ path, filename, mimetype }) {
    const uploadService = new this.UploadService(this.dbRepositories);

    if (!['image/jpeg', 'image/png'].includes(mimetype)) {
      unlinkFile([{ path }]);
      throw new ApiError(httpStatus.BAD_REQUEST, 'Type image not match!');
    }

    return runTransaction(async (transaction) => {
      const { path: pathName } = await uploadService.uploadMedia({ path, filename, mimetype }, transaction);

      logger.info(`Successfully uploaded image filename=${filename}`);

      return {
        path: `${constants.staticURL}/${getPathImage(pathName)}`,
        mimetype
      };
    });
  }
}

module.exports = UploadImageUseCase;
