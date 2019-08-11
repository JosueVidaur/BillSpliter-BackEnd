module.exports = (sequelize, DataTypes) => {
  const contacts = sequelize.define('contacts', {
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
      type: DataTypes.NUMBER,
      allowNull: false
    }
  });
  contacts.associate = models => {
    contact.belongsTo(models.Bill, {
      foreignKey: 'BillId',
      onDelete: 'CASCADE'
    });
    // associations can be defined here
  };
  return contacts;
};
