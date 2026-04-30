# ShoppyGlobe

ShoppyGlobe is a Vite + React e-commerce assignment project that fetches products from the DummyJSON API, lets users search the catalog with Redux-managed state, view product details, manage a shopping cart, and place a dummy order through checkout.

## Features

- Product catalog fetched from `https://dummyjson.com/products`
- Product detail page with dynamic route parameters
- Redux Toolkit cart state with selectors, quantity controls, and cart total
- Redux-based search filtering from the header
- React Router data-router setup with `createBrowserRouter`
- Lazy-loaded pages, components, and product images
- Responsive layout for desktop and mobile screens
- Checkout flow with order confirmation, cart reset, and automatic redirect
- 404 page with visible route error details

## Tech Stack

- React
- Vite
- React Router
- Redux Toolkit
- React Redux
- PropTypes
- CSS

## Project Structure

```text
src/
  app/
    store.js
  components/
  features/
    cart/
    products/
  hooks/
    useProducts.js
  pages/
  utils/
```

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## GitHub Repository

Add your published GitHub repository link here after pushing the project:

`https://github.com/<your-username>/shoppyglobe`

