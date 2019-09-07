const bcrypt = require('bcrypt')
const PassportLocalStrategy = require('passport-local').Strategy
const usersData = require('../data/usersData')

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const user = {
    username: username.trim(),
    password: password.trim()
  }

  const existingUser = usersData.findByUsername(username)
  if (existingUser) {
    return done('Username already exists!')
  }
  let saltRounds = 10
  var salt = bcrypt.genSaltSync(saltRounds)
  var hash = bcrypt.hashSync(user.password, salt)

  user.password = hash

  usersData.save(user)

  return done(null)
})
