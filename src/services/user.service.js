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
};
