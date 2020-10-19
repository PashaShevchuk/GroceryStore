const { AuthModel, UserModel } = require('../models');

module.exports = {
  createTokenPair: (tokenObject) => AuthModel.create(tokenObject),

  deleteByParams: (params) => AuthModel.destroy({ where: params }),

  getByParams: (params) => AuthModel.findOne({
    where: params,
    raw: true,
    nest: true,
    include: [UserModel],
  }),
};
