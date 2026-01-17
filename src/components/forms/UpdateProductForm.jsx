import React, { useState, useEffect } from "react";
import { Select } from "antd";
const { Option } = Select;

const UpdateProductForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  subCategoryOptions,
  values,
  setValues,
  categories,
  subCategoriesId,
  setSubCategoriesId,
  loadProduct
}) => {
  const {
    title,
    description,
    price,
    category,
    subCategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
    keySpecifications,
  } = values;

  const [specsInput, setSpecsInput] = useState("");
  const [isValidJson, setIsValidJson] = useState(true);

  // Initialize specsInput when keySpecifications changes (on product load)
  useEffect(() => {
    if (keySpecifications && Object.keys(keySpecifications).length > 0) {
      const formatted = Object.entries(keySpecifications)
        .map(([key, value]) => {
          // Handle nested objects/arrays by stringifying them
          const stringValue = typeof value === 'object' 
            ? JSON.stringify(value) 
            : `"${value}"`;
          return `"${key}": ${stringValue}`;
        })
        .join(", ");
      setSpecsInput(formatted);
    } else {
      setSpecsInput("");
    }
  }, [keySpecifications]);

  const handleSpecificationsChange = (e) => {
    const input = e.target.value;
    setSpecsInput(input);
    
    if (!input.trim()) {
      setIsValidJson(true);
      setValues({ ...values, keySpecifications: {} });
      return;
    }
    
    try {
      // Parse the JSON input
      const parsed = JSON.parse(`{${input}}`);
      setValues({ ...values, keySpecifications: parsed });
      setIsValidJson(true);
    } catch (err) {
      // Invalid JSON - show error but don't update keySpecifications
      setIsValidJson(false);
    }
  };

  const handleProductReset = async (e)=> {
    e.preventDefault()
    await loadProduct()
  } 
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-2">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-2">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-2">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-2">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
          value={shipping}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group mt-2">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-2">
        <label>Color</label>
        <select name="color" className="form-control" onChange={handleChange} value={color}>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-2">
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={handleChange} value={brand}>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mt-2 mb-3">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={typeof category === 'object' ? category._id : category}
        >
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

      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          value={subCategoriesId}
          onChange={(value) => setSubCategoriesId(value)}
        >
          {subCategoryOptions.length &&
            subCategoryOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <div className="form-group mt-3">
        <label>
          Key Specifications (JSON format)
          {specsInput && (
            <span className={`ms-2 ${isValidJson ? 'text-success' : 'text-danger'}`}>
              {isValidJson ? '✓ Valid' : '✗ Invalid JSON'}
            </span>
          )}
        </label>
        <small className="text-muted d-block mb-1">
          Enter as: "key": "value", "key2": "value2" (supports nested objects)
        </small>
        <textarea
          className={`form-control ${specsInput && !isValidJson ? 'border-danger' : ''}`}
          rows="4"
          placeholder='"RAM": "16GB", "Storage": "512GB SSD", "Processor": "Intel i7"'
          value={specsInput}
          onChange={handleSpecificationsChange}
        />
      </div>

      <button className="btn btn-outline-info mt-3">Save</button>
      <button className="btn btn-outline-info mt-3 mx-3" onClick={handleProductReset}>Reset Changes</button>
    </form>
  );
};

export default UpdateProductForm;
