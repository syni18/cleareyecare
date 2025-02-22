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
import { fetchAddress, getCouponsToShow, setDefaultAddress } from "../../helper/helper";
import useCartStore from "../../redux/store/cartStore";
import { useAddressStore } from "../../redux/store/addressStore";

function ShoppingBag() {
  const navigate = useNavigate();
  const { addresses, defaultAddress, setAddresses, setDefaultAddress } = useAddressStore();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCartStore();

  const [coupons, setCoupons] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [editAddressId, setEditAddressId] = useState(null);
  // const [defaultAddress, setDefaultAddress] = useState({});
  const [isNewAddressOpen, setNewAddressOpen] = useState(false);
  const [addressSavedData, setAddressSavedData] = useState({});
  const hasFetchedAddresses = useRef(false);

  // Fetch addresses (only once)
  useEffect(() => {
    if (!hasFetchedAddresses.current) {
      hasFetchedAddresses.current = true; // Mark as fetched
      const fetchAddresses = async () => {
        try {
          const response = await fetchAddress();          
          setAddresses(response.addressList.addresses);
          setDefaultAddress(response.addressList.defaultAddress);
          console.log("defaultl", response.addressList.defaultAddress);
          
          // setDefaultAddress(response.addressList.defaultAddress);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
      fetchAddresses();
    }
  }, [setAddresses]); // Dependencies: Only `setAddresses` for consistent state.

  // console.log("dgb", addresses);
  
  // Dummy coupon codes
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCouponsToShow();
        setCoupons(response.coupons.map((coupon) => coupon.code));
      } catch (e) {
        console.log(e);
      }
    }
    fetchCoupons();
  }, []);
  // const coupons = ["AGRQO5NPPZ", "DISCOUNT10", "SAVE20"];
  // sub total
  const subtotal = cartItems
    .reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
    .toFixed(2);

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsCouponModalOpen(false); // Close the modal after selecting a coupon
  };
  const handleEditClick = (addressId) => {
    
    const addressToEdit = addresses.find(
      (address) => address.id === addressId
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
  const handleAddressSelect = async (addressId) => {
    setSelectedAddressId(addressId); // Set the selected address ID
    await setDefaultAddress(addressId); //
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
                  <span className="del-head-edit">
                    {/* Change   */}
                    <span>
                      <SquarePen size={18} fill="" />
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
                <button type="button" className="btn-checkout">
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
    </div>
  );
}

export default ShoppingBag;
