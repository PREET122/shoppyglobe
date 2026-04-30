import { Suspense, lazy } from 'react'
import PageLoader from '../components/PageLoader'

const ProductDetail = lazy(() => import('../components/ProductDetail'))

function ProductDetailPage() {
  return (
    <Suspense fallback={<PageLoader message="Opening product details..." />}>
      <ProductDetail />
    </Suspense>
  )
}

export default ProductDetailPage
