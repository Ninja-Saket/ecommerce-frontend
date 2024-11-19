import React, {useState, useEffect} from "react"
import { auth } from "../../firebase"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { sendPasswordResetEmail } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const {user} = useSelector((state) => ({...state}))
    const navigate = useNavigate()

    useEffect(() => {
        if(user && user.token){
            navigate('/')
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url : import.meta.env.VITE_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp : true
        }
        try{
            const result = await sendPasswordResetEmail(auth, email, config)
            setEmail('')
            setLoading(false)
            toast.success('Check your email for password reset link')
        }catch(err){
            setLoading(false)
            console.log('Error in forgot password',err)
            toast.error(err.message)
        }
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (<h4>Loading...</h4>) : (<h4>Fogot Password</h4>)}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="Type your email"
                    autoFocus
                />
                <br/>
                <button className="btn" disabled={!email}>Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword