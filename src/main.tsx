import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

function BootReady() {
  useEffect(() => {
    document.getElementById('boot-status')?.remove()
  }, [])
  return null
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <BootReady />
      <App />
    </HashRouter>
  </React.StrictMode>,
)
