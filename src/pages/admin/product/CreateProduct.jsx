import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct } from "../../../apiCalls/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CreateProductForm from "../../../components/forms/CreateProductForm";
import {
  getCategories,
  getCategorySubCategories,
} from "../../../apiCalls/category";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  categories: [],
  subCategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

const CreateProduct = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const userToken = useSelector((state) => state.user.token);

  const loadCategories = async () => {
    try {
      const result = await getCategories();
      setValues({ ...values, categories: result.data });
    } catch (err) {
      toast.error("Load Categories failed in create product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createProduct(values, userToken);
      setLoading(false);
      toast.success(`Product "${values.title}" created successfully`);
      setValues({...initialState, images: []});
      setShowSubCategories(false);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) {
        toast.error(err.response.data.err);
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    setValues({ ...values, subCategories: [], category: e.target.value });
    try {
      const result = await getCategorySubCategories(e.target.value);
      setSubCategoryOptions(result.data);
      setShowSubCategories(true);
    } catch (err) {
      setShowSubCategories(false);
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
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
            <h4>Create Product</h4>
          )}
          <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          <CreateProductForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCategoryChange={handleCategoryChange}
            values={values}
            subCategoryOptions={subCategoryOptions}
            showSubCategories={showSubCategories}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
