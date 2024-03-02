import React, { useState } from "react";
import "./shopingbag.css";
import BagItem from "./BagItem";
import { useSelector } from "react-redux";
import CouponModal from "../coupons-offers/CouponModal";
import EmptyCart from "../empty/EmptyCart";
import { useNavigate } from "react-router-dom";
import {
  ArrowBigLeft,
  ArrowBigRight,
  CircleDot,
  Pen,
  Phone,
  User,
} from "lucide-react";
import NewAddress from "../address/NewAddress";

function ShoppingBag() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [editAddressId, setEditAddressId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isNewAddressOpen, setNewAddressOpen] = useState(false);
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
    {
      id: 2,
      fullName: "Rohan",
      phoneNumber: "3563532413",
      pincode: "122413",
      locality: "VPO bhora kalan patti-chainpura",
      cityDistrictTown: "Gurgaon",
      state: "Haryana",
      landmark: "Near Surya Global School",
      altMobile: "",
      addressType: "home",
    },
    {
      id: 3,
      fullName: "Vikash",
      phoneNumber: "3563532413",
      pincode: "122413",
      locality: "VPO bhora kalan patti-chainpura",
      cityDistrictTown: "Gurgaon",
      state: "Haryana",
      landmark: "Near Surya Global School",
      altMobile: "",
      addressType: "home",
    },
    {
      id: 4,
      fullName: "Vijay",
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
  const [startIndex, setStartIndex] = useState(0);
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
  const handleEditClick = (addressId) => {
    setEditAddressId(addressId);
    setNewAddressOpen(true); // Open the NewAddress component
  };

  const handleNewAddressClick = () => {
    setNewAddressOpen(true); // Open the NewAddress component
  };

  const handleCloseModal = () => {
    setEditAddressId(null);
    setNewAddressOpen(false); // Close the NewAddress component
  };
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId); // Set the selected address ID
  };
  const handleNextAddresses = () => {
    if (startIndex + 2 < addresses.length) {
      setStartIndex(startIndex + 2);
    }
  };

  const handlePreviousAddresses = () => {
    if (startIndex - 2 >= 0) {
      setStartIndex(startIndex - 2);
    }
  };
  // Check if cart is empty
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }
  return (
    <div className="shoppingbag-wrapper">
      <div className="shoppingbag-container">
        <div className="bag-label-head">
          <label htmlFor="">Shopping Bag</label>
          <button className="continue-shop" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
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
              <div className="bill-label-head">
                <div className="bill-label-head-left">
                  <label htmlFor="">Billing Address</label>
                  <button
                    type="button"
                    className="bill-head-new"
                    onClick={handleNewAddressClick}
                  >
                    New Address
                  </button>
                </div>
                {!isNewAddressOpen && (
                  <div className="bill-address-sliding">
                    <ArrowBigLeft
                      size={18}
                      fill="black"
                      className="sliding-arrowLeft"
                      onClick={handlePreviousAddresses}
                    />
                    <ArrowBigRight
                      size={18}
                      fill="black"
                      className="sliding-arrowRight"
                      onClick={handleNextAddresses}
                    />
                  </div>
                )}
              </div>
              {isNewAddressOpen ? (
                <div className="modal-overlay" onClick={handleCloseModal}>
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <NewAddress
                      addressData={
                        editAddressId
                          ? addresses.find(
                              (address) => address.id === editAddressId
                            )
                          : null
                      }
                      onCancel={handleCloseModal}
                      mode={editAddressId ? "edit" : "new"}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="billing-address-scard">
                    {addresses
                      .slice(startIndex, startIndex + 2)
                      .map((address) => (
                        <div
                          className="bill-address-scard-container"
                          key={address.id}
                          onClick={() => handleAddressSelect(address.id)}
                        >
                          <div className="bill-scard-tag">
                            <span className="bill-scard-tag-addresstype">
                              {address.addressType}
                            </span>
                            <span className="scard-modify">
                              <label class="checkbox">
    <input type="checkbox">
    <svg viewBox="0 0 21 18">
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 18" id="tick-path">
            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.25" fill="none" d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69"></path>
        </symbol>
        <defs>
            <mask id="tick">
                
            </mask>
        </defs>
        
        <path d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" mask="url(#tick)" fill="white"></path>
    </svg>
    <svg viewBox="0 0 11 11" class="lines">
        <path d="M5.88086 5.89441L9.53504 4.26746"></path>
        <path d="M5.5274 8.78838L9.45391 9.55161"></path>
        <path d="M3.49371 4.22065L5.55387 0.79198"></path>
    </svg>
</label>

                              {/* <CircleDot
                                strokeWidth={3}
                                size={18}
                                // fill="black"
                                className={
                                  address.id === selectedAddressId
                                    ? "scard-selected-address"
                                    : ""
                                }
                              /> */}
                              <span className="bill-label-edit">
                                <Pen
                                  size={18}
                                  onClick={() => handleEditClick(address.id)}
                                />
                              </span>
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
                </>
              )}
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
                <button type="button" onClick={() => navigate("")}>
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
