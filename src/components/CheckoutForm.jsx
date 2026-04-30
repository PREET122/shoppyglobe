import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  clearCart,
  selectCartItems,
  selectCartSubtotal,
} from '../features/cart/cartSlice'
import { formatCurrency } from '../utils/currency'

const initialFormData = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
}

function CheckoutForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartSubtotal)
  const [formData, setFormData] = useState(initialFormData)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (!orderPlaced) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      navigate('/')
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [navigate, orderPlaced])

  if (!items.length && !orderPlaced) {
    return (
      <section className="message-card">
        <p className="eyebrow">Checkout</p>
        <h1>Your cart is empty.</h1>
        <p>Add products before moving to checkout.</p>
        <Link className="primary-button" to="/">
          Browse products
        </Link>
      </section>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(clearCart())
    setOrderPlaced(true)
    setFormData(initialFormData)
  }

  return (
    <section className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="section-heading">
          <p className="eyebrow">Checkout</p>
          <h1>Complete your dummy order</h1>
        </div>

        {orderPlaced ? (
          <div className="success-banner" role="status" aria-live="polite">
            Order placed
          </div>
        ) : null}

        <label>
          Full name
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Street address
          <textarea
            name="address"
            rows="4"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <div className="checkout-form__row">
          <label>
            City
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Postal code
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" className="primary-button" disabled={orderPlaced}>
          Place Order
        </button>
      </form>

      <aside className="summary-card">
        <p className="eyebrow">Order summary</p>
        <h2>{items.length} unique product(s)</h2>
        <div className="checkout-summary">
          {items.map((item) => (
            <div className="summary-card__row" key={item.id}>
              <span>
                {item.title} x {item.quantity}
              </span>
              <strong>{formatCurrency(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-card__row">
          <span>Total</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
      </aside>
    </section>
  )
}

export default CheckoutForm
