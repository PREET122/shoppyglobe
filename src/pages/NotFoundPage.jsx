import { Link, useLocation, useRouteError } from 'react-router-dom'

function NotFoundPage() {
  const location = useLocation()
  const error = useRouteError()
  const statusCode = error?.status || 404
  const statusMessage =
    error?.statusText || error?.message || 'The page you requested does not exist.'
  const errorDetails = error?.data
    ? typeof error.data === 'string'
      ? error.data
      : JSON.stringify(error.data)
    : 'No additional router data was provided.'

  return (
    <section className="not-found">
      <p className="eyebrow">Error {statusCode}</p>
      <h1>We lost this aisle.</h1>
      <p>{statusMessage}</p>
      <div className="not-found__meta">
        <span>Requested path: {location.pathname}</span>
        <span>Status code: {statusCode}</span>
        <span>Details: {errorDetails}</span>
        <span>Suggestion: return home or review your route.</span>
      </div>
      <Link className="primary-button" to="/">
        Back to home
      </Link>
    </section>
  )
}

export default NotFoundPage
