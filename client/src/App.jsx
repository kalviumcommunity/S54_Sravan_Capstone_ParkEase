import { useState } from 'react'
import './App.css'
import AllRoutes from './routes/AllRoutes'
import Home from './components/Home'
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  const [count, setCount] = useState(0)

  return (

      <Home />

  )
}

export default App
