import PropTypes from 'prop-types'

function PageLoader({ message, visuallyHidden = false }) {
  if (visuallyHidden) {
    return <span className="sr-only">{message}</span>
  }

  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__ring" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

PageLoader.propTypes = {
  message: PropTypes.string,
  visuallyHidden: PropTypes.bool,
}

PageLoader.defaultProps = {
  message: 'Loading...',
  visuallyHidden: false,
}

export default PageLoader
