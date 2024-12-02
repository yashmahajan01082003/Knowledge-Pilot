import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const[isLoading,setIsLoading]= useState(false)
  const[successMessage, setSuccessMessage]=useState(null)
  const[error,setErrorMessage]=useState(null)
  const[formData,setFormData]=useState({
    email: "",
    password : ""
  })
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}
 const handleSubmit=async(e)=>{
    e.preventDefault()

    if(isLoading){
        return
    }
    setIsLoading(true)

    try{
        const response = await axios.post("http://127.0.0.1:8000/api/login/", formData)
        setSuccessMessage("Login Successful !")
        setTimeout(() => {
            setSuccessMessage(null)
            
        }, 1200);
        localStorage.setItem("accessToken",response.data.tokens.access)
        localStorage.setItem("refreshToken",response.data.tokens.refresh)
        localStorage.setItem('newChatId', response.data.new_chat_id);  

        navigate('/');
        setTimeout(() => {
          window.location.reload();
        }, 0);
    }catch(error){
        if(error.response && error.response.data){
            Object.keys(error.response.data).forEach(field =>{
                const errorMessages = error.response.data[field];
                if(errorMessages && errorMessages.length > 0){
                    setErrorMessage(errorMessages[0])
                    setTimeout(() => {
                        setErrorMessage(null)
                        setFormData({
                          email: "",
                          password : ""
                        })
                    }, 2000);
                }
            })
        }
            

    }
    finally{
    setIsLoading(false)
    }


}

  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative z-10">
      <div className="text-3xl font-bold text-gray-800 mb-6">LOG IN</div>
      <form>
        <div className="mb-4">
          <input
            type="text"
            name='email'
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 focus:border-gray-700 outline-none py-2 transition-all duration-300"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name='password'
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 focus:border-gray-700 outline-none py-2 transition-all duration-300"
          />
        </div>
        <button
          disabled={isLoading} 
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-md transition-all duration-300 hover:bg-gray-300 focus:outline-none mt-1 mb-4"
        >
          GO
        </button>
        {error && <p className="mb-3 text-red-500 text-center">{error}</p>}
        {successMessage && <p className="mb-3 text-green-500 text-center">{successMessage}</p>}

        <a href="/" className="text-gray-500 block text-center hover:underline">Forgot your password?</a>
      </form>
    </div>
  );
};

export default Login;
