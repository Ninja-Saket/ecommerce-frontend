import React from "react";
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
const OrderTable = ({ order }) => {
  return (
    <div className="table-responsive mt-2">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col" className="custom-tablehead">
              Title
            </th>
            <th scope="col" className="custom-tablehead">
              Price/Item (No Disc)
            </th>
            <th scope="col" className="custom-tablehead">
              Brand
            </th>
            <th scope="col" className="custom-tablehead">
              Color
            </th>
            <th scope="col" className="custom-tablehead">
              Count
            </th>
            <th scope="col" className="custom-tablehead">
              Shipping
            </th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td>
                <b>{p.product.title}</b>
              </td>
              <td>Rs. {p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>{p.color}</td>
              <td>{p.count}</td>
              <td>
                {p.product.shipping === "Yes" ? (
                  <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                  <CloseCircleOutlined style={{ color: "red" }} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
