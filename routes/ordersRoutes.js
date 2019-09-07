const express = require('express')
const ordersData = require('../data/ordersData')
const authCheck = require('../middleware/auth-check')
const router = express.Router()
const fs = require('fs')
const ordersDB = fs.readFileSync('./OrdersDB.json')
const productsDB = fs.readFileSync('./ProductsDB.json')
var productsJson = JSON.parse(productsDB)
var ordersJson = JSON.parse(ordersDB)

router.get('/', authCheck, (req, res) => {
  const userId = req.user.id
  const orders = ordersData.ordersByUserId(userId)
  res.status(200).json(orders)
})

router.post('/createorder', authCheck, (req, res) => {
  const order = req.body
  const productsList = order.products ? order.products.split(',') : null

  if (!productsList) {
    return res.status(200).json({
      success: false,
      message: 'Create order failed!',
      errors: 'You have to add at least one product to the order'
    })
  }

  for (let i = 0; i < productsList.length; i++) {
    let productId = productsList[i].trim()
    let productExist = false

    Object.keys(productsJson).forEach(key => {
      if (productsJson[key]['id'] == productId) {
        productExist = true
      }
    })

    if (!productExist) {
      return res.status(200).json({
        success: false,
        message: 'Create order failed!',
        errors: `Product with ID ${productId} does not exist!`
      })
    }
  }

  let date = new Date()
  order.date = date.toISOString().split('T')[0]
  order.products = productsList
  order.status = 'Pending'
  order.userId = req.user.id
  ordersData.create(order)
  ordersJson.push(order)

  fs.writeFile('./OrdersDB.json', JSON.stringify(ordersJson), function (err) {
    if (err) throw err
  })
  res.status(200).json({
    success: true,
    message: 'Order successfuly created.',
    order
  })
})

router.put('/changeorderstatus/:id', authCheck, (req, res) => {
  const id = parseInt(req.params.id, 10)
  const newStatus = req.body.status
  let userId = req.user.id
  let orderFound = ordersData.getOrderById(id, userId)
  let itemIndex = orderFound ? orderFound.id - 1 : ''

  if (!orderFound) {
    return res.status(404).send({
      success: 'false',
      message: 'Order not found'
    })
  }

  if (!newStatus) {
    return res.status(400).send({
      success: 'false',
      message: 'You have to select new status'
    })
  }

  if (newStatus !== 'Pending' && newStatus !== 'Processing' && newStatus !== 'Delivered' && newStatus !== 'Cancelled') {
    return res.status(400).send({
      success: 'false',
      message: `Selected status is not correct. It should be 'Pending', 'Processing', 'Delivered' or 'Cancelled'.`
    })
  }

  const updatedOrder = {
    id: orderFound.id,
    date: orderFound.date,
    products: orderFound.products,
    status: newStatus || orderFound.category,
    userId: req.user.id
  }

  ordersJson.splice(itemIndex, 1, updatedOrder)
  fs.writeFile('./OrdersDB.json', JSON.stringify(ordersJson), function (err) {
    if (err) throw err
  })
  return res.status(201).send({
    success: 'true',
    message: 'Order status successfully changed',
    updatedOrder
  })
})

module.exports = router
