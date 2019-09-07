## REST API Task

Implement a REST API to manage PRODUCTS and ORDERS, using public VAT API to get country tax rates.

### Requirements

* Comply with REST standard - https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9
* Answer with the relevant status codes, based on the result
* Create an endpoint for PRODUCTS
   - Each product should have name, category, price
   - The API should support getting all products, adding a product, editing a product, deleting a product
   - The response format for all products is added bellow
* Create an endpoint for ORDERS
   - Each order should have a date, products list (product ids) and status (Pending, Processing, Delivered, Cancelled)
   - The API should support getting all orders, adding an order (date should be automatically populated), change order status
   - The response format for all orders is added bellow

### Technologies
Technologies by choice. Optionally database can be in-memory for simplicity. Make sure to prepopulate with data however (categories, several products and orders)

* Implement authentication
   - A request should be send with username and password
   - Retrieving all PRODUCTS should be allowed for anonymous users
   - Relevant status code should be send if token is not provided or is invalid/expired

<strong>Products</strong>
[
    {
        "id": 1,
        "name": "Apple",
        "category": "Fruit",
        "price": "1"
    },
    {
        "id": 2,
        "name": "Milk",
        "category": "Diary",
        "price": "2.50"
    }
]

<strong>Orders</strong>
[
    {
        "id": 1,
        "date": "2018-05-29",
        "products": [1, 2],
        "status": "Delivered"
    },
    {
        "id": 2,
        "date": "2018-05-30",
        "products": [1],
        "status": "Pending"
    }
]

### Endpoints
* **"/auth/signup"** - Create new account by sending username and password.
* **"/auth/login"** - Login by sending username and password. As a result you will get an authorization token.
* **"/products"** - This will retrieve all products from the in-memory DB.
* **"/products/create"** - Create new product with sending name, price and category. Authorization required (Bearer 'token').
* **"/products/edit/:id"** - By sending "id" as parameter to this endpoint, you can edit product. Authorization required (Bearer 'token').
* **"/products/delete/:id"** - By sending "id" as parameter to this endpoint, you can delete product. Authorization required (Bearer 'token').
