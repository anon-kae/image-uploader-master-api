const { Media } = require('../models');

/**
 * Upload Repository
 */
class UploadRepository {
  /**
   * Create a customer
   * @param {object} media
   * @param session
   * @return {Promise<*>}
   */
  static async create({ path, filename, mimetype }, session = null) {
    const [media] = await Media.create([{ path, name: filename, mimetype }], { session });
    return media;
  }
}

module.exports = UploadRepository;
