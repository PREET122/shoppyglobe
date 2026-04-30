import { Suspense, lazy } from 'react'
import PageLoader from '../components/PageLoader'

const Cart = lazy(() => import('../components/Cart'))

function CartPage() {
  return (
    <Suspense fallback={<PageLoader message="Preparing your cart..." />}>
      <Cart />
    </Suspense>
  )
}

export default CartPage
