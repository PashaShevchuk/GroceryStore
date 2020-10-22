const { UserModel } = require('../models');

module.exports = {
  create: async (userObject) => {
    await UserModel.create(userObject);

    return UserModel.findOne({
      where: userObject,
      attributes: ['id', 'name', 'surname', 'email'],
    });
  },

  findOneByParams: (findObject) => UserModel.findOne({ where: findObject }),

  addTokenById: (id, token) => UserModel.update({ token }, { where: { id } }),

  updateById: (id, updateObject) => UserModel.update(updateObject, { where: { id } }),
};
