const DB = require('../config/db');
const MONGO_URI = `mongodb+srv://${DB.getDB_USER()}:${DB.getDB_PASS()}@cluster0-uafhs.mongodb.net/${DB.getDB_NAME()}?retryWrites=true&w=majority`

module.exports =  MONGO_URI;