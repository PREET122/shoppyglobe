import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/currency'
import LazyImage from './LazyImage'

function ProductItem({ product, onAddToCart }) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <article className="product-card">
      <Link className="product-card__visual" to={`/products/${product.id}`}>
        <LazyImage
          src={product.thumbnail}
          alt={product.title}
          className="product-card__image"
        />
        <span className="product-card__badge">{product.category}</span>
      </Link>

      <div className="product-card__content">
        <div>
          <p className="eyebrow">{product.brand || 'ShoppyGlobe Select'}</p>
          <h3>{product.title}</h3>
          <p className="product-card__description">{product.description}</p>
        </div>

        <div className="product-card__meta">
          <div>
            <strong>{formatCurrency(discountedPrice)}</strong>
            <span>{formatCurrency(product.price)}</span>
          </div>
          <p>Rated {product.rating} / 5</p>
        </div>

        <div className="product-card__actions">
          <Link className="ghost-button" to={`/products/${product.id}`}>
            View Details
          </Link>
          <button
            type="button"
            className="primary-button"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number,
    rating: PropTypes.number,
    brand: PropTypes.string,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductItem
