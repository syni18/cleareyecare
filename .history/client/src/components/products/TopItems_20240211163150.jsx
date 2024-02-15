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
    
  );
}

export default TopItems;
