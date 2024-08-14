import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Homepage from './Components/Homepage'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Homepage/>
    </>
  )
}

export default App
