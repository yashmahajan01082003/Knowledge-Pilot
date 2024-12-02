// src/components/Header.js
import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

const Header = () => {
  const[username,setUsername]=useState("")
  const[isLoggedIn,setLoggedIn]=useState(false)
  const navigate = useNavigate();


  useEffect(()=>{
    const checkLoggedInUser = async()=>{
      try{
        const token = localStorage.getItem("accessToken") || localStorage.getItem("adminAccessToken");
        if(token){
          const config = {
            headers: {
              "Authorization" : `Bearer ${token}`
            }
          }
          const response = await axios.get("http://127.0.0.1:8000/api/user/", config)
          setLoggedIn(true)
          setUsername(response.data.username)
        }else{
          setLoggedIn(false)
          setUsername("")
        }
      }catch (error){
        setLoggedIn(false)
        setUsername("")
      }
    }
    checkLoggedInUser()
  },[])


  const handleLogout = async ()=>{
    try {
        const refreshToken = localStorage.getItem("refreshToken") || localStorage.getItem("adminRefreshToken")
        const accessToken = localStorage.getItem("accessToken") ||  localStorage.getItem("adminAccessToken")

        if(refreshToken){
          await axios.post(
            "http://127.0.0.1:8000/api/logout/",
            {"refresh":refreshToken},
            {
              headers: {
                "Authorization" : `Bearer ${accessToken}`
              }
            }
          )
          localStorage.removeItem("accessToken");
          localStorage.removeItem("adminAccessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("adminRefreshToken");
          localStorage.removeItem("newChatId");
          
          setLoggedIn(false)
          setUsername("")
          navigate("/")
        }    
      
    } catch (error) {
      console.log("failed to logout !")
      }
  }
  return (
    <header className="bg-white bg-opacity-70 text-gray-800 py-4">
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
        <nav className="flex items-center">
          <FontAwesomeIcon icon={faGraduationCap} size="2x" className='mr-6' />
          <Link to="/" className="text-gray-600 hover:text-gray-800 mx-2">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-800 mx-2">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-800 mx-2">Contact</Link>
        </nav>
        <nav>

          {isLoggedIn ?(<span className="text-gray-600 hover:text-gray-800 mx-2"> <span className="px-4 py-1 bg-gray-100 mr-5 border border-gray-200 text-black rounded relative">
      <span className="hidden sm:inline text-black font-semibold">Welcome {username}!</span>
    </span><button className='text-gray-600 hover:text-gray-800 mx-2' onClick={handleLogout}>Logout</button>
          <Link to="/profile" className="text-gray-900 hover:text-gray-800 hover:bg-gray-200 py-2 px-2 "><FontAwesomeIcon icon={faUserLarge} className="mr-2" /></Link>
          </span>):(<><Link to="/login" className="text-gray-600 hover:text-gray-800 mx-2">Login</Link><Link to="/register" className="text-gray-600 hover:text-gray-800 mx-2">Register</Link></>)}
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
