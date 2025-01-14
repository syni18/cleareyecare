import React, { useState } from "react";
import "./orders.css";
import { Search, Star } from "lucide-react";
import img2 from "../../assets/img2.png";
import EmptyOrders from "../empty/EmptyOrders";
import { Link } from "react-router-dom";
function Orders() {
  const initialOrders = [
    {
      id: 1,
      name: "MOTOROLA Edge 40 (Eclipse Black, 256 GB)",
      color: "Black",
      price: "$2500",
      status: "Delivered",
    },
    {
      id: 2,
      name: "Some other product",
      color: "Blue",
      price: "$200",
      status: "On the way",
    },
    // Add more orders as needed
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [statusFilters, setStatusFilters] = useState([]);
  const [timeFilters, setTimeFilters] = useState([]);

  const handleStatusChange = (e) => {
    const { checked, value } = e.target;
    setStatusFilters((prev) =>
      checked ? [...prev, value] : prev.filter((status) => status !== value)
    );
  };

  const handleTimeChange = (e) => {
    const { checked, value } = e.target;
    setTimeFilters((prev) =>
      checked ? [...prev, value] : prev.filter((time) => time !== value)
    );
  };

  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      statusFilters.length === 0 || statusFilters.includes(order.status);
    const timeMatch =
      timeFilters.length === 0 || timeFilters.includes(order.orderTime);
    return statusMatch && timeMatch;
  });

  return (
    <div className="orders-search-wrapper">
      <div className="orders-search-container">
        <div className="orders-head">
          <label htmlFor="">My Orders</label>
        </div>
        <div className="orders-search-dashboad">
          <div className="orders-details-filter">
            <div className="orders-filter-status">
              <label htmlFor="">Order Status</label>
              <ul className="status-list">
                <li>
                  <input
                    type="checkbox"
                    name="status"
                    id="_status-onway"
                    value="On the way"
                    onChange={handleStatusChange}
                  />
                  <span>On the way</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="status"
                    id="_status-delivered"
                    value="Delivered"
                    onChange={handleStatusChange}
                  />
                  <span>Delivered</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="status"
                    id="_status-cancelled"
                    value="Cancelled"
                    onChange={handleStatusChange}
                  />
                  <span>Cancelled</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="status"
                    id="_status-returned"
                    value="Returned"
                    onChange={handleStatusChange}
                  />
                  <span>Returned</span>
                </li>
              </ul>
            </div>
            <div className="orders-filter-status">
              <label htmlFor="">Order Time</label>
              <ul className="status-list">
                <li>
                  <input
                    type="checkbox"
                    name="status"
                    id="_status-onway"
                    value="Last 30 days"
                    onChange={handleTimeChange}
                  />
                  <span>Last 30 days</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="status"
                    id="_status-delivered"
                    value="2023"
                    onChange={handleTimeChange}
                  />
                  <span>2023</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="status"
                    id="_status-cancelled"
                    value="2022"
                    onChange={handleTimeChange}
                  />
                  <span>2022</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="status"
                    id="_status-returned"
                    value="2021"
                    onChange={handleTimeChange}
                  />
                  <span>2021</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="status"
                    id="_status-returned"
                    value="Older"
                    onChange={handleTimeChange}
                  />
                  <span>Older</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="orders-search-right">
            <div className="search-right-top">
              <input
                type="search"
                name="order-search"
                id="_order-search"
                placeholder="search your orders here"
              />
              <button type="button" className="search-orderbtn">
                <Search size={18} className="search-order-icon" />
                search orders
              </button>
            </div>
            <div className="search-right-bottom">
              {filteredOrders.length === 0 ? (
                <div className="order-empty-box">
                  <EmptyOrders />
                </div>
              ) : (
                <ul className="search-rb-orders">
                  {filteredOrders.map((order) => (
                    <li key={order.id} className="orders-stack">
                      {/* Outer Link wraps only the primary clickable area */}
                      <Link to={`/specific-orders/${order.id}`}>
                        <div className="stack-pkg">
                          <div className="order-stack-img">
                            <img src={img2} alt={order.name} />
                          </div>
                          <div className="order-stack-details">
                            <h5>{order.name}</h5>
                            <p>
                              color: <span>{order.color}</span>
                            </p>
                            <div className="order-stack-pricing">
                              <h4>{order.price}</h4>
                            </div>
                          </div>
                        </div>
                      </Link>
                      {/* Separate Rate & Review link outside of the primary link */}
                      <div className="order-stack-rating">
                        <div className="order-stack-status">
                          <span>{order.status}</span>
                        </div>
                        <Link to="/rate&review-pkg" className="order-stack-rrp">
                          <Star size={14} fill="#007bff" />
                          <span>Rate & Review</span>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
