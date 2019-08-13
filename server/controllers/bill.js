const Bill = require('../models').Bill;
const Customers = require('../models').customers;
const Sequelize = require('sequelize');

module.exports = {
  async create(req, res) {
    try {
      const bill = await Bill.create({
        place: req.body.place,
        totalAmount: req.body.totalAmount,
        userId: req.params.userId
      });
      const contacts = req.body.contacts;
      contacts.forEach(
        async contact =>
          await Customers.create({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            amount: contact.amount,
            billId: bill.id,
            contactId: contact.contactId
          })
      );
      return res.status(201).send(bill);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async list(req, res) {
    try {
      const bill = await Bill.findAll({
        where: {
          userId: req.params.userId
        },
        include: [
          {
            model: Customers,
            as: 'customers'
          }
        ]
      });
      return res.status(200).send(bill);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async retrieve(req, res) {
    try {
      const bill = await Bill.findByPk(req.params.billId, {
        include: [
          {
            model: Customers,
            as: 'customers'
          }
        ]
      });
      if (!bill) {
        return res.status(404).send({
          message: 'Bill not Found'
        });
      }
      return res.status(200).send(bill);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async update(req, res) {
    try {
      const bill = await Bill.findByPk(req.params.billId, {
        include: [
          {
            model: Customers,
            as: 'customers'
          }
        ]
      });
      if (!bill) {
        return res.status(404).send({
          message: 'Bill Not Found'
        });
      }
      await bill.update({
        place: req.body.place,
        totalAmount: req.body.totalAmount,
        completed: req.body.completed
      });
      const newCustomers = req.body.contacts;
      newCustomers.forEach(async newCustomer => {
        customerToUpdate = await Customers.findOne({
          where: {
            id: newCustomer.id
          }
        });
        if (!customerToUpdate) {
          await Customers.create({
            firstName: newCustomer.firstName,
            lastName: newCustomer.lastName,
            phone: newCustomer.phone,
            amount: newCustomer.amount,
            billId: req.params.billId,
            contactId: newCustomer.contactId
          });
        }
        await customerToUpdate.update({
          firstName: newCustomer.firstName || customerToUpdate.firstName,
          lastName: newCustomer.lastName || customerToUpdate.lastName,
          phone: newCustomer.phone || customerToUpdate.phone,
          amount: newCustomer.amount,
          billId: req.params.billId,
          contactId: newCustomer.contactId
        });
      });
      const Op = Sequelize.Op;
      const ids = newCustomers.map(customer => customer.id);
      customersToDelete = await Customers.findAll({
        where: {
          billId: req.params.billId,
          id: { [Op.notIn]: ids }
        }
      });
      customersToDelete.forEach(async customer => await customer.destroy());
      return res.status(200).send(bill);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },
  async delete(req, res) {
    try {
      const bill = await Bill.findByPk(req.params.billId);
      if (!bill) {
        return res.status(404).send({
          message: 'Bill Not Found'
        });
      }
      await bill.destroy();
      return res.status(200).send({
        message: 'Bill deleted successfully'
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
