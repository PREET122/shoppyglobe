import { useState } from 'react'
import PropTypes from 'prop-types'

function LazyImage({ src, alt, className }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className={`image-fallback ${className || ''}`.trim()}>
        <span>{alt}</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}

LazyImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
}

LazyImage.defaultProps = {
  src: '',
  className: '',
}

export default LazyImage
