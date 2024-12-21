import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav.jsx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getCategories,
  createCategory,
  removeCategory,
} from "../../../apiCalls/category.js";
import { Link, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm.jsx";
import LocalSearch from "../../../components/forms/LocalSearch.jsx";
import {
  createSubCategory,
  removeSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory
} from "../../../apiCalls/subCategory.js";
import { useNavigate } from "react-router-dom";

const UpdateSubCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState('');
  const {slug} = useParams(); 
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.user.token);

  const loadCategories = async () => {
    try {
      const result = await getCategories();
      setCategories(result.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const loadSubCategory = async () => {
    try {
      const result = await getSubCategory(slug);
      setSubCategory(result.data.name);
      setCategory(result.data.parent);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await updateSubCategory(slug, subCategory, category, userToken);
      setLoading(false);
      setSubCategory("");
      toast.success(`Subcategory "${result.data.name}" is updated`);
      navigate('/admin/subCategory')
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading....</h4>
          ) : (
            <h4>Update Sub Category</h4>
          )}
          <div className="form-group mb-3">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select a category</option>
              {categories.length > 0 &&
                categories.map((c) => {
                  return (
                    <option key={c._id} value={c._id} selected={c._id === category}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={subCategory}
            setName={setSubCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
