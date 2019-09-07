const fs = require('fs')
const ordersDB = JSON.parse(fs.readFileSync('./OrdersDB.json'))

let lastOrderId = ordersDB.length

module.exports = {
  ordersByUserId: (userId) => {
    return ordersDB.filter(order => order.userId === userId)
  },
  create: (order) => {
    const id = ++lastOrderId
    order.id = id
    let products = order.products
    let date = new Date()
    let newOrder = {
      id,
      date: date.toISOString().split('T')[0],
      products: products,
      status: 'Pending',
      userId: order.userId
    }

    ordersDB[id] = newOrder
  },
  getOrderById: (orderId, userId) => {
    let orderFound
    ordersDB.map(order => {
      if (order.id === orderId && order.userId === userId) {
        orderFound = order
      }
    })

    return orderFound
  }
}
