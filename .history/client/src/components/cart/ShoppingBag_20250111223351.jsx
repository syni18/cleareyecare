import React, { useEffect, useRef, useState } from "react";
import "./shopingbag.css";
import "./billingaddress.css";
import BagItem from "./BagItem";
import CouponModal from "../coupons-offers/CouponModal";
import EmptyCart from "../empty/EmptyCart";
import { useNavigate } from "react-router-dom";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Check,
  Pen,
  Phone,
  User,
} from "lucide-react";
import NewAddress from "../address/NewAddress";
import { fetchAddress, getCartItems } from "../../helper/helper";
import useCartStore from "../../redux/store/cartStore";
import { useAddressStore } from "../../redux/store/addressStore";

function ShoppingBag() {
  const navigate = useNavigate();
  const { addresses, setAddresses, updateAddress, deleteAddress } =
    useAddressStore();
  const {
    cartItems,
    setCartItems,
  } = useCartStore();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [editAddressId, setEditAddressId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isNewAddressOpen, setNewAddressOpen] = useState(false);
  const [addressSavedData, setAddressSavedData] = useState({});
  const hasFetchedCart = useRef(false);
  const hasFetchedAddresses = useRef(false);

  // Fetch cart items (only once)
  useEffect(() => {
    if (!hasFetchedCart.current) {
      hasFetchedCart.current = true; // Mark as fetched
      const fetchCartItems = async () => {
        try {
          const response = await getCartItems();
          setCartItems(response.cart.items);
        } catch (error) {
          console.error("Failed to fetch cart items:", error);
        }
      };
      fetchCartItems();
    }
  }, [setCartItems]); // Dependencies: Only `setCartItems` to ensure consistent state.

  // Fetch addresses (only once)
  useEffect(() => {
    if (!hasFetchedAddresses.current) {
      hasFetchedAddresses.current = true; // Mark as fetched
      const fetchAddresses = async () => {
        try {
          const response = await fetchAddress();
          setAddresses(response.addressList);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
      fetchAddresses();
    }
  }, [setAddresses]); // Dependencies: Only `setAddresses` for consistent state.

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
    const addressToEdit = addresses.find(
      (address) => address.addressId === addressId
    );
    setAddressSavedData(addressToEdit);
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
                  {!isNewAddressOpen && (
                    <button
                      type="button"
                      className="bill-head-new"
                      onClick={handleNewAddressClick}
                    >
                      New Address
                    </button>
                  )}
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
                      addressSavedData={addressSavedData}
                      onCancel={handleCloseModal}
                      mode={editAddressId ? "update" : "new"}
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
                          onClick={() => handleAddressSelect(address.addressId)}
                        >
                          <div className="bill-scard-tag">
                            <span className="bill-scard-tag-addresstype">
                              {address.addressType}
                            </span>
                            <span className="scard-modify">
                              {address.addressId === selectedAddressId ? (
                                <Check
                                  // strokeWidth={3}
                                  size={18}
                                  className="scard-selected-address"
                                />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-dot-square"
                                >
                                  <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="2"
                                  />
                                  {/* <circle cx="12" cy="12" r="1" /> */}
                                </svg>
                              )}

                              <span className="bill-label-edit">
                                <Pen
                                  size={18}
                                  onClick={() =>
                                    handleEditClick(address.addressId)
                                  }
                                />
                              </span>
                            </span>
                          </div>
                          <div className="bill-scard-nameph">
                            <span className="bill-scard-name">
                              <User size={18} color="#59839d" fill="#59839d" />
                              &nbsp; &nbsp;
                              {address.fullName}
                            </span>
                            <span className="bill-scard-phno">
                              <Phone size={18} color="#59839d" fill="#59839d" />{" "}
                              &nbsp; &nbsp;
                              {address.phoneNumber}
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
                <span className="bag-subtotal-val">
                  <span>Rs.</span>
                  {subtotal}
                </span>
              </div>
              <div className="bag-chkout-est">
                <span className="bag-estcost">Estimated Shipping:</span>
                <span className="bag-estcost-val">
                  <span>Rs.</span>
                  {(15).toFixed(2)}
                </span>
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
                  <span>Rs.</span>
                  {(parseFloat(subtotal) + 15).toFixed(2)}
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
