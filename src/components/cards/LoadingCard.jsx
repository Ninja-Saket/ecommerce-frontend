import React from "react";
import { Card, Skeleton } from "antd";
const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <div className="col-md-4" key={`loading-card-${i}`}>
          <Card>
            <Skeleton active />
          </Card>
        </div>
      );
    }
    return totalCards;
  };

  return <div className="row gx-3">{cards()}</div>;
};

export default LoadingCard;
