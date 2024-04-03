import { useState } from 'react'
import './App.css'
import AllRoutes from './routes/AllRoutes'
import AddSpace from './components/AddSpace'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
