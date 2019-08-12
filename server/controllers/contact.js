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
      console.log(error);
      return res.status(400).send(contact);
    }
  }
};
