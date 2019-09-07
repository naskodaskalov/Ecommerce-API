const fs = require('fs')
const productsDB = JSON.parse(fs.readFileSync('./ProductsDB.json'))
let currentId = productsDB.length

module.exports = {
  all: (req, res) => {
    return productsDB
  },
  isProductExist: (productId) => {
    let productExist = false

    for (let i = 0; i < productsDB.length; i++) {
      const product = productsDB[i]

      if (product.id === productId) {
        productExist = true
        break
      }
    }

    return productExist
  },
  create: (product) => {
    const id = ++currentId
    product.id = id

    let newProduct = {
      id,
      name: product.name,
      category: product.category,
      price: product.price
    }

    productsDB[id] = newProduct
  },
  edit: (productId) => {
    let productFound
    productsDB.map(product => {
      if (product.id === productId) {
        productFound = product
      }
    })

    return productFound
  },
  delete: (productId) => {
    let productFound
    productsDB.map(product => {
      if (product.id === productId) {
        productFound = product
      }
    })

    return productFound
  }
}
