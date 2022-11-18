/* This model should deal with storing posts */
const db = require('../data/database');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {
  constructor(email, password) {
    this.email = email;
  }

  async fetch() {
    const userDocument = await db
      .getDb()
      .collection('users')
      .findOne({ email: this.email });
    this.password = userDocument.password;
    return;
  }

  async save(aUser) {
    await db.getDb().collection('users').inserOne(aUser);
  }
}

module.exports = User;
