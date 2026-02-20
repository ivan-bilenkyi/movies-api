module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Actor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
