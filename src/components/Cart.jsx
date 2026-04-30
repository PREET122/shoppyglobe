import { Suspense, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
} from '../features/cart/cartSlice'
import { formatCurrency } from '../utils/currency'
import PageLoader from './PageLoader'

const CartItem = lazy(() => import('./CartItem'))

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const itemCount = useSelector(selectCartCount)
  const subtotal = useSelector(selectCartSubtotal)

  if (!items.length) {
    return (
      <section className="message-card">
        <p className="eyebrow">Cart</p>
        <h1>Your cart is empty.</h1>
        <p>Add a few products from the catalog to begin checkout.</p>
        <Link className="primary-button" to="/">
          Continue shopping
        </Link>
      </section>
    )
  }

  return (
    <section className="cart-layout">
      <div>
        <div className="section-heading">
          <p className="eyebrow">Cart</p>
          <h1>{itemCount} item(s) ready for checkout</h1>
        </div>

        <Suspense fallback={<PageLoader message="Loading cart items..." />}>
          <div className="cart-list">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrement={(id) => dispatch(incrementQuantity(id))}
                onDecrement={(id) => dispatch(decrementQuantity(id))}
                onRemove={(id) => dispatch(removeFromCart(id))}
              />
            ))}
          </div>
        </Suspense>
      </div>

      <aside className="summary-card">
        <p className="eyebrow">Summary</p>
        <h2>Estimated total</h2>
        <div className="summary-card__row">
          <span>Items</span>
          <strong>{itemCount}</strong>
        </div>
        <div className="summary-card__row">
          <span>Subtotal</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        <div className="summary-card__row">
          <span>Shipping</span>
          <strong>Free</strong>
        </div>
        <Link className="primary-button" to="/checkout">
          Proceed to Checkout
        </Link>
      </aside>
    </section>
  )
}

export default Cart
