const Bill = require('../models').Bill;
const Customers = require('../models').customers;

module.exports = {
  async create(req, res) {
    try {
      const bill = await Bill.create({
        place: req.body.place,
        totalAmount: req.body.totalAmount,
        userId: req.params.userId
      });
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
        totalAmount: req.body.totalAmount
      });
      return res.status(200).send(bill);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async delete(req, res) {
    try {
      const bill = await Bill.findByPk(req.params.billId);
      console.log('deleting', bill);
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
