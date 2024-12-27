import React from "react"
import { Card } from "antd"
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import laptop from "../../images/dell-precision.avif"
import { Link } from "react-router-dom"
import AverageRating from "../../pages/AverageRating"
const {Meta} = Card
const ProductCard = ({ product }) => {
    const {title, description, slug, images, price} = product
  return (
    <>
    {AverageRating(product)}
    <Card
      className="pt-1"
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "contain"}}
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" /> <br /> View Product
        </Link>,
        <>
            <ShoppingCartOutlined
            className="text-danger"
            onClick={() => handleRemove(slug)}
            /> <br/> Add to Cart
        </>,
      ]}
    >
      <Meta title={`${title} - $${price}`} description={description} />
    </Card>
    </>
  );
};

export default ProductCard;
