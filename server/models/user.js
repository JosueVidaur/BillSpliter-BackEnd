module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  user.associate = models => {
    user.hasMany(models.contact, {
      foreignKey: 'userId',
      as: 'contacts'
    });
    user.hasMany(models.Bill, {
      foreignKey: 'userId',
      as: 'Bills'
    });
    // associations can be defined here
  };
  return user;
};
