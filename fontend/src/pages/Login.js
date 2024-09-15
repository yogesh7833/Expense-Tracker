import React, { useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
const Login = () => {
    const navigate=useNavigate();
    const [loginInfo,setLoginInfo]=useState({
        email:'',
        password:'',
    })

    const handleChange=(e)=>{
         const {name, value}=e.target;
         console.log(name, value)
         const copyLoginInfo={...loginInfo};
         copyLoginInfo[name]=value;
         setLoginInfo(copyLoginInfo);
    }
    // console.log('loginInfo->', signupInfo);
    const handleLogin=async (e)=>{
        e.preventDefault();
        const {email, password}=loginInfo;
        if( !email ||!password){
            return handleError('email, password is required')
        }
        try {
            const url=`https://mern1-api-one.vercel.app/auth/login`
            const response=await fetch(url,{
                method:"POST",  //method bta rhe hai ki post hai
                headers:{'content-type':'application/json'},  //data sending in json formate 
                body: JSON.stringify(loginInfo)  //converts the signup info object (which containe name,email,password) into a JSON string that can be transmitted to the server.
         } );
        //  const handleLogin = async () => {
        //     const response = await axios.post('http://localhost:8080/auth/login', loginInfo);
        //     console.log(response.data);
        //   };
          
         const result=await response.json();
         const {success, message,jwtToken,name,error}=result;
         if(success){
            handleSuccess(message);
            localStorage.setItem('token',jwtToken);
            localStorage.setItem('loggedInUser',name);
            setTimeout(()=>{navigate('/home')},1000);
         }else if(error){
            const details=error?.details[0].message;
            handleError(details);
         }else if(!success){  //for backend catch called internal server error
            handleError(message);
         }
            console.log(result);

        } catch (error) {
            handleError(error);
        }
    }
  return (
    <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='text' name='email' placeholder='enter your email' value={loginInfo.email}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} type='text' name='password'  placeholder='enter your password' value={loginInfo.password}/>
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account? <Link to='/signup'>SignUp</Link></span>
            </form>
            <ToastContainer/>
    </div>
  )
}

export default Login
