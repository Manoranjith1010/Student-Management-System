import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('checking')
  const [details, setDetails] = useState(null)
  const [error, setError] = useState('')

  const checkConnection = async () => {
    setStatus('checking')
    setError('')

    try {
      const response = await fetch('/api/health')

      if (!response.ok) {
        throw new Error(`Health check failed with status ${response.status}`)
      }

      const data = await response.json()
      setDetails(data)
      setStatus(data?.db?.state === 'connected' ? 'connected' : 'degraded')
    } catch (fetchError) {
      setDetails(null)
      setStatus('disconnected')
      setError(fetchError instanceof Error ? fetchError.message : 'Connection failed')
    }
  }

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void checkConnection()
    }, 0)

    return () => window.clearTimeout(timerId)
  }, [])

  const statusLabel = {
    checking: 'Checking connection',
    connected: 'Connected',
    degraded: 'Backend reachable',
    disconnected: 'Disconnected',
  }[status]

  return (
    <main className="app-shell">
      <section className="status-card">
        <div className="status-badge" data-status={status}>
          <span className="status-dot" />
          {statusLabel}
        </div>

        <h1>Student Management System</h1>
        <p className="lead">
          This screen checks whether the frontend can reach the backend health
          endpoint and whether the database connection is up.
        </p>

        <div className="status-grid">
          <article>
            <span className="label">API</span>
            <strong>{status === 'disconnected' ? 'Unavailable' : 'Reachable'}</strong>
          </article>
          <article>
            <span className="label">Database</span>
            <strong>{details?.db?.state ?? 'Unknown'}</strong>
          </article>
          <article>
            <span className="label">Last check</span>
            <strong>{details?.time ? new Date(details.time).toLocaleString() : 'Pending'}</strong>
          </article>
        </div>

        {error ? <p className="error">{error}</p> : null}

        <div className="actions">
          <button type="button" onClick={checkConnection}>
            Check again
          </button>
          <a href="/api/health" target="_blank" rel="noreferrer">
            Open health endpoint
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
