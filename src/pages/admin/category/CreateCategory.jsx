import React, {useState, useEffect} from "react"
import AdminNav from "../../../components/nav/AdminNav.jsx"
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getCategories, createCategory, removeCategory} from '../../../apiCalls/category.js'
import { Link } from "react-router-dom"
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import CategoryForm from "../../../components/forms/CategoryForm.jsx"
import LocalSearch from "../../../components/forms/LocalSearch.jsx"

const CreateCategory = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [keyword, setKeyword] = useState("")
  const userToken = useSelector(state => state.user.token)

  const loadCategories = async () => {
    try{
      const result = await getCategories();
      setCategories(result.data)
    }catch(err){
      console.log(err)
      toast.error(err.response.data)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const result = await createCategory(name, userToken)
      setLoading(false)
      setName("")
      toast.success(`"${result.data.name}" is created`)
      loadCategories()
    }catch(err){
      console.log(err)
      setLoading(false)
      if(err.response && err.response.status === 400){
        toast.error(err.response.data)
      }
    }
  }

  const handleRemove = async (slug) => {
    if(window.confirm("Delete ? ")){
      setLoading(true)
      try{
        const result = await removeCategory(slug, userToken)
        setLoading(false)
        toast.success(`Category ${result.data.name} deleted Successfully`)
        loadCategories()
      }catch(err){
        if(err.response && err.response.status == 400){
          setLoading(false)
          toast.error(err.response.data)
        }
      }
    }
  }

  
  const searched = (keyword) => {
    return (c) => {
      return c.name.toLowerCase().includes(keyword.toLowerCase())
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (<h4 className="text-danger">Loading....</h4>) : (<h4>Create Category</h4>)}
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
          <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
          <hr />
          {categories.filter(searched(keyword)).map((c)=> 
            (<div key={c._id} className="alert alert-primary">
              {c.name}
              <span className="btn btn-sm float-end text-danger" onClick={() => handleRemove(c.slug)}>
                <DeleteOutlined/>
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-end text-warning">
                  <EditOutlined/>
                </span>
              </Link>
            </div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
