import React, { useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
const Signup = () => {
    const navigate=useNavigate();
    const [signupInfo,setSignupInfo]=useState({
        name:'',
        email:'',
        password:'',
    })

    const handleChange=(e)=>{
         const {name, value}=e.target;
         console.log(name, value)
         const copySignupInfo={...signupInfo};
         copySignupInfo[name]=value;
         setSignupInfo(copySignupInfo);
    }
    // console.log('loginInfo->', signupInfo);
    const handleSignup=async (e)=>{
        e.preventDefault();
        const {name, email, password}=signupInfo;
        if(!name || !email ||!password){
            return handleError('name, email, password is required')
        }
        try {
            const url=`https://mern1-api-one.vercel.app/auth/signup`;
            const response=await fetch(url,{
                method:"POST",  //method bta rhe hai ki post hai
                headers:{'content-type':'application/json'},  //data sending in json formate 
                body: JSON.stringify(signupInfo)  //converts the signup info object (which containe name,email,password) into a JSON string that can be transmitted to the server.
         } );
        //  const handleSignup = async () => {
        //     const response = await axios.post('http://localhost:8080/auth/signup', signupInfo);
        //     console.log(response.data);
        //   };
          
         const result=await response.json();
         const {success, message,error}=result;
         if(success){
            handleSuccess(message);
            setTimeout(()=>{navigate('/login')},1000);
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
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input onChange={handleChange} type='text' name='name' autoFocus placeholder='enter your name' value={signupInfo.name}/>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='text' name='email' placeholder='enter your email' value={signupInfo.email}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} type='text' name='password'  placeholder='enter your password' value={signupInfo.password}/>
                </div>
                <button type='submit'>SignUp</button>
                <span>Already have an account? <Link to='/login'>Login</Link></span>
            </form>
            <ToastContainer/>
    </div>
  )
}

export default Signup
