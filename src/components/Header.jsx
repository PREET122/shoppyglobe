import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartCount } from '../features/cart/cartSlice'
import {
  clearSearchTerm,
  selectSearchTerm,
  setSearchTerm,
} from '../features/products/productsSlice'

function Header() {
  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartCount)
  const searchTerm = useSelector(selectSearchTerm)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" to="/">
          <span className="site-brand__badge">SG</span>
          <span>
            <strong>ShoppyGlobe</strong>
            <small>Daily deals for thoughtful shoppers</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>

        <label className="site-search" htmlFor="site-search">
          <span className="sr-only">Search products</span>
          <input
            id="site-search"
            name="site-search"
            type="search"
            value={searchTerm}
            placeholder="Search products, brands, or categories"
            onChange={(event) => dispatch(setSearchTerm(event.target.value))}
          />
          {searchTerm ? (
            <button
              type="button"
              className="ghost-button"
              onClick={() => dispatch(clearSearchTerm())}
            >
              Clear
            </button>
          ) : null}
        </label>

        <Link className="cart-badge" to="/cart" aria-label="Open shopping cart">
          <span className="cart-badge__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.17 14h9.96c.75 0 1.4-.41 1.73-1.03L22 7.5l-1.74-1-2.61 4.5H8.1L5.27 5H2v2h2l3.6 7.59-.97 1.76c-.16.28-.25.61-.25.95 0 1.1.9 2 2 2h12v-2H8.53l.64-1.16Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>{cartCount} items</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
