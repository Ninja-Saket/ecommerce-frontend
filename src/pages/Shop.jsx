import React, {useState, useEffect, Children} from 'react'
import {getProducts, getProductsByFilters, getProductsBySemanticSearch} from '../apiCalls/product'
import {getCategories} from '../apiCalls/category'
import {getSubCategories} from '../apiCalls/subCategory'
import {useSelector, useDispatch} from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import {Menu, Slider, Checkbox, Radio, Button} from 'antd'
import {DollarOutlined, DownSquareOutlined, StarOutlined, CheckCircleOutlined, BorderOuterOutlined, BorderInnerOutlined} from '@ant-design/icons'
import Star from '../components/forms/Star'
import ChatAssistant from '../components/chat/ChatAssistant'


const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0,0])
    const [categories, setCategories] = useState([])
    const [menuItems, setMenuItems] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [subCategoryId, setSubCategoryId] = useState('')
    const [stars, setStars] = useState('')
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "Asus", "Dell"])
    const [selectedBrand, setSelectedBrand] = useState('')
    const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"])
    const [selectedColor, setSelectedColor] = useState('')
    const [shipping, setShipping] = useState('')

    const dispatch = useDispatch()
    const search = useSelector((state)=> state.search)
    const {text} = search

    const handleEmptyFilter = async ()=> {
        if(price[0] == 0 && price[1] == 0 && text == '' && categoryIds.length == 0 && subCategoryId == '' && stars == '' && selectedBrand == '' && selectedColor == ''){
            await loadProductsByFilter()
        }
    }

    const handleBrand = async (e)=> {
        e.preventDefault()
        try{
            setSelectedColor('')
            setSubCategoryId('')
            dispatch({type : 'SEARCH_QUERY',
                payload : {text : ''}
            })
            setPrice([0,0])
            setCategoryIds([])
            setStars('')
            setShipping('')
            setSelectedBrand(e.target.value)
            await loadProductsByFilter({brand : e.target.value})
        }catch(err){
            console.log(err)
        }
    }

    const showBrands = ()=> {
        return brands.map((b,i) => <Radio key={i} value={b} name={b} checked={b === selectedBrand} onChange={handleBrand}>{b}</Radio>)
    }

    const resetBrand = ()=> {
        setSelectedBrand('')
    }

    const handleColor = async (e) => {
        e.preventDefault()
        try{
            console.log('color :', e.target.value)
            setSelectedBrand('')
            setSubCategoryId('')
            dispatch({type : 'SEARCH_QUERY',
                payload : {text : ''}
            })
            setPrice([0,0])
            setCategoryIds([])
            setStars('')
            setShipping('')
            setSelectedColor(e.target.value)
            await loadProductsByFilter({color : e.target.value})
        }catch(err){
            console.log(err)
        }
    }

    const showColors = () => {
        return colors.map((c,i) => (<Radio key={i} value={c} name={c} checked={c === selectedColor} onChange={handleColor}>{c}</Radio>))
    }

    const resetColor = () => {
        setSelectedColor('')
    }

    const handleShipping = async (e) => {
        e.preventDefault();
        try{
            setSelectedBrand('')
            setSubCategoryId('')
            dispatch({type : 'SEARCH_QUERY',
                payload : {text : ''}
            })
            setPrice([0,0])
            setCategoryIds([])
            setStars('')
            setSelectedColor('')
            setShipping((prev) => {
                if(prev == "Yes" && e.target.value == "Yes"){
                    return ""
                }
                if(prev == "No" && e.target.value == "No"){
                    return ""
                }
                return e.target.value
            })
        }catch(err){
            console.log(err)
        }
    }

    const showShipping = ()=> {
        return <>
            <Checkbox 
                onChange={handleShipping}
                value="Yes"
                checked={shipping === "Yes"}
            >
                Yes
            </Checkbox>
            <Checkbox
                onChange={handleShipping}
                value="No"
                checked={shipping === "No"}
            >
                No
            </Checkbox>
        </>
    }

    const handleStarClick = async (num)=> {
        try{
            console.log('Clicked star :--> ', num)
            dispatch({type : 'SEARCH_QUERY',
                payload : {text : ''}
            })
            setPrice([0,0])
            setCategoryIds([])
            setSubCategoryId('')
            setSelectedBrand('')
            setSelectedColor('')
            setShipping('')
            setStars(num)
            await loadProductsByFilter({stars : num})
        }catch(err){
            console.log(err)
        }
    }

    const showStars = ()=> {
       return (<div>
            <Star
                starClick={handleStarClick}
                numberOfStars={5}
            />
            <Star
                starClick={handleStarClick}
                numberOfStars={4}
            />
            <Star
                starClick={handleStarClick}
                numberOfStars={3}
            />
            <Star
                starClick={handleStarClick}
                numberOfStars={2}
            />
            <Star
                starClick={handleStarClick}
                numberOfStars={1}
            />
        </div>)
    }

    const showSubCategories = ()=> {
        return subCategories.map((s) => <div key={s._id} onClick={()=>handleSubCategory(s)} className='p-1 m-1 badge badge-secondary' style={{cursor : 'pointer', fontWeight: 300}}>{s.name}</div>)
    }

    const resetSubCategory = ()=> {
        setSubCategoryId('')
    }

    const handleSubCategory = async (s)=> {
        try{
            setSubCategoryId(s._id)
            dispatch({type : 'SEARCH_QUERY',
                payload : {text : ''}
            })
            setPrice([0,0])
            setCategoryIds([])
            setStars('')
            setSelectedBrand('')
            setSelectedColor('')
            setShipping('')
            await loadProductsByFilter({subCategory : s._id})
        }catch(err){
            console.log(err)
        }
    }


    const handleCheck = async (e)=> {
        try{
            dispatch({type : 'SEARCH_QUERY',
                payload : {text : ''}
            })
            setPrice([0,0])
            setStars('')
            setSubCategoryId('')
            setSelectedBrand('')
            setSelectedColor('')
            setShipping('')
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
        setStars('')
        setSubCategoryId('')
        setSelectedBrand('')
        setSelectedColor('')
        setShipping('')
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
            const subCategoryResult = await getSubCategories()
            console.log('Sub category result', subCategoryResult)
            setSubCategories(subCategoryResult.data)
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

    const loadProductsBySemanticSearch = async (args)=> {
        try{
            const result = await getProductsBySemanticSearch(args)
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
        setSubCategoryId('')
        setSelectedColor('')
        setSelectedBrand('')
        setCategoryIds([])
        setPrice([0,0])
        setStars('')
        setShipping('')
        const delayedApiCall = setTimeout(()=> {
            loadProductsBySemanticSearch({query : text})
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

    // Keep Sidebar Updated with all contents
    useEffect(()=> {
        const items = [
            {
                key : '1',
                label : 'Price',
                icon : <DollarOutlined/>,
                children : [
                    {
                        key : 'priceRange',
                        label : <Slider className='custom-slider' tooltip={{formatter : (value) => `Rs. ${value}`}} value={price} onChange={handleSlider} max="500000" range/>
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
            },
            {
                key : '3',
                label : 'Rating',
                icon : <StarOutlined/>,
                className : 'custom-star-item',
                children : [
                    {
                        key : 'rating',
                        label : showStars()
                    }
                ]
            },
            {
                key : '4',
                label : 'Sub Category',
                icon : <DownSquareOutlined/>,
                className : 'custom-subcategory-item',
                children : [
                    {
                        key : 'subcategory',
                        label : <>{showSubCategories()} <Button onClick={resetSubCategory}>Reset</Button></>
                    }
                ]
            },
            {
                key : '5',
                label : 'Brand',
                icon : <CheckCircleOutlined/>,
                className : 'custom-brand-item',
                children : [
                    {
                        key : 'brand',
                        label : <>{showBrands()} <Button onClick={resetBrand} style={{width: '100px'}}>Reset</Button></>
                    }
                ]
            },
            {
                key : '6',
                label : 'Color',
                icon : <BorderOuterOutlined/>,
                className : 'custom-brand-item',
                children : [
                    {
                        key : 'color',
                        label : <>{showColors()} <Button onClick={resetColor} style={{width: '100px'}}>Reset</Button></>
                    }
                ]
            },
            {
                key : '7',
                label : 'Shipping',
                icon : <BorderInnerOutlined/>,
                className: 'custom-shipping-menu',
                children : [
                    {
                        key : 'shipping',
                        label : showShipping()
                    }
                ]
            }
        ]
        setMenuItems(items)
    }, [categories, price, categoryIds, subCategories, selectedBrand, selectedColor, shipping])

    useEffect(()=> {
        handleEmptyFilter()
    }, [price, categoryIds, stars, text, subCategoryId, selectedBrand, selectedColor, shipping])

    // Since its a checkbox, when yes is clicked 2 times shipping should be empty (shipping state depends on previous state)
    useEffect(() => {
        if (shipping !== "") {
            loadProductsByFilter({shipping})
        }
    }, [shipping]);
    return (
        <div className="container-fluid">
            <div className='row'>
                <div className="col-md-3 pt-2">
                    <h4>Search/Filter</h4>
                    <Menu mode='inline'
                        defaultOpenKeys={['1','2','3','4','5','6','7']}
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
            
            {/* AI Shopping Assistant */}
            <ChatAssistant />
        </div>
    )
}

export default Shop