import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Homepage from './Components/Homepage'
import PostForm from './Components/PostForm'
import PostLayout from './Components/PostLayout'
import AdminPanel from './Components/AdminPanel.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Homepage/>
      <PostLayout/>
      <PostForm />
      <AdminPanel/>
    </>
  )
}

export default App
