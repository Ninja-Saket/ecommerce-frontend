import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {auth} from '../../firebase'
import { signInWithEmailLink, updatePassword } from 'firebase/auth'
import { } from 'firebase/auth'

const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(()=> {
        setEmail(window.localStorage.getItem("emailForRegistration"))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!email || !password){
            toast.error('Email and password are necessary fileds')
            return
        }
        if(password.length < 6){
            toast.error('Password must be atleast 6 characters long')
            return
        }
        try{
            const result = await signInWithEmailLink(auth, email, window.location.href)
            if(result.user.emailVerified){
                window.localStorage.removeItem("emailForRegistration")
                const user = auth.currentUser
                const updatedResult = await updatePassword(user, password);
                const idTokenResult = await user.getIdTokenResult();
                console.log( 'idTokenResult', idTokenResult)
                console.log('updatedResult', updatedResult)
                history.push('/')
            }
            console.log(result)
        }catch(err){
            console.log(err)
            toast.error(error.message)
        }
        
    }
    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input type='email' className='form-control' value={email} disabled/>
            <input type='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>
            <button type='submit' className='btn my-2'>Complete Registration</button>
            <br/>
        </form>
    )
    return (
        <div className='container p-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete