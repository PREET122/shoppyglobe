import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import PageLoader from './components/PageLoader'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function withSuspense(children, message) {
  return (
    <Suspense fallback={<PageLoader message={message} />}>
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: withSuspense(
      <NotFoundPage />,
      'We could not find that route.',
    ),
    children: [
      {
        index: true,
        element: withSuspense(
          <HomePage />,
          'Loading the storefront...',
        ),
      },
      {
        path: 'products/:productId',
        element: withSuspense(
          <ProductDetailPage />,
          'Loading product details...',
        ),
      },
      {
        path: 'cart',
        element: withSuspense(<CartPage />, 'Loading your cart...'),
      },
      {
        path: 'checkout',
        element: withSuspense(<CheckoutPage />, 'Loading checkout...'),
      },
      {
        path: '*',
        element: withSuspense(
          <NotFoundPage />,
          'Looking for that page...',
        ),
      },
    ],
  },
])
