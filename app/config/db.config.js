module.exports = {
  MONGODB_URI: "mongodb://localhost:27017/testdb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};