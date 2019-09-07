const jwt = require('jsonwebtoken')
const usersData = require('../data/usersData')
const PassportLocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

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

  let savedUser = usersData.findByUsername(username)

  if (!savedUser) {
    const error = new Error('Incorrect username or password')
    error.name = 'IncorrectCredentialsError'

    return done(error)
  }

  const isMatch = bcrypt.compareSync(user.password, savedUser.password)

  if (!isMatch) {
    const error = new Error('Incorrect username or password')
    error.name = 'IncorrectCredentialsError'

    return done(error)
  }

  const payload = {
    sub: savedUser.id
  }

  // create a token string
  const token = jwt.sign(payload, 's0m3 r4nd0m str1ng')
  const data = {
    name: savedUser.name
  }

  return done(null, token, data)
})
