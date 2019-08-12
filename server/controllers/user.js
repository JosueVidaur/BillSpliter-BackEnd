const User = require('../models').user;

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create({
        firstName: req.body.firstName,
        lastname: req.body.lastname,
        email: req.body.email
      });
      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
