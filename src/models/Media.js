const generateMongooseSchema = require('../utils/mongoose/generateSchema');

/**
 * Model Media
 */
class Media {
  /**
   * Convert to JSON
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      path: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = generateMongooseSchema(() => ({
  path: String,
  name: String,
  mimetype: String
}), {
  Model: Media,
  indexes: [
    [{ 'id': 1 }, { 'unique': true }],
    [{ 'createdAt': -1 }],
    [{ 'updatedAt': -1 }],
    [{ 'name': 'text' }]
  ]
});

