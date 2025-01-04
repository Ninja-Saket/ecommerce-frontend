import React, {useState, useEffect} from "react"
import { useLocation, Navigate, useNavigate } from "react-router-dom"

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=> {
        const interval = setInterval(()=> {
            setCount((currentCount) => --currentCount)
        }, 1000)
        // Redirect to login once count is 0
        if (count === 0) {
            navigate("/login", { replace: true, state: { from: location } });
        }
        // Cleanup
        return ()=> clearInterval(interval)
    },[count])

    return (
        <div className="container p-5 text-center text-info">
            <p>Redirecting to Login in {count} seconds</p>
        </div>
    )
}

export default LoadingToRedirect