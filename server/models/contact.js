module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define('contact', {
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
    }
  });
  contact.associate = models => {
    contact.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    contact.hasMany(models.customers, {
      foreignKey: 'contactId',
      as: 'customer'
    });
    // associations can be defined here
  };
  return contact;
};
