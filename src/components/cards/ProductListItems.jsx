import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subCategories, shipping, color, brand, quantity, sold } = product;
  return (
    <ul className="list-group">
      <li
        className="list-group-item d-flex justify-content-between"
        style={{ border: "none" }}
      >
        <span>Price</span> <span>Rs. {price}</span>
      </li>
      {category && (
        <li
          className="list-group-item d-flex justify-content-between"
          style={{ border: "none" }}
        >
          <span>Category</span>{" "}
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
        </li>
      )}
      {subCategories && (
        <li className="list-group-item d-flex justify-content-between" style={{ border: "none" }}>
            SubCategories
            {
                subCategories.map((s)=> (
                    <Link key={s._id} to={`/subCategory/${s.slug}`}>{s.name}</Link>
                ))
            }
        </li>
      )}
      <li
        className="list-group-item d-flex justify-content-between"
        style={{ border: "none" }}
      >
        <span>Shipping</span> <span>{shipping}</span>
      </li>
      <li
        className="list-group-item d-flex justify-content-between"
        style={{ border: "none" }}
      >
        <span>Color</span> <span>{color}</span>
      </li>
      <li
        className="list-group-item d-flex justify-content-between"
        style={{ border: "none" }}
      >
        <span>Brand</span> <span>{brand}</span>
      </li>
      <li
        className="list-group-item d-flex justify-content-between"
        style={{ border: "none" }}
      >
        <span>Available</span> <span>{quantity}</span>
      </li>
      <li
        className="list-group-item d-flex justify-content-between"
        style={{ border: "none" }}
      >
        <span>Sold</span> <span>{sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
