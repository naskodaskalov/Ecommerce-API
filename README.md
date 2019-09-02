<h1>REST API Task</h1>

<p>Implement a REST API to manage PRODUCTS and ORDERS, using public VAT API to get country tax rates.</p>

<p>Requirements</p>
<ul>
<li>Comply with REST standard - https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9</li>
<li>Answer with the relevant status codes, based on the result</li>
<li>Create an endpoint for PRODUCTS</li>
<ol>Each product should have name, category, price</ol>
<ol>The API should support getting all products, adding a product, editing a product, deleting a product</ol>
<ol>The response format for all products is added bellow</ol>
<li>Create an endpoint for ORDERS</li>
<ol>Each order should have a date, products list (product ids) and status (Pending, Processing, Delivered, Cancelled)</ol>
<ol>The API should support getting all orders, adding an order (date should be automatically populated), change order status</ol>
<ol>The response format for all orders is added bellow</ol>
</ul>

<p>Technologies</p>
<p>Technologies by choice. Optionally database can be in-memory for simplicity. Make sure to prepopulate with data however (categories, several products and orders)</p>
<ul>
<li>Implement authentication</li>
<ol>A request should be send with username and password</ol>
<ol>Retrieving all PRODUCTS should be allowed for anonymous users</ol>
<ol>Relevant status code should be send if token is not provided or is invalid/expiredс</ol>
</ul>

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


<h2>Endpoints</h2>
<ul>
<li><strong>"/products"</strong> - This will retrieve all products from the in-memory DB.<li>
</ul>

