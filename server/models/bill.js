module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    place: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  Bill.associate = models => {
    Bill.hasMany(models.customers, {
      foreignKey: 'billId',
      as: 'customers'
    });
  };
  return Bill;
};
