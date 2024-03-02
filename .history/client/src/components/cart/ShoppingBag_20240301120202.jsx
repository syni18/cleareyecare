import React, { useState } from "react";
import "./shopingbag.css";
import BagItem from "./BagItem";
import { useSelector } from "react-redux";
import CouponModal from "../coupons-offers/CouponModal";
import EmptyCart from "../empty/EmptyCart";
import { useNavigate } from "react-router-dom";
import { CircleDot, Pen, Phone, User } from "lucide-react";
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
  // Check if cart is empty
  if (cartItems.length === 0) {
    return <EmptyCart />;
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
              <div className="bill-label-head">
                <label htmlFor="">Billing Address</label>
                <button
                  type="button"
                  className="bill-head-new"
                  onClick={handleNewAddressClick}
                >
                  New Address
                </button>
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
                    {addresses.map((address) => (
                      <div
                        className="bill-address-scard-container"
                        key={address.id}
                      >
                        <div className="bill-scard-tag">
                          <span className="bill-scard-ta">{address.addressType}</span>
                          <span className="scard-modify">
                            <CircleDot
                              strokeWidth={3}
                              size={18}
                              className={
                                address.id === selectedAddressId
                                  ? "scard-selected-address"
                                  : ""
                              }
                            />
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
