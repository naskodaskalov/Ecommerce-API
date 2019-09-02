const productsData = [{
  'id': 1,
  'name': 'apple',
  'category': 'fruit',
  'price': '1'
}, {
  'id': 2,
  'name': 'banana',
  'category': 'fruit',
  'price': '2'
}]

module.exports = {
  all: (req, res) => {
    return productsData
  }
}
