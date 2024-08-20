import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Homepage from './Components/Homepage'
import PostForm from './Components/PostForm'
import PostLayout from './Components/PostLayout'
import AdminPanel from './Components/AdminPanel.jsx'
import AuthForm from './Components/AuthForm.jsx'
import HeroSection from './Components/HeroSection.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    
      {/* <AuthForm/>
      <Homepage/>
      <PostLayout/>
      <PostForm />
      <AdminPanel/> */}
    </>
  )
}

export default App
