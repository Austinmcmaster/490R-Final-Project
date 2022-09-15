import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import Nav from "./Nav";


const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,40}$/; 
const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = '/auth/signup';
const Signup = () => {
    const emailRef = useRef()
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validpassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);


    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])


    useEffect(() => {
        const result = Password_REGEX.test(password)
        console.log(result);
        console.log(password);
        setValidPassword(result)
        const match = password === matchPassword
        setValidMatch(match)
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('')
    }, [email, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = Password_REGEX.test(password);
        if(!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(SIGNUP_URL, JSON.stringify({email,password}),
            {
                headers: { 'Content-Type': 'application/json'}
            });
            console.log(response.data);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setEmail('')
            setPassword('')
        }
        catch(err) {
            if(!err?.response) {
                setErrMsg("No Server Respons");
            }
            else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            }
            else {
                setErrMsg("Registration Failed")
            }
            errRef.current.focus();
        }
    }


  return (
    <>
    <h1>Sign up Page</h1>
    <Nav />
    {success ? (
        <section>
            <h1>Sucessful Sign up!</h1>
            <p>
                <a href="/login">Login</a>
            </p>
        </section>
    ) : (
    <section>
        <p ref = {errRef} className = {errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">
            {errMsg}
        </p>
        <h1>Sign Up</h1>
                    <form onSubmit = {handleSubmit}>
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby= "emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id= "emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 40 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: 
                            <span aria-label="exclamation mark">!</span> 
                            <span aria-label="at symbol">@</span> 
                            <span aria-label="hashtag">#</span> 
                            <span aria-label="dollar sign">$</span>
                            <span aria-label="percent">%</span>
                        </p>
            
            
            
            
            <label htmlFor ="password">
                Password:
                <span className= {validpassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon = {faCheck} />
                </span>
                <span className = {validpassword || !password ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon = {faTimes} />
                </span>
            </label>
                <input 
                    type = "password"
                    id = "password"
                    onChange = {(e) => setPassword(e.target.value)}
                    required
                    aria-invalid = {validpassword ? "false" : "true"}
                    aria-describedby = "passwordnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur = {() => setPasswordFocus(false)}
                    />
                <p id = "passwordnote" className= {passwordFocus && ! validpassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon = {faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: 
                    <span aria-label="exclamation mark">!</span> 
                    <span aria-label="at symbol">@</span> 
                    <span aria-label="hashtag">#</span> 
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>

            <label htmlFor ="confirm_password">
                Confirm Password:
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
            </label>
                <input 
                    type = "password"
                    id = "confirm_password"
                    onChange = {(e) => setMatchPassword(e.target.value)}
                    required
                    aria-invalid = {validMatch ? "false" : "true"}
                    aria-describedby = "confpass"
                    onFocus={() => setMatchFocus(true)}
                    onBlur = {() => setMatchFocus(false)}
                    />
                <p id="confpass" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                </p>
            <button disabled = {!validEmail || !validpassword || !validMatch ? true : false}>
                Sign Up
            </button>
        </form>
        <p>
            Already Signed up? <br />
            {/*put router link here*/}
            <a href="/login">Login</a>
        </p>
    </section>
    )}
    </>
  )
}

export default Signup