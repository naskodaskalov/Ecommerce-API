const express = require('express')
const productsData = require('../data/productsData')
const router = express.Router()

router.get('/', (req, res) => {
  const products = productsData.all()
  res.status(200).json(products)
})

module.exports = router
