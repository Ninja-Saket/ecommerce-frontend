import React, {useState, useEffect} from 'react'
import {sendSignInLinkToEmail, GoogleAuthProvider} from 'firebase/auth'
import {toast} from 'react-toastify'
import {auth} from '../../firebase'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const {user} = useSelector((state)=> ({...state}))

    useEffect(()=> {
        if(user && user.token){
            navigate('/')
        }
    }, [user])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {
            url : import.meta.env.VITE_REGISTER_REDIRECT_URL,
            handleCodeInApp : true
        }
        console.log(config)
        await sendSignInLinkToEmail(auth, email, config);
        toast.success(`Email is sent to ${email}. Click the link to complete your registration.`)
        // Save user email in localStorage
        window.localStorage.setItem('emailForRegistration', email)
        // Clear the state
        setEmail('')
    }
    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input type='email' className='form-control' value={email} onChange={e => setEmail(e.target.value)} autoFocus placeholder='Your Email'/>
            <br/>
            <button type='submit' className='btn my-2'>Register</button>
        </form>
    )
    return (
        <div className='container p-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register