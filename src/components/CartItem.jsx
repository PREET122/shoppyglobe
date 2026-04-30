import PropTypes from 'prop-types'
import { formatCurrency } from '../utils/currency'
import LazyImage from './LazyImage'

function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <article className="cart-item">
      <LazyImage src={item.thumbnail} alt={item.title} className="cart-item__image" />

      <div className="cart-item__details">
        <div>
          <p className="eyebrow">{item.brand || item.category}</p>
          <h3>{item.title}</h3>
        </div>
        <p>{formatCurrency(item.price)} each</p>
      </div>

      <div className="cart-item__controls">
        <div className="quantity-stepper" aria-label={`Quantity controls for ${item.title}`}>
          <button
            type="button"
            aria-label={`Decrease quantity of ${item.title}`}
            onClick={() => onDecrement(item.id)}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            aria-label={`Increase quantity of ${item.title}`}
            onClick={() => onIncrement(item.id)}
          >
            +
          </button>
        </div>
        <strong>{formatCurrency(item.price * item.quantity)}</strong>
        <button
          type="button"
          className="ghost-button ghost-button--danger"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </article>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    brand: PropTypes.string,
    category: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default CartItem
