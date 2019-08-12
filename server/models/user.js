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
    }
  });
  user.associate = models => {
    user.hasMany(models.contact, {
      foreignKey: 'userId',
      as: 'contact'
    });
    // associations can be defined here
  };
  return user;
};
