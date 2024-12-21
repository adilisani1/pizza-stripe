import React from 'react'
import { navList } from '../constant/navList'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('access_token');
  const profilePicture = localStorage.getItem("profilePicture");

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('access_token');
      navigate('/'); 
    } else {
      navigate('/login');
    }
  };
 
  const goToProfile = () => {
    navigate('/profile');
  };
  return (
    <div className=' sticky top-0 z-50'>

    <header className='flex items-center w-full p-4'>
      <nav className='flex w-full items-center justify-between'>

        <Link to="/">
          <img className='h-20' src='/foodlogo.png' alt='Food Logo' />
        </Link>


          <div className='ml-auto flex items-center gap-10'>
            <ul className=' flex justify-center gap-10'>
              {navList.map((item, index) => (
                <li key={index}>
                  <Link to={item === "Pizzas" ? "/" : `/${item.toLowerCase()}`}
                    className='text-lg font-normal hover:text-red-500'>
                    {item  }
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              {isLoggedIn && profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={goToProfile}
                />
              ) : null}
              <button
                onClick={handleLoginLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </div>
        </div>
      </nav>
      </header>
    </div>

  )
}

export default Navbar
