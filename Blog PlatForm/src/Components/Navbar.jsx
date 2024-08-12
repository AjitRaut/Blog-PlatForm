import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-lg font-bold">MyBlog</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/categories" className="hover:underline">Categories</Link>
        <Link to="/tags" className="hover:underline">Tags</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
