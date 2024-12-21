import React, {useState, useEffect} from "react"
import AdminNav from "../../../components/nav/AdminNav"
import { useParams , useNavigate} from "react-router-dom"
import { getProduct, updateProduct } from "../../../apiCalls/product"
import UpdateProductForm from "../../../components/forms/UpdateProductForm"
import { getCategories, getCategorySubCategories } from "../../../apiCalls/category"
import FileUpload from "../../../components/forms/FileUpload"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subCategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
}

const UpdateProduct = ()=> {
    const [values, setValues] = useState(initialState)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [subCategoryOptions, setSubCategoryOptions] = useState([])
    const [subCategoriesId, setSubCategoriesId] = useState([])
    const userToken = useSelector(state => state.user.token)
    const {slug} = useParams()
    const navigate = useNavigate()

    const loadProduct = async ()=> {
      const result = await getProduct(slug)
      setValues((values) => ({...values, ...result.data}))
      const productSubCategories = await getCategorySubCategories(result.data.category._id)
      setSubCategoryOptions(productSubCategories.data)
      // preparea array of subCategories id to show in ant design Select
      let arr = result.data.subCategories.map((s) => s._id)
      setSubCategoriesId(arr)
    }

    const handleSubmit = async (e)=> {
      e.preventDefault()
      setLoading(true)
      const updatedValue = {...values, subCategories : subCategoriesId }
      setValues(updatedValue)
      try{
        const result = await updateProduct(slug, updatedValue, userToken);
        console.log(result)
        if(result.data && result.data.title){
          toast.success(`Product "${result.data.title}" is Updated`)
        }else{
          toast.error(`Product updated failed`)
        }
        setLoading(false)
        navigate('/admin/products')
      }catch(err){
        setLoading(false)
        if(err.response && err.response.status === 400){
          toast.error(err.response.data.err)
        }
      }
    }

    const handleChange = (e) => {
      setValues({...values, [e.target.name] : e.target.value})
    }

    const loadCategories = async () => {
      try{
        const result = await getCategories();
        setCategories(result.data)
      }catch(err){
        toast.error("Load categories failed in update product")
      }
    }

    const handleCategoryChange = async (e) => {
      e.preventDefault();
      setValues({ ...values, subCategories: [], category: e.target.value });
      try {
        const result = await getCategorySubCategories(e.target.value);
        setSubCategoryOptions(result.data);
        setSubCategoriesId([])
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data);
        }
      }
    };

    useEffect(()=> {
      loadProduct()
      loadCategories()
    }, [])
   

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            {loading ? (
              <h4 className="text-danger">Loading....</h4>
            ) : (
              <h4>Update Product</h4>
            )}
            <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
            <UpdateProductForm handleSubmit={handleSubmit} handleChange={handleChange} setValues={setValues} values={values} handleCategoryChange={handleCategoryChange} subCategoryOptions={subCategoryOptions} categories={categories} subCategoriesId={subCategoriesId} setSubCategoriesId={setSubCategoriesId} loadProduct={loadProduct}/>
          </div>
        </div>
      </div>
    )
}

export default UpdateProduct