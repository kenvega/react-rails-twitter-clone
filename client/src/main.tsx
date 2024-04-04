// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> // for now i'm not going to use StrictMode because it is causing doble requests and my effects are not used incorrectly. refs: https://react.dev/learn/synchronizing-with-effects#fetching-data --- https://stackoverflow.com/a/72238236
    <App />
  // </React.StrictMode>,
)
