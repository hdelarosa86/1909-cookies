const Sequelize = require('sequelize');
const db = require('../connection');

const { STRING, BOOLEAN, UUID, UUIDV4 } = Sequelize;

const User = db.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  loggedIn: {
    type: BOOLEAN,
    defaultValue: false
  }
});

module.exports = {
  User,
};
