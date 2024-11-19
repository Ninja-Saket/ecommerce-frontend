import React, {useState} from 'react'
import {sendSignInLinkToEmail, GoogleAuthProvider} from 'firebase/auth'
import {toast} from 'react-toastify'
import {auth} from '../../firebase'

const Register = () => {
    const [email, setEmail] = useState("")
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