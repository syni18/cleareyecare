import React from "react";
import "./orders.css";
import { Search, Star } from "lucide-react";
import img2 from "../../assets/img2.png";
import EmptyOrders from "../empty/EmptyOrders";
function Orders() {
  const orders = [
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
                  <input type="checkbox" name="status" id="_status-onway" />
                  <span>On the way</span>
                </li>
                <li>
                  <input type="checkbox" name="status" id="_status-delivered" />
                  <span>Delivered</span>
                </li>
                <li>
                  <input type="checkbox" name="status" id="_status-cancelled" />
                  <span>Cancelled</span>
                </li>
                <li>
                  <input type="checkbox" name="status" id="_status-returned" />
                  <span>Returned</span>
                </li>
              </ul>
            </div>
            <div className="orders-filter-status">
              <label htmlFor="">Order Time</label>
              <ul className="status-list">
                <li>
                  <input type="checkbox" name="status" id="_status-onway" />
                  <span>Last 30 days</span>
                </li>
                <li>
                  <input type="checkbox" name="status" id="_status-delivered" />
                  <span>2023</span>
                </li>
                <li>
                  <input type="checkbox" name="status" id="_status-cancelled" />
                  <span>2022</span>
                </li>
                <li>
                  <input type="checkbox" name="status" id="_status-returned" />
                  <span>2021</span>
                </li>
                <li>
                  <input type="checkbox" name="status" id="_status-returned" />
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
              {orders.length === 0 ? (
                <div className="order-empty-box">
                  <EmptyOrders />
                </div>
              ) : (
                <ul className="search-rb-orders">
                  {orders.map((order) => (
                    <li className="orders-stack" key={order.id}>
                      {/* Order details */}
                      <div className="stack-pkg">
                        <div className="order-stack-img">
                          <img src={img2} alt="" />
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
                      <div className="order-stack-rating">
                        <div className="order-stack-status">
                          <span>{order.status}</span>
                        </div>
                        <div className="order-stack-rrp">
                          <Star size={14} fill="#490B3D" />
                          <span>Rate & Review</span>
                        </div>
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
