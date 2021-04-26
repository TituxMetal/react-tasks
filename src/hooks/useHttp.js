import { useCallback, useState } from 'react'

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true)
    setError(null)

    try {
      if (!requestConfig.url) {
        throw new Error('Unable to send a request, an url is needed!')
      }

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || 'GET',
        headers: requestConfig.headers || {},
        body: JSON.stringify(requestConfig.body) || null
      })

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await response.json()

      applyData(data)
    } catch (err) {
      setError(err.message)
    }

    setIsLoading(false)
  }, [])

  return { error, isLoading, sendRequest }
}

export default useHttp
