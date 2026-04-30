import { Suspense, lazy } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import './App.css'
import PageLoader from './components/PageLoader'

const Header = lazy(() => import('./components/Header'))

function App() {
  return (
    <div className="app-shell">
      <Suspense fallback={<div className="page-loader" />}>
        <Header />
      </Suspense>

      <main className="page-content">
        <Outlet />
      </main>

      <Suspense fallback={null}>
        <PageLoader message="Preparing the next page..." visuallyHidden />
      </Suspense>
      <ScrollRestoration />
    </div>
  )
}

export default App
