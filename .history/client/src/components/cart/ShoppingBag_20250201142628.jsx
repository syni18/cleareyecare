import { useEffect, useRef, useState } from "react";
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
  Info,
  Pen,
  Phone,
  SquarePen,
  Truck,
  User,
} from "lucide-react";
import NewAddress from "../address/NewAddress";
import { fetchAddress, getCouponsToShow, setDefaultAddress, createOrderCF } from "../../helper/helper";
import useCartStore from "../../redux/store/cartStore";
import { useAddressStore } from "../../redux/store/addressStore";
import AddressModal from "../address/AddressModal";

function ShoppingBag() {
  const navigate = useNavigate();
  const { addresses, defaultAddress, setAddresses, setDefaultAddress, updateAddress } = useAddressStore();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCartStore();

  const hasFetchedAddresses = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  // Fetch addresses (only once)
  useEffect(() => {
    if (!hasFetchedAddresses.current) {
      hasFetchedAddresses.current = true; // Mark as fetched
      const fetchAddresses = async () => {
        try {
          const response = await fetchAddress();          
          setAddresses(response.addressList.addresses);
          setDefaultAddress(response.addressList.defaultAddress);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
      fetchAddresses();
    }
  }, [setAddresses]); 

 // subtotal
  const subtotal = cartItems
    .reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
    .toFixed(2);
  
  const handleCreateOrder =async () => {
    // TODO: Implement order creation logic
    // subTotal, final cart items, currency, total, address, user, 
    const cf = await createOrderCF(amount, cartItems, subtotal, defaultAddress);
    navigate("/order");
  }
  // Check if cart is empty
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }
  const handleAddressSaved = (address) => {
    updateAddress(address);
  };
  return (
    <div className="sb-wrapper">
      <div className="sb-container">
        <div className="sbc-header">
          <label htmlFor="">Shopping Bag</label>
        </div>
        <div className="sb-cartset">
          <div className="sb-cartset-left">
            {cartItems.map((item) => (
              <BagItem
                key={item.productId._id}
                item={item}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
          <div className="sb-cartset-right">
            <div className="csr-container">
              <div className="csr-deliver">
                <div className="csr-del-head">
                  <label htmlFor="">Delivery Address</label>
                  <span
                    className="del-head-edit"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Change
                    <span>
                      <SquarePen size={18} fill="#ddd" />
                    </span>
                  </span>
                </div>
                <div className="csr-del-cg">
                  <div className="del-cg-type">
                    <h6 className="type-cg-name">
                      <span>
                        <User size={16} fill="#ddd" />
                      </span>
                      {defaultAddress.fullName}
                    </h6>
                    <span className="type-cg-oh">
                      {defaultAddress.addressType}
                    </span>
                  </div>
                  <p className="del-cg-phone">
                    <span>
                      <Phone size={16} fill="#ddd" />
                    </span>
                    {defaultAddress.phoneNumber}
                  </p>
                  <p className="del-cg-address">
                    <span>
                      <Truck size={16} fill="#ddd" />
                    </span>
                    {defaultAddress.address}
                  </p>
                </div>
                <div className="del-cg-est">
                  <span>
                    Expected Delivery :{" "}
                    <span className="cg-est-date">24-jan-2025</span>
                  </span>
                </div>
              </div>
              <div className="csr-promo">
                <div className="csr-promo-form">
                  <input
                    type="text"
                    placeholder="Discount Code"
                    className="promo-enter"
                  />
                  <button type="button" className="promo-applied">
                    Apply
                  </button>
                </div>
                <div className="csr-promo-off">
                  <span className="promo-off-txt">20% off discount</span>
                </div>
              </div>
              <div className="csr-calc">
                <div className="calc-sb-total">
                  <p>Subtotal</p>
                  <span>${subtotal}</span>
                </div>
                <div className="calc-discount">
                  <p>Discount</p>
                  <span>-$15.00</span>
                </div>
                <div className="calc-del-chrge">
                  <p>
                    Delivery <Info size={14} color="white" fill="#495057" />
                  </p>
                  <span>$00.00</span>
                </div>
                <div className="calc-tax">
                  <p>
                    Tax <Info size={14} color="white" fill="#495057" />
                  </p>
                  <span>$00.00</span>
                </div>
              </div>
              <div className="csr-total">
                <p>Total</p>
                <span>${subtotal}</span>
              </div>
              <div className="csr-btn-chkout">
                <button type="button" className="btn-checkout" onClick={handleCreateOrder}>
                  Proceed to checkout
                </button>
                <button type="button" className="btn-more-shop">
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddressModal
          addresses={addresses}
          onClose={() => setIsModalOpen(false)}
          updateAddress={handleAddressSaved}
        />
      )}
    </div>
  );
}

export default ShoppingBag;
