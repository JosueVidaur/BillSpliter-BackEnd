const billController = require('../controllers').bill;
const customersController = require('../controllers').customers;
const userController = require('../controllers').user;
const contactController = require('../controllers').contact;

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the BillSpliter API!'
    })
  );

  app.post('/api/bills', billController.create);
  app.get('/api/bills', billController.list);
  app.post('/api/bills/:billId/customers', customersController.create);
  app.get('/api/bills/:billId', billController.retrieve);
  app.put('/api/bills/:billId', billController.update);
  app.delete('/api/bills/:billId', billController.delete);
  app.put('/api/bills/:customerId/:billId', customersController.update);
  app.delete('/api/bills/:customerId/:billId', customersController.delete);
  app.post('/api/login', userController.create);
  app.post('/api/contacts/:userId', contactController.create);
};
