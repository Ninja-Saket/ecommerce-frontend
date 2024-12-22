import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import laptop from "../../images/dell-precision.avif";
import ProductListItems from "./ProductListItems";
const { Meta } = Card;
const {TabPane} = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, description } = product;
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
          <Card cover={<img src={laptop} className="mb-3 card-image"/>}/>
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
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br /> Add to
              cart
            </>,
            <Link to="/">
              <HeartOutlined classID="text-info" /> <br /> Add to wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product}/>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
