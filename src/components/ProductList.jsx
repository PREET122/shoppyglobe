import { Suspense, lazy, useDeferredValue } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { selectSearchTerm } from '../features/products/productsSlice'
import { useProducts } from '../hooks/useProducts'
import PageLoader from './PageLoader'

const ProductItem = lazy(() => import('./ProductItem'))

function ProductList() {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)
  const deferredSearchTerm = useDeferredValue(searchTerm)
  const { products, isLoading, error, retry } = useProducts()

  const normalizedSearch = deferredSearchTerm.trim().toLowerCase()
  const filteredProducts = products.filter((product) => {
    const haystack = [
      product.title,
      product.brand,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalizedSearch)
  })

  if (isLoading) {
    return <PageLoader message="Fetching products from the API..." />
  }

  if (error) {
    return (
      <section className="message-card" role="alert">
        <p className="eyebrow">Fetch error</p>
        <h2>We could not load the catalog.</h2>
        <p>{error}</p>
        <button type="button" className="primary-button" onClick={retry}>
          Try Again
        </button>
      </section>
    )
  }

  if (!filteredProducts.length) {
    return (
      <section className="message-card">
        <p className="eyebrow">No results</p>
        <h2>No products match "{searchTerm}".</h2>
        <p>Try a different product name, brand, or category.</p>
      </section>
    )
  }

  return (
    <section className="catalog-section">
      <div className="catalog-section__header">
        <div>
          <p className="eyebrow">API powered collection</p>
          <h2>Browse {filteredProducts.length} ready-to-ship picks</h2>
        </div>
        <p>
          Search is driven by Redux state, so the header input filters this list
          instantly.
        </p>
      </div>

      <Suspense fallback={<PageLoader message="Loading product cards..." />}>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={(item) => dispatch(addToCart(item))}
            />
          ))}
        </div>
      </Suspense>
    </section>
  )
}

export default ProductList
