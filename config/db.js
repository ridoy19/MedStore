require('dotenv').config();

const db = {
    DB_NAME: process.env.DB_NAME,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_USER: process.env.MONGO_USER,

    getDB_NAME () {
        return this.DB_NAME;
    },

    getDB_PASS () {
        return this.MONGO_PASS
    },

    getDB_USER () {
        return this.MONGO_USER
    },

    getDB_URI () {
        return this.MONGO_URI
    },

    printDB_INFO () {
        return `DB NAME ${this.getDB_NAME} \t DB_PASS ${this.getDB_PASS} \t DB_USER ${this.getDB_USER}`
    },
    
}


module.exports =  db;