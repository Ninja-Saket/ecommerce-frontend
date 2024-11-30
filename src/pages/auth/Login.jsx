import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import {Button} from 'antd'
import {MailOutlined, GoogleOutlined} from "@ant-design/icons";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {auth, googleAuthProvider} from '../../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../apiCalls/auth';

const Login = ({}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => ({...state}))
    useEffect(() => {
        if(user && user.token){
            navigate('/')
        }
    }, [user])
    
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try{
            const result = await signInWithEmailAndPassword(auth,email, password)
            const {user} = result
            console.log('user',user)
            const idTokenResult = await user.getIdTokenResult()
            console.log('Idtoken Result ', idTokenResult)

            const result1 = await createOrUpdateUser(idTokenResult.token)
            if(result1){
                console.log("Create or Update Res", result1)
                dispatch({
                    type : 'LOGGED_IN_USER',
                    payload : {
                        name : result1.data.name,
                        email : result1.data.email,
                        token : idTokenResult.token,
                        role : result1.data.role,
                        _id : result1.data._id
                    }
                })
            }
            navigate('/')
        }catch(err){
            setLoading(false)
            console.log(err)
            toast.error(err.message)
        }  
    }

    const googleLogin = async(e)=> {
        try{
            const result = await signInWithPopup(auth, googleAuthProvider)
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult()
            const result1 = await createOrUpdateUser(idTokenResult.token)
            if(result1){
                console.log("Create or Update Res in google login", result1)
                dispatch({
                    type : 'LOGGED_IN_USER',
                    payload : {
                        name : result1.data.name,
                        email : result1.data.email,
                        token : idTokenResult.token,
                        role : result1.data.role,
                        _id : result1.data._id
                    }
                })
            }
            navigate('/')
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }

    const loginForm = () => (
        <form>
            <div className="form-group mb-2">
                <input type='email' className='form-control' value={email} onChange={e => setEmail(e.target.value)} autoFocus placeholder='Your Email'/>    
            </div>
            <div className="form-group mb-2">
                <input type='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>
            </div>
            <Button
                onClick={handleSubmit}
                type='primary'
                className='mb-3'
                block
                shape='round'
                size='large'
                icon={<MailOutlined/>}
                disabled={!email || password.length < 6}
            >
                Login with Email/Password
            </Button>
            <Button
                onClick={googleLogin}
                type='primary'
                danger
                className='mb-3'
                block
                shape='round'
                size='large'
                icon={<GoogleOutlined/>}
            >
                Login with Google
            </Button>
            <Link to='/forgot/password' className='float-end text-danger'>Forgot Password</Link>
        </form>
    )
    return (
        <div className='container p-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4>Login</h4>)}
                    {loginForm()}
                </div>
            </div>
        </div>
    )
}

export default Login