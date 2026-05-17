# ShoppyGlobe Backend API Testing

This file is included to keep the submission evidence in one place. Replace the placeholder notes below with your actual screenshots after running the backend with a real MongoDB connection.

## MongoDB Screenshots to Capture

1. `products` collection with seeded product documents visible.
2. `users` collection after registration.
3. `cartitems` collection after adding a product to cart.

Suggested tools:

- MongoDB Compass
- MongoDB Atlas Collections view

## ThunderClient Screenshots to Capture

1. `POST /register`
2. `POST /login`
3. `GET /products`
4. `GET /products/:id`
5. `GET /cart` with JWT token
6. `POST /cart` with JWT token
7. `PUT /cart/:productId` with JWT token
8. `DELETE /cart/:productId` with JWT token
9. Error case, such as missing token or invalid product ID

## Example Request Bodies

### Register

```json
{
  "name": "Preet Student",
  "email": "preet@example.com",
  "password": "secret123"
}
```

### Login

```json
{
  "email": "preet@example.com",
  "password": "secret123"
}
```

### Add to Cart

```json
{
  "productId": "PUT_REAL_PRODUCT_ID_HERE",
  "quantity": 2
}
```

### Update Cart Item

```json
{
  "quantity": 3
}
```
