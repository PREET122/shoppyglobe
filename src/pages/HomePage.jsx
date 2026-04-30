import { Suspense, lazy } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectSearchTerm } from '../features/products/productsSlice'
import PageLoader from '../components/PageLoader'

const ProductList = lazy(() => import('../components/ProductList'))

function HomePage() {
  const searchTerm = useSelector(selectSearchTerm)

  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="hero-banner__content">
          <p className="eyebrow">ShoppyGlobe E-commerce</p>
          <h1>Discover clean tech, home upgrades, and everyday essentials.</h1>
          <p>
            This storefront fetches live products from DummyJSON, filters them
            through Redux search state, and keeps checkout simple for your
            assignment workflow.
          </p>
          <div className="hero-banner__actions">
            <Link className="primary-button" to="/checkout">
              Jump to Checkout
            </Link>
            <Link className="ghost-button" to="/cart">
              Review Cart
            </Link>
          </div>
        </div>

        <div className="hero-banner__panel">
          <p className="eyebrow">Live filter state</p>
          <h2>{searchTerm ? `Searching for "${searchTerm}"` : 'All products visible'}</h2>
          <p>
            Use the search box in the header to instantly narrow the catalog by
            title, brand, category, or description.
          </p>
        </div>
      </section>

      <Suspense fallback={<PageLoader message="Building the catalog..." />}>
        <ProductList />
      </Suspense>
    </div>
  )
}

export default HomePage
