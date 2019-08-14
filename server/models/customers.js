module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('customers', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  Customers.associate = models => {
    Customers.belongsTo(models.Bill, {
      foreignKey: 'billId',
      onDelete: 'CASCADE'
    });
    Customers.belongsTo(models.contact, {
      foreignKey: 'contactId'
    });
  };
  return Customers;
};
