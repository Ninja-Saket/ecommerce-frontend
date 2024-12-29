import React, {useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import laptop from "../../images/dell-precision.avif";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import AverageRating from "../../pages/AverageRating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { _id, title, images, description } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();

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
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => {
                return <img src={i.url} key={i.public_id} />;
              })}
          </Carousel>
        ) : (
          <Card cover={<img src={laptop} className="mb-3 card-image" />} />
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on xyz xyz xyzx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {AverageRating(product)}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success" /> <br /> Add to
                Cart
              </a>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined classID="text-info" /> <br /> Add to wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
