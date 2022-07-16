const logger = require('../configs/logger');

/**
 * Upload Service
 */
class UploadService {
  /**
   * Constructor
   * @param UploadRepository
   */
  constructor({ UploadRepository }) {
    this.UploadRepository = UploadRepository;
  }

  /**
   * Upload image
   * @param {object} media
   * @param transaction
   * @return {Promise<Media>}
   */
  async uploadMedia({ path, filename, mimetype }, transaction = null) {
    const media = await this.UploadRepository.create({ path, filename, mimetype }, transaction);

    logger.debug(`Successfully uploaded image filename=${filename}`);

    return media;
  }
}

module.exports = UploadService;
