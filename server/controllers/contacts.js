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
  },
  async update(req, res) {
    try {
      const customer = await Customers.findOne({
        where: {
          id: req.params.customerId,
          billId: req.params.billId
        }
      });
      console.log(customer);
      if (!customer) {
        return res.status(404).send({
          message: 'Customer Not Found'
        });
      }
      await customer.update({
        firstName: req.body.firstName || customer.firstName,
        lastName: req.body.lastName || customer.lastName,
        phone: req.body.phone || customer.phone,
        amount: req.body.amount || customer.amount
      });
      return res.status(200).send(customer);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async delete(req, res) {
    try {
      const customer = await Customers.findOne({
        where: {
          id: req.params.customerId,
          billId: req.params.billId
        }
      });
      await customer.destroy();
      return res.status(200).send({
        message: 'Customer deleted successfully'
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
