import React from 'react'
import { Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import laptop from '../../images/dell-precision.avif'

const SideDrawer = () => {
    const dispatch = useDispatch()
    const drawer = useSelector((state) => state.drawer)
    const cart = useSelector((state) => state.cart)

    const imageStyle = {
        width : '100%',
        height : 'auto',
        objectFit : 'cover'
    }
    const handleClose = ()=> {
        dispatch({
            type : "SET_VISIBLE",
            payload : false
        })
    }

    const handleGoToCart = ()=> {
        dispatch({
            type : "SET_VISIBLE",
            payload : false
        })
    }

    return <Drawer className='text-center' title={`Cart / ${cart.length} ${ cart.length > 1 ? 'Products' : 'Product'}`} open={drawer} onClose={handleClose}>
        {cart.map((p) => (
            <div key={p._id} className='row'>
                <div className='col'>
                    {p.images[0] ? (<>
                        <img src={p.images[0].url} style={imageStyle}/>
                        <p className='text-center bg-secondary text-light'>{p.title} x {p.count}</p>
                    </>) : (
                        <>
                        <img src={laptop} style={imageStyle}/>
                        <p className='text-center bg-secondary text-light'>{p.title} x {p.count}</p>
                        </>
                    )}
                </div>
            </div>
        ))}
        <Link to="/cart">
            <button onClick={handleGoToCart} className='text-center btn btn-info btn-block'>
                Go to cart
            </button>
        </Link>
    </Drawer>
}

export default SideDrawer
