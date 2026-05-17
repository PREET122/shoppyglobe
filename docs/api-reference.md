# ShoppyGlobe API Reference

Base URL for local testing:

```text
http://localhost:5000
```

## Authentication

### POST `/register`

Register a new user.

```json
{
  "name": "Preet Student",
  "email": "preet@example.com",
  "password": "secret123"
}
```

### POST `/login`

Authenticate the user and return a JWT token.

```json
{
  "email": "preet@example.com",
  "password": "secret123"
}
```

## Products

### GET `/products`

Fetch all products from MongoDB.

### GET `/products/:id`

Fetch a single product by MongoDB ObjectId.

### POST `/products`

Create a new product document.

```json
{
  "name": "Bluetooth Speaker",
  "price": 1899,
  "description": "Portable speaker with deep bass and 10-hour backup.",
  "stockQuantity": 15,
  "category": "electronics",
  "imageUrl": "https://example.com/speaker.jpg"
}
```

### PUT `/products/:id`

Update an existing product document.

### DELETE `/products/:id`

Delete a product document.

## Cart

All cart routes require:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### GET `/cart`

Fetch the current logged-in user's cart.

### POST `/cart`

Add a product to the cart.

```json
{
  "productId": "PRODUCT_OBJECT_ID",
  "quantity": 2
}
```

### PUT `/cart/:productId`

Update the quantity of a cart item.

```json
{
  "quantity": 3
}
```

### DELETE `/cart/:productId`

Remove the product from the cart.

## Common Error Cases

- Invalid or missing JWT token
- Invalid MongoDB ObjectId
- Product not found
- Cart item not found
- Quantity greater than available stock
- Validation errors for missing required fields
