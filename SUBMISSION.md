# ShoppyGlobe Backend Submission

## Student Submission Summary

This repository contains the ShoppyGlobe e-commerce assignment project with:

- React frontend
- Node.js and Express.js backend
- MongoDB Atlas integration
- JWT authentication and protected cart routes
- API validation and error handling

## Backend Routes Implemented

### Authentication

- `POST /register`
- `POST /login`

### Products

- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

### Cart

- `GET /cart`
- `POST /cart`
- `PUT /cart/:productId`
- `DELETE /cart/:productId`

## MongoDB Collections Used

- `products`
- `users`
- `cartitems`

## Project Run Instructions

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run seed
npm run dev
```

## API Testing

Detailed request samples are available in:

- `docs/api-reference.md`
- `docs/backend-api-testing.md`

## Screenshot Checklist

Place or attach these screenshots with the final submission:

- MongoDB `products` collection
- MongoDB `users` collection
- MongoDB `cartitems` collection
- ThunderClient `POST /register`
- ThunderClient `POST /login`
- ThunderClient `GET /products`
- ThunderClient `GET /products/:id`
- ThunderClient `GET /cart`
- ThunderClient `POST /cart`
- ThunderClient `PUT /cart/:productId`
- ThunderClient `DELETE /cart/:productId`
- One API error case

## GitHub Repository

[https://github.com/PREET122/shoppyglobe](https://github.com/PREET122/shoppyglobe)

## Notes

- MongoDB Atlas connection was tested successfully.
- Product seed data was inserted into the Atlas `shoppyglobe` database.
- Cart and user data were also created successfully for screenshot capture and testing.
