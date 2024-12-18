import React from "react";
import { Card } from "antd";
import laptop from '../../images/dell-precision.avif'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "contain" }}
        />
      }
      actions={[
        <EditOutlined className="text-warning"/>, <DeleteOutlined className="text-danger"/>
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;