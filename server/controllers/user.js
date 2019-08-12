const User = require('../models').user;
const Contact = require('../models').contact;
const Bill = require('../models').Bill;
const Customers = require('../models').customers;

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        clientId: req.body.clientId
      });
      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async list(req, res) {
    try {
      const user = await User.findByPk(req.params.userId, {
        include: [
          {
            model: Contact,
            as: 'contacts'
          },
          {
            model: Bill,
            as: 'Bills',
            include: [
              {
                model: Customers,
                as: 'customers'
              }
            ]
          }
        ]
      });
      if (!user) {
        return res.status(404).send({
          message: 'User doesn`t exist'
        });
      }
      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
