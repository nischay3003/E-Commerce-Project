const sequelize=require('./config/db.js');
async function connectSequel(){
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
connectSequel();

