import { useState } from 'react'
import './App.css'
import AllRoutes from './routes/AllRoutes'
import LoginButton from './loginComponents/Login'
import LogoutButton from './loginComponents/Logout'
import Profile from './loginComponents/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AllRoutes />
      <LoginButton />
      <LogoutButton />
      <Profile />
    </>
  )
}

export default App
