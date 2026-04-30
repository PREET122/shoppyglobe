import { useEffect, useState } from 'react'

const PRODUCTS_API_URL = 'https://dummyjson.com/products'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(PRODUCTS_API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Unable to load products (${response.status})`)
        }

        const data = await response.json()
        setProducts(data.products ?? [])
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Something went wrong while loading.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()

    return () => controller.abort()
  }, [reloadKey])

  return {
    products,
    isLoading,
    error,
    // Toggling the key re-runs the fetching effect without duplicating logic.
    retry: () => setReloadKey((current) => current + 1),
  }
}
