const camelize = require('camelize')
const db = require('../db/db')

const findUserByLogin = async login =>
  db.query(
    `SELECT id, login, name 
      FROM user_account WHERE LOWER(login) = $1
    `, [login]
  )
  .then(res => res.length > 0 ? camelize(res[0]) : null)

module.exports = {findUserByLogin}
