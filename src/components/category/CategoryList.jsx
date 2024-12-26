import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import {getCategories} from '../../apiCalls/category'

const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const loadCategories = async()=> {
        try{
            setLoading(true)
            const result = await getCategories()
            setCategories(result.data)
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }
        
    }

    const showCategories = () => {
        return categories.map((c) => (<div key={c._id} className="col btn btn-outlined-primary btn-lg btn-block m-3 no-wrap-text" style={{whiteSpace : "nowrap"}}>
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
            </div>))
    }

    useEffect(()=> {
        loadCategories()
    }, [])

    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center">Loading...</h4>) : showCategories()}
            </div>
        </div>
    )

}

export default CategoryList