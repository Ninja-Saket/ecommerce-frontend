import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/dell-precision.avif";
import { Link } from "react-router-dom";
import AverageRating from "../../pages/AverageRating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
const { Meta } = Card;
const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();
  const { title, description, slug, images, price } = product;
  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (!!localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      const unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type : 'SET_VISIBLE',
        payload: true
      })
    }
  };

  return (
    <>
      {AverageRating(product)}
      <Card
        className="pt-1"
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "contain" }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to
              Cart
            </a>
          </Tooltip>,
        ]}
      >
        <Meta title={`${title} - $${price}`} description={description} />
      </Card>
    </>
  );
};

export default ProductCard;
