const Customers = require('../models').customers;

module.exports = {
  async create(req, res) {
    try {
      req.body.contacts.forEach(
        async contact =>
          await Customers.create({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            amount: contact.amount,
            billId: req.params.billId,
            contactId: contact.id
          })
      );
      return res.status(201).send(true);
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
