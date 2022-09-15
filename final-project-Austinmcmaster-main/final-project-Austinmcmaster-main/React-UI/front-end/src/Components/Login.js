import React from 'react'
import {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from "../context/AuthProvider"
import axios from '../api/axios' 
import Nav from './Nav'
const LOGIN_URL = '/auth/login';

const Login = ({handleLogin}) => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email,password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL, JSON.stringify({email,password}),
            {
              headers: { 'Content-Type' : 'application/json'} 
            })
            console.log(response?.data);
            const JWTAccessToken = response?.data?.token
            console.log(JWTAccessToken)
            //const roles = response?.data?.roles;
            setAuth({ email, password, JWTAccessToken});
            setEmail('');
            setPassword('');
            setSuccess(true);
            handleLogin(JWTAccessToken);
        }

        catch (err) {
            console.log(err);
            if(!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg("Login Failed!")
            }
            errRef.current.focus();
        }
    }

  return (
    <>
    <h1>Login Page</h1>
    <Nav/>
    {success ? (
            <section>
              <h1> You have sucessfully loggin in!</h1>
              <br />
              <p> <a href="/"> Go to home page!</a>
              </p>
          </section>
        ) : (
    <section>
        <p ref ={errRef} className = {errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">
            {errMsg}
        </p>
        <h1>Login</h1>
        <form onSubmit = {handleSubmit}>
            <label htmlFor='username'>Email:</label>
            <input 
                type = "text"
                id = "username"
                ref = {userRef}
                autoComplete = "off"
                onChange={(e) => setEmail(e.target.value)}
                value = {email}
                required
                />
            <label htmlFor='password'>Password:</label>
            <input 
                type = "password"
                id = "password"
                onChange={(e) => setPassword(e.target.value)}
                value = {password}
                required
                />
                <button>Sign In</button>
        </form>
        <p>
            Register for Account <br/>
            {/*put router link here*/}
            <a href = "/signup">Sign Up</a>
        </p>

    </section>
    )}
    </>
  )
}

export default Login