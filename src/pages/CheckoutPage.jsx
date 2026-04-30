import { Suspense, lazy } from 'react'
import PageLoader from '../components/PageLoader'

const CheckoutForm = lazy(() => import('../components/CheckoutForm'))

function CheckoutPage() {
  return (
    <Suspense fallback={<PageLoader message="Preparing checkout..." />}>
      <CheckoutForm />
    </Suspense>
  )
}

export default CheckoutPage
