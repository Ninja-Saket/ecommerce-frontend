import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { getCategory, updateCategory } from "../../../apiCalls/category"
import { toast } from "react-toastify"
import AdminNav from "../../../components/nav/AdminNav.jsx"
import CategoryForm from "../../../components/forms/CategoryForm.jsx"

const CategoryUpdate = ()=> {
    const userToken = useSelector((state) => state.user.token)
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const {slug} = useParams()
    const navigate = useNavigate()

    const loadCategory = async ()=> {
        try{
            const result = await getCategory(slug);
            setName(result.data.name)
        }catch(err){
            if(err.response.status == 400){
                toast.error(err.response.data); 
            }
        }
    }

    useEffect(()=> {
        loadCategory()
    }, [])

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setLoading(true)
        try{
            const result = await updateCategory(slug, name, userToken)
            setLoading(false)
            toast.success(`Category ${result.data.name} updated successfully`)
            navigate('/admin/category')
        }catch(err){
            console.log(err)
            setLoading(false)
            if(err.response.status == 400){
                toast.error(`${err.response.data}`)
            }
        }
    }

    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <AdminNav />
            </div>
            <div className="col">
              {loading ? (<h4 className="text-danger">Loading....</h4>) : (<h4>Update Category</h4>)}
              <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
            </div>
          </div>
        </div>
      );
}

export default CategoryUpdate