const { UploadImageUseCase } = require('../usecases/uploads');
const { success } = require('../configs/response');
const services = require('../services');
const repositories = require('../repositories');

exports.getUploadImageValidations = UploadImageUseCase.getValidators();
exports.uploadImage = async (req, res, next) => {
  try {
    const { path, filename, mimetype } = req.file;
    const useCase = new UploadImageUseCase(services, repositories);
    const result = await useCase.execute({ path, filename, mimetype });

    success({ res, message: 'successfully', result, code: 200 });
  } catch (err) {
    next(err);
  }
};
