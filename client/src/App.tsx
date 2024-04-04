import './App.css'
import TweetsList from './components/TweetsList'
import Login from './components/Login'

function App() {
  return (
    <div className="app">
      <h1>twitter clone with react and rails</h1>
      <Login />
      <TweetsList />
    </div>
  )
}

export default App
