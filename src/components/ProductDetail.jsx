import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addToCart } from '../features/cart/cartSlice'
import { formatCurrency } from '../utils/currency'
import { adaptProduct } from '../utils/productAdapter'
import LazyImage from './LazyImage'
import PageLoader from './PageLoader'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function ProductDetail() {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProduct() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Unable to load product ${productId} (${response.status})`)
        }

        const data = await response.json()
        setProduct(adaptProduct(data))
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to fetch this product right now.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()

    return () => controller.abort()
  }, [productId])

  if (isLoading) {
    return <PageLoader message="Fetching product details..." />
  }

  if (error || !product) {
    return (
      <section className="message-card" role="alert">
        <p className="eyebrow">Product details</p>
        <h1>We could not open this product.</h1>
        <p>{error || 'The selected item is unavailable.'}</p>
        <Link className="primary-button" to="/">
          Return to home
        </Link>
      </section>
    )
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <section className="detail-page">
      <div className="detail-page__media">
        <LazyImage
          src={product.thumbnail}
          alt={product.title}
          className="detail-page__hero-image"
        />
        <div className="detail-page__gallery">
          {(product.images || []).slice(0, 4).map((image, index) => (
            <LazyImage
              key={`${product.id}-${index}`}
              src={image}
              alt={`${product.title} preview ${index + 1}`}
              className="detail-page__thumb"
            />
          ))}
        </div>
      </div>

      <div className="detail-page__content">
        <p className="eyebrow">
          {product.brand || 'ShoppyGlobe'} | {product.category}
        </p>
        <h1>{product.title}</h1>
        <p className="detail-page__description">{product.description}</p>

        <div className="detail-page__pricing">
          <strong>{formatCurrency(discountedPrice)}</strong>
          <span>{formatCurrency(product.price)}</span>
          <small>{product.discountPercentage}% off</small>
        </div>

        <div className="detail-page__facts">
          <div>
            <span>Rating</span>
            <strong>{product.rating} / 5</strong>
          </div>
          <div>
            <span>Stock</span>
            <strong>{product.stock}</strong>
          </div>
          <div>
            <span>SKU</span>
            <strong>{product.sku || 'N/A'}</strong>
          </div>
        </div>

        <ul className="detail-page__bullets">
          <li>{product.shippingInformation || 'Fast delivery available.'}</li>
          <li>{product.returnPolicy || 'Standard return policy applies.'}</li>
          <li>
            Minimum order quantity: {product.minimumOrderQuantity || 1}
          </li>
        </ul>

        <div className="detail-page__actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
          <Link className="ghost-button" to="/cart">
            Go to Cart
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
