import React from "react";
import './topitem.css';
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const TopItems = ({item}) => {
  const itemDetailsLink = {
    pathname: `/item/${item.id}`,
    state: { item: item },
  };

  return (
    // <div className="recommand-p-card">
    //   <div className="recommand-p-left">
    //     <Link to={itemDetailsLink} state={{ test: 'test' }}>
    //       <img src={item.thumbnail} alt={item.title} />
    //     </Link>
    //     <h5 className="recommand-p-title">{item.title}</h5>
    //     <div className="recommand-p-rating">
    //       <Star size={16} color="green" fill="green" />
    //       <small>{item.rating}</small>
    //     </div>
    //   </div>
    //   <div className="recommand-p-right">
    //     <span>Rs.{item.price}</span>
    //   </div>
    // </div>
  );
}

export default TopItems;
