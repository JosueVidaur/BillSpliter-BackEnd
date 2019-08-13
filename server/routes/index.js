const billController = require('../controllers').bill;
const userController = require('../controllers').user;
const contactController = require('../controllers').contact;

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the BillSpliter API!'
    })
  );

  app.post('/api/createBill/:userId', billController.create);
  app.get('/api/user/bills/:userId', billController.list);
  app.get('/api/bills/:billId', billController.retrieve);
  app.put('/api/bills/:billId', billController.update);
  app.delete('/api/bills/:billId', billController.delete);
  app.post('/api/register', userController.create);
  app.get('/api/login/:clientId', userController.retrieve);
  app.get('/api/contacts/:userId', contactController.list);
  app.post('/api/contacts/:userId', contactController.create);
};
