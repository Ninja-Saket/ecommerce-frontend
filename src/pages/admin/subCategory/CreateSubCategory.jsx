import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav.jsx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getCategories,
  createCategory,
  removeCategory,
} from "../../../apiCalls/category.js";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm.jsx";
import LocalSearch from "../../../components/forms/LocalSearch.jsx";
import {
  createSubCategory,
  removeSubCategory,
  getSubCategories,
} from "../../../apiCalls/subCategory.js";

const CreateSubCategory = () => {
  // Stores subcategory name
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  // Store Category Id
  const [category, setCategory] = useState("");
  // Store all subcategories
  const [subCategories, setSubCategories] = useState([]);
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

  const loadSubCategories = async () => {
    try {
      const result = await getSubCategories();
      setSubCategories(result.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createSubCategory(name, category, userToken);
      setLoading(false);
      setName("");
      toast.success(`SubCategory "${result.data.name}" created successfully`);
      loadSubCategories();
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete ? ")) {
      setLoading(true);
      try {
        const result = await removeSubCategory(slug, userToken);
        setLoading(false);
        toast.success(`SubCategory "${result.data.name}" deleted Successfully`);
        loadSubCategories();
      } catch (err) {
        if (err.response.status == 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      }
    }
  };

  const searched = (keyword) => {
    return (c) => {
      return c.name.toLowerCase().includes(keyword.toLowerCase());
    };
  };

  useEffect(() => {
    loadCategories();
    loadSubCategories();
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
            <h4>Create Sub Category</h4>
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
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr />
          {subCategories.filter(searched(keyword)).map((s) => (
            <div key={s._id} className="alert alert-primary">
              {s.name}
              <span
                className="btn btn-sm float-end text-danger"
                onClick={() => handleRemove(s.slug)}
              >
                <DeleteOutlined />
              </span>
              <Link to={`/admin/subCategory/${s.slug}`}>
                <span className="btn btn-sm float-end text-warning">
                  <EditOutlined />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateSubCategory;
