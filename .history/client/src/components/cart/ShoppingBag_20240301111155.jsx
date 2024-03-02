import React, { useState } from "react";
import "./shopingbag.css";
import BagItem from "./BagItem";
import { useSelector } from "react-redux";
import CouponModal from "../coupons-offers/CouponModal";
import EmptyCart from "../empty/EmptyCart";
import { useNavigate } from "react-router-dom";
import { Pen, Phone, User } from "lucide-react";

function ShoppingBag() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: "Sahil",
      phoneNumber: "3563532413",
      pincode: "122413",
      locality: "VPO bhora kalan patti-chainpura",
      cityDistrictTown: "Gurgaon",
      state: "Haryana",
      landmark: "Near Surya Global School",
      altMobile: "",
      addressType: "home",
    },
    // Add more addresses if needed
  ]);
  // Dummy coupon codes
  const coupons = ["AGRQO5NPPZ", "DISCOUNT10", "SAVE20"];
  // Calculate subtotal
  const subtotal = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsCouponModalOpen(false); // Close the modal after selecting a coupon
  };
  // Check if cart is empty
  if (cartItems.length === 0) {
    return <EmptyCart/>
  }
  return (
    <div className="shoppingbag-wrapper">
      <div className="shoppingbag-container">
        <div className="bag-label-head">
          <label htmlFor="">Shopping Bag</label>
          <button className="continue-shop">Continue Shopping</button>
        </div>
        <div className="shoppingbag-items">
          <div className="bag-items-head">
            <span className="bag-head-items">Items</span>
            <span className="bag-head-attribute">Attributes</span>
            <span className="bag-head-quantity">Quantity</span>
            <span className="bag-head-Shiping-cost">Shipping Cost</span>
            <span className="bag-head-Price">Price</span>
          </div>
          <BagItem />
          <div className="shoppingbag-cal-chkout">
            <div className="shoppingbag-cal-address">
              
              <div className="billing-address-scard">
                {addresses.map((address) => (
                  <div
                    className="bill-address-scard-container"
                    key={address.id}
                  >
                    <div className="bill-scard-tag">
                      <span>{address.addressType}</span>
                      <span className="bill-label-edit">
                        <Pen
                          size={18}
                          // onClick={() => handleEditClick(address.id)}
                        />
                      </span>
                    </div>
                    <div className="bill-scard-nameph">
                      <span className="bill-scard-name">
                        <User size={14} color="#007bff" />
                        &nbsp;{address.fullName}
                      </span>
                      <span className="bill-scard-phno">
                        <span>
                          <Phone size={14} color="#007bff" /> &nbsp;
                          {address.phoneNumber}
                        </span>
                        {/* <span>
                        <Clipboard size={18} color="#007bff" />
                      </span> */}
                      </span>
                    </div>
                    <div className="bill-scard-locate">
                      <span className="bill-scard-locate-det">
                        {address.locality}
                        <br />
                        {address.cityDistrictTown}, {address.state} <br />
                        {address.pincode}
                      </span>
                      <span className="bill-scard-locate-nearby">
                        {address.landmark}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bag-chkout-cnt">
              <div className="bag-chkout-subtt">
                <span className="bag-subtotal">Subtotal:</span>
                <span className="bag-subtotal-val">${subtotal}</span>
              </div>
              <div className="bag-chkout-est">
                <span className="bag-estcost">Estimated Shipping:</span>
                <span className="bag-estcost-val">$15.00</span>
              </div>
              <div
                className="bag-chkout-coupon"
                onClick={() => setIsCouponModalOpen(true)}
              >
                <span
                  className={`bag-coupon-code ${
                    selectedCoupon ? "coupon-selected" : ""
                  }`}
                >
                  {selectedCoupon || "Coupon Code"}
                </span>
                {selectedCoupon && (
                  <span className="bag-coupon-tick">Applied</span>
                )}
              </div>
              {isCouponModalOpen && (
                <CouponModal
                  coupons={coupons}
                  onSelectCoupon={handleSelectCoupon}
                  onClose={() => setIsCouponModalOpen(false)}
                />
              )}
              <div className="bag-chkout-total">
                <span className="bag-total">Total:</span>
                <span className="bag-total-val">
                  ${(parseFloat(subtotal) + 15).toFixed(2)}
                </span>
              </div>
              <div className="checkout-btn">
                <button type="button" onClick={() => navigate("/cart-address")}>
                  Procced to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBag;
