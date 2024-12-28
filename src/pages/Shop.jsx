import React, {useState, useEffect, Children} from 'react'
import {getProducts, getProductsByFilters} from '../apiCalls/product'
import {getCategories} from '../apiCalls/category'
import {useSelector, useDispatch} from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import {Menu, Slider, Checkbox} from 'antd'
import {DollarOutlined, DownSquareOutlined} from '@ant-design/icons'


const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0,0])
    const [categories, setCategories] = useState([])
    const [menuItems, setMenuItems] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const dispatch = useDispatch()
    const search = useSelector((state)=> state.search)
    const {text} = search

    const handleCheck = async (e)=> {
        try{
            dispatch({type : 'SEARCH_QUERY',
                payload : {text : ''}
            })
            setPrice([0,0])
            const categoryIdsInState = [...categoryIds]
            const currentCategory = e.target.value
            const currentCategoryIndex = categoryIdsInState.indexOf(currentCategory)
            if(currentCategoryIndex === -1){
                categoryIdsInState.push(currentCategory)
            }else{
                categoryIdsInState.splice(currentCategoryIndex,1)
            }
            setCategoryIds(categoryIdsInState)
            await loadProductsByFilter({category : categoryIdsInState})
        }catch(err){
            console.log(err)
        }
    }

    const handleSlider = async (value)=> {
        dispatch({
            type : "SEARCH_QUERY",
            payload : {
                text : ""
            }
        })
        setCategoryIds([])
        setPrice(value)
    }

    const showCategories = () => {
        return categories.map((c) => (
            <Checkbox key={c._id} name='category' value={c._id} className='pb-2 pl-4 pr-4' onChange={handleCheck}
                checked={categoryIds.includes(c._id)}
            >{c.name}</Checkbox>
        ))
    }

    const loadProducts = async ()=> {
        try{
            setLoading(true)
            const result = await getProducts(12)
            setProducts(result.data)
            const categoryResult = await getCategories()
            console.log('Category result', categoryResult)
            setCategories(categoryResult.data)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

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

    // 1. Load default products
    useEffect(()=> {
        loadProducts()
    },[])

    // 2. Load products based on user search input
    useEffect(()=> {
        const delayedApiCall = setTimeout(()=> {
            loadProductsByFilter({query : text})
        }, 400)
        return ()=> clearTimeout(delayedApiCall)
    }, [text])

    // 3. Load products based on price range input
    useEffect(()=> {
        const timer = setTimeout(() => {
            if(price[0] == 0 && price[1] == 0){
                return;
            }
            loadProductsByFilter({ price });
        }, 1000)
        return () => clearTimeout(timer);
    }, [price])

    useEffect(()=> {
        const items = [
            {
                key : '1',
                label : 'Price',
                icon : <DollarOutlined/>,
                children : [
                    {
                        key : 'priceRange',
                        label : <Slider className='custom-slider' tooltip={{formatter : (value) => `$${value}`}} value={price} onChange={handleSlider} max="6999" range/>
                    }
                ]
            },
            {
                key : '2',
                label : 'Category',
                icon : <DownSquareOutlined/>,
                className: 'custom-category-item',
                children : [
                    {
                        key : 'categories',
                        label : <div className='custom-menu-categories '>{showCategories()}</div>
                    }
                ]
            }
        ]
        setMenuItems(items)
    }, [categories, price, categoryIds])

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className="col-md-3 pt-2">
                    <h4>Search/Filter</h4>
                    <Menu mode='inline'
                        defaultOpenKeys={['1']}
                        items={menuItems}
                        className='custom-menu'
                    />
                    
                </div>
                <div className="col-md-9 pt-2">
                    {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4>Products</h4>)}
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