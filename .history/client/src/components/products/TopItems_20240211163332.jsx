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
    <a key={item.id} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{item.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
    </a>
  );
}

export default TopItems;

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