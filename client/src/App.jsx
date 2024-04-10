import { useState } from 'react'
import './App.css'
import AllRoutes from './routes/AllRoutes'
import AddSpace from './components/AddSpace'
import Home from './components/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home />
    </>
  )
}

export default App
