# ShoppyGlobe

ShoppyGlobe now includes the original React storefront and a Node.js + Express + MongoDB backend created for the API assignment.

## Frontend

The existing Vite + React storefront includes product browsing, search, cart management, and checkout flow.

## Backend Features

- `POST /register` to create a user account
- `POST /login` to authenticate and return a JWT token
- `GET /products` to fetch all products from MongoDB
- `GET /products/:id` to fetch one product by MongoDB ID
- `GET /cart` to view the logged-in user's cart
- `POST /cart` to add a product to the cart
- `PUT /cart/:productId` to update cart quantity
- `DELETE /cart/:productId` to remove an item from the cart
- JWT-protected cart routes
- Centralized validation and API error handling
- MongoDB seed script for sample products

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, React Router
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Project Structure

```text
src/                  React frontend
server/               Express backend
docs/                 Testing notes and screenshot checklist
```

## Backend Setup

1. Create `server/.env` from `server/.env.example`
2. Add your MongoDB connection string and JWT secret
3. Run `npm install`
4. Run `cd server && npm install`
5. Seed products with `npm run server:seed`
6. Start the backend with `npm run server:dev`

### Example `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/shoppyglobe
JWT_SECRET=supersecretkey123
```

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run server:dev
npm run server:start
npm run server:seed
```

## Submission Support

- API testing notes: `docs/backend-api-testing.md`
- Screenshot folder: `docs/screenshots/`
- GitHub repository: `https://github.com/PREET122/shoppyglobe`
