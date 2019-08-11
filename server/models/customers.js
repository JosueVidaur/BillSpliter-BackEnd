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
      allowNull: false,
      defaultValue: 0
    }
  });
  Customers.associate = models => {
    Customers.belongsTo(models.Bill, {
      foreignKey: 'billId',
      onDelete: 'CASCADE'
    });
    // associations can be defined here
  };
  return Customers;
};
