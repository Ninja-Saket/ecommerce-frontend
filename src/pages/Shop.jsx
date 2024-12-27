import React, {useState, useEffect} from 'react'
import {getProducts, getProductsByFilters} from '../apiCalls/product'
import {useSelector, useDispatch} from 'react-redux'
import ProductCard from '../components/cards/ProductCard'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const search = useSelector((state)=> state.search)
    const {text} = search

    // Load default products
    const loadProducts = async ()=> {
        try{
            setLoading(true)
            const result = await getProducts(12)
            setProducts(result.data)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    // Load products based on user search input
    const loadProductsByFilter = async (args)=> {
        try{
            const result = await getProductsByFilters(args)
            if(result && result.data){
                setProducts(result.data)
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=> {
        const delayedApiCall = setTimeout(()=> {
            loadProductsByFilter({query : text})
        }, 400)
        return ()=> clearTimeout(delayedApiCall)
    }, [text])

    useEffect(()=> {
        loadProducts()
    },[])

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className="col-md-3">
                    Search/Filter Menu
                </div>
                <div className="col-md-9">
                    {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4 className='mt-3'>Products</h4>)}
                    {products.length < 1 && <p>No products found</p>}
                    <div className="row pb-5">
                        {products.map((p)=> (<div key={p._id} className='col-md-4 mt-3'>
                            <ProductCard product={p}/>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop