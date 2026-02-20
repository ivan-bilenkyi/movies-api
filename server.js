const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 8050;

sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});
