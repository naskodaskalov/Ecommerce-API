const fs = require('fs')
const productsDB = JSON.parse(fs.readFileSync('./ProductsDB.json'))

let currentId = productsDB.length

module.exports = {
  all: (req, res) => {
    return productsDB
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
        console.log(product)
        productFound = product
      }
    })

    return productFound
  },
  delete: (productId) => {
    let productFound
    productsDB.map(product => {
      if (product.id === productId) {
        console.log(product)
        productFound = product
      }
    })

    return productFound
  }
}
