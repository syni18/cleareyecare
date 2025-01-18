import React, { useEffect, useRef, useState, useMemo } from "react";
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

const ShoppingBag = () => {
  const navigate = useNavigate();
  const { addresses, setAddresses } = useAddressStore();
  const {
    cartItems,
    setCartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [editAddressId, setEditAddressId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isNewAddressOpen, setNewAddressOpen] = useState(false);
  const [addressSavedData, setAddressSavedData] = useState({});
  const [startIndex, setStartIndex] = useState(0);

  const hasFetchedCart = useRef(false);
  const hasFetchedAddresses = useRef(false);

  // Static values (e.g., shipping cost)
  const SHIPPING_COST = 15;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        setCartItems(response.cart.items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    if (!hasFetchedCart.current) {
      hasFetchedCart.current = true;
      fetchCartItems();
    }
  }, [setCartItems]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetchAddress();
        setAddresses(response.addressList);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (!hasFetchedAddresses.current) {
      hasFetchedAddresses.current = true;
      fetchAddresses();
    }
  }, [setAddresses]);

  // Memoized subtotal calculation
  const subtotal = useMemo(
    () =>
      cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2),
    [cartItems]
  );

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsCouponModalOpen(false); // Close modal after selecting coupon
  };

  const handleEditClick = (addressId) => {
    const addressToEdit = addresses.find(
      (address) => address.addressId === addressId
    );
    setAddressSavedData(addressToEdit);
    setEditAddressId(addressId);
    setNewAddressOpen(true);
  };

  const handleCloseModal = () => {
    setEditAddressId(null);
    setNewAddressOpen(false);
  };

  const handleNextAddresses = () => {
    if (startIndex + 2 < addresses.length) {
      setStartIndex((prev) => prev + 2);
    }
  };

  const handlePreviousAddresses = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 2);
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="shoppingbag-wrapper">
      <div className="shoppingbag-container">
        <div className="bag-label-head">
          <label>Shopping Bag</label>
          <button className="continue-shop" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>

        <div className="shoppingbag-items">
          <div className="bag-items-head">
            <span>Items</span>
            <span>Attributes</span>
            <span>Quantity</span>
            <span>Shipping Cost</span>
            <span>Price</span>
          </div>

          {/* Bag Items */}
          {cartItems.map((item) => (
            <BagItem
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          ))}

          {/* Billing Address Section */}
          <div className="shoppingbag-cal-chkout">
            <div className="shoppingbag-cal-address">
              <div className="bill-label-head">
                <div className="bill-label-head-left">
                  <label>Billing Address</label>
                  {!isNewAddressOpen && (
                    <button onClick={() => setNewAddressOpen(true)}>
                      New Address
                    </button>
                  )}
                </div>

                {!isNewAddressOpen && (
                  <div className="bill-address-sliding">
                    <ArrowBigLeft
                      size={18}
                      className="sliding-arrowLeft"
                      onClick={handlePreviousAddresses}
                    />
                    <ArrowBigRight
                      size={18}
                      className="sliding-arrowRight"
                      onClick={handleNextAddresses}
                    />
                  </div>
                )}
              </div>

              {isNewAddressOpen ? (
                <NewAddress
                  addressSavedData={addressSavedData}
                  onCancel={handleCloseModal}
                  mode={editAddressId ? "edit" : "new"}
                />
              ) : (
                <div className="billing-address-scard">
                  {addresses
                    .slice(startIndex, startIndex + 2)
                    .map((address) => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        selectedAddressId={selectedAddressId}
                        onSelect={setSelectedAddressId}
                        onEdit={handleEditClick}
                      />
                    ))}
                </div>
              )}
            </div>

            {/* Checkout Summary */}
            <CheckoutSummary
              subtotal={subtotal}
              shippingCost={SHIPPING_COST}
              selectedCoupon={selectedCoupon}
              isCouponModalOpen={isCouponModalOpen}
              setIsCouponModalOpen={setIsCouponModalOpen}
              coupons={["AGRQO5NPPZ", "DISCOUNT10", "SAVE20"]}
              onSelectCoupon={handleSelectCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressCard = ({ address, selectedAddressId, onSelect, onEdit }) => (
  <div
    className="bill-address-scard-container"
    onClick={() => onSelect(address.addressId)}
  >
    <div className="bill-scard-tag">
      <span>{address.addressType}</span>
      <span className="scard-modify">
        {address.addressId === selectedAddressId ? (
          <Check size={18} className="scard-selected-address" />
        ) : (
          <div className="unselected-icon" />
        )}
        <Pen
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(address.addressId);
          }}
        />
      </span>
    </div>
    <div>
      <User size={18} /> {address.fullName}
    </div>
    <div>
      <Phone size={18} /> {address.phoneNumber}
    </div>
  </div>
);

const CheckoutSummary = ({
  subtotal,
  shippingCost,
  selectedCoupon,
  isCouponModalOpen,
  setIsCouponModalOpen,
  coupons,
  onSelectCoupon,
}) => (
  <div className="bag-chkout-cnt">
    <div className="bag-chkout-subtt">
      <span>Subtotal:</span>
      <span>Rs. {subtotal}</span>
    </div>
    <div className="bag-chkout-est">
      <span>Estimated Shipping:</span>
      <span>Rs. {shippingCost.toFixed(2)}</span>
    </div>
    <div onClick={() => setIsCouponModalOpen(true)}>
      <span>{selectedCoupon || "Coupon Code"}</span>
      {selectedCoupon && <span>Applied</span>}
    </div>
    <button onClick={() => navigate("/checkout")}>Checkout</button>
    {isCouponModalOpen && (
      <CouponModal
        coupons={coupons}
        onSelect={onSelectCoupon}
        onClose={() => setIsCouponModalOpen(false)}
      />
    )}
  </div>
);

export default ShoppingBag;
