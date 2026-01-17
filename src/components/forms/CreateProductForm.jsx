import React, { useState } from "react";
import { Select } from "antd";
const { Option } = Select;

const CreateProductForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  subCategoryOptions,
  showSubCategories,
  values,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    category,
    categories,
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
          <option>Please Select</option>
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
          <option>Please Select</option>
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
          <option>Please Select</option>
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
      {showSubCategories && (
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            value={subCategories}
            onChange={(value) => setValues({ ...values, subCategories: value })}
          >
            {subCategoryOptions.length &&
              subCategoryOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      
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
          Enter as: "key": "value", "key2": "value2"
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
    </form>
  );
};

export default CreateProductForm;
