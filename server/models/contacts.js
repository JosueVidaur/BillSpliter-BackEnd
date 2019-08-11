module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('contacts', {
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
  Contacts.associate = models => {
    Contacts.belongsTo(models.Bill, {
      foreignKey: 'billId',
      onDelete: 'CASCADE'
    });
    // associations can be defined here
  };
  return Contacts;
};
