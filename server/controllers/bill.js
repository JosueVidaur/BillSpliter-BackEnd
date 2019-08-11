const Bill = require('../models').Bill;

module.exports = {
  async create(req, res) {
    try {
      const bill = await Bill.create({
        place: req.body.place,
        totalAmount: req.body.totalAmount
      });
      return res.status(201).send(bill);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
