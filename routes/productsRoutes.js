const express = require('express')
const productsData = require('../data/productsData')
const authCheck = require('../middleware/auth-check')
const router = express.Router()
const fs = require('fs')
const products = fs.readFileSync('./ProductsDB.json')
var productsJson = JSON.parse(products)

router.get('/', (req, res) => {
  const products = productsData.all()
  res.status(200).json(products)
})

router.post('/create', authCheck, (req, res) => {
  const product = req.body

  productsData.create(product)
  productsJson.push(product)

  fs.writeFile('./ProductsDB.json', JSON.stringify(productsJson), function (err) {
    if (err) throw err
  })
  res.status(200).json({
    success: true,
    message: 'product added successfuly.',
    product
  })
})

router.put('/edit/:id', authCheck, (req, res) => {
  const id = parseInt(req.params.id, 10)
  let productFound = productsData.edit(id)
  let itemIndex = productFound ? productFound.id - 1 : ''

  if (!productFound) {
    return res.status(404).send({
      success: 'false',
      message: 'Product not found'
    })
  }

  if (!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'Name is required'
    })
  }

  const updatedProduct = {
    id: productFound.id,
    name: req.body.name || productFound.name,
    price: req.body.price || productFound.price,
    category: req.body.category || productFound.category
  }

  productsJson.splice(itemIndex, 1, updatedProduct)
  fs.writeFile('./ProductsDB.json', JSON.stringify(productsJson), function (err) {
    if (err) throw err
  })
  return res.status(201).send({
    success: 'true',
    message: 'Product editted successfully',
    updatedProduct
  })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = parseInt(req.params.id, 10)
  let productFound = productsData.delete(id)
  let itemIndex = productFound ? productFound.id - 1 : ''

  if (!productFound) {
    return res.status(404).send({
      success: 'false',
      message: 'Product not found'
    })
  }
  productsJson.splice(itemIndex, 1)
  fs.writeFile('./ProductsDB.json', JSON.stringify(productsJson), function (err) {
    if (err) throw err
  })

  return res.status(200).send({
    success: 'true',
    message: 'Product deleted successfuly'
  })
})

module.exports = router
