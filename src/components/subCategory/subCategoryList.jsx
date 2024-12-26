import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import {getSubCategories} from "../../apiCalls/subCategory"

const SubCategoryList = () => {
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const loadSubCategories = async()=> {
        try{
            setLoading(true)
            const result = await getSubCategories()
            setSubCategories(result.data)
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }
        
    }

    const showSubCategories = () => {
        return subCategories.map((c) => (<div key={c._id} className="col btn btn-outlined-primary btn-lg btn-block m-3 no-wrap-text" style={{whiteSpace : "nowrap"}}>
            <Link to={`/subCategory/${c.slug}`}>{c.name}</Link>
            </div>))
    }

    useEffect(()=> {
        loadSubCategories()
    }, [])

    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center">Loading...</h4>) : showSubCategories()}
            </div>
        </div>
    )

}

export default SubCategoryList