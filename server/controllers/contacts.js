const Customers = require('../models').contacts;

module.exports = {
  async create(req, res) {
    try {
      const contact = await Customers.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        billId: req.params.billId
      });
      return res.status(201).send(contact);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
};
