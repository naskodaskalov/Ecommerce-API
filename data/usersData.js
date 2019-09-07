const fs = require('fs')
const usersDB = fs.readFileSync('./UsersDB.json')
var usersJson = JSON.parse(usersDB)

module.exports = {
  total: () => Object.keys(usersJson).length,
  save: (user) => {
    const id = Object.keys(usersJson).length + 1
    user.id = id

    usersJson.push(user)

    fs.writeFile('./UsersDB.json', JSON.stringify(usersJson), function (err) {
      if (err) throw err
    })
  },
  findByUsername: (username) => {
    var registeredUser = []
    for (let i = 0; i < usersJson.length; i++) {
      const user = usersJson[i]

      if (user.username === username) {
        return user
      }
    }

    return registeredUser
  },
  findById: (id) => {
    let registeredUser = []
    for (let i = 0; i < usersJson.length; i++) {
      const user = usersJson[i]

      if (user.id === id) {
        registeredUser = user
        return registeredUser
      }
    }

    return registeredUser
  }
}
