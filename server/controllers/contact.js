const Contact = require('../models').contact;

module.exports = {
  async create(req, res) {
    try {
      const contact = await Contact.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        userId: req.params.userId
      });
      return res.status(201).send(contact);
    } catch (error) {
      return res.status(400).send(contact);
    }
  },
  async list(req, res) {
    try {
      const contacts = await Contact.findAll({
        where: {
          userId: req.params.userId
        }
      });
      return res.status(200).send(contacts);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
