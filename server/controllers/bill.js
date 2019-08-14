const Bill = require('../models').Bill;
const Customers = require('../models').customers;
const Sequelize = require('sequelize');

module.exports = {
  updateCustomers: async function(newCustomers, billCustomers) {
    try {
      let customersToUpdate = [];
      billCustomers.forEach(billCustomer => {
        const found = newCustomers.find(
          customer => billCustomer.dataValues.id === customer.id
        );
        if (found) {
          customersToUpdate.push(found);
        }
      });

      Promise.all(
        customersToUpdate.forEach(
          async customerToUpdate =>
            await Customers.update(
              {
                firstName: customerToUpdate.firstName,
                lastName: customerToUpdate.lastName,
                phone: customerToUpdate.phone,
                amount: customerToUpdate.amount,
                billId: customerToUpdate.billId,
                contactId: customerToUpdate.contactId
              },
              { where: { id: customerToUpdate.id } }
            )
        )
      );
    } catch (error) {
      throw error;
    }
  },
  createCustomers: async function(newCustomers, billCustomers, billId) {
    try {
      let customersToCreate = [];
      newCustomers.forEach(customer => {
        const found = billCustomers.find(
          billCustomer => billCustomer.dataValues.id === customer.id
        );
        if (!found) {
          customersToCreate.push(customer);
        }
      });

      Promise.all(
        customersToCreate.forEach(
          async customerToCreate =>
            await Customers.create({
              firstName: customerToCreate.firstName,
              lastName: customerToCreate.lastName,
              phone: customerToCreate.phone,
              amount: customerToCreate.amount,
              billId: billId,
              contactId: customerToCreate.contactId
            })
        )
      );
    } catch (error) {
      throw error;
    }
  },

  deleteCustomers: async function(newCustomers, billId) {
    try {
      const Op = Sequelize.Op;
      const ids = newCustomers.map(customer => customer.id);
      customersToDelete = await Customers.findAll({
        where: {
          billId,
          id: { [Op.notIn]: ids }
        }
      });
      Promise.all(
        customersToDelete.forEach(async customer => await customer.destroy())
      );
    } catch (error) {
      throw error;
    }
  },
  async create(req, res) {
    try {
      const bill = await Bill.create({
        place: req.body.place,
        totalAmount: req.body.totalAmount,
        userId: req.params.userId
      });
      const contacts = req.body.contacts;
      Promise.all(
        contacts.forEach(
          async contact =>
            await Customers.create({
              firstName: contact.firstName,
              lastName: contact.lastName,
              phone: contact.phone,
              amount: contact.amount,
              billId: bill.id,
              contactId: req.params.userId
            })
        )
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
  update: async function(req, res) {
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
      await module.exports.updateCustomers(newCustomers, bill.customers);
      await module.exports.createCustomers(
        newCustomers,
        bill.customers,
        bill.id
      );
      await module.exports.deleteCustomers(newCustomers, req.params.billId);

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
