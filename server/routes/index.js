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

  app.post('/api/bills/:userId', billController.create);
  app.get('/api/bills/:userId', billController.list);
  // app.get('/api/bills/:billId', billController.retrieve);
  app.put('/api/bills/:billId', billController.update);
  app.delete('/api/bills/:billId', billController.delete);
  app.put('/api/bills/:customerId/:billId', customersController.update);
  app.delete('/api/bills/:customerId/:billId', customersController.delete);
  app.post('/api/register', userController.create);
  app.post('/api/contacts/:userId', contactController.create);
  app.get('/api/users/:userId', userController.list);
};
