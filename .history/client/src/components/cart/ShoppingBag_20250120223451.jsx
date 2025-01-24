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
  Pen,
  Phone,
  User,
} from "lucide-react";
import NewAddress from "../address/NewAddress";
import { fetchAddress, getCouponsToShow, setDefaultAddress } from "../../helper/helper";
import useCartStore from "../../redux/store/cartStore";
import { useAddressStore } from "../../redux/store/addressStore";

function ShoppingBag() {
  const navigate = useNavigate();
  const { addresses, setAddresses } = useAddressStore();
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
  const [selectedAddressId, setSelectedAddressId] = useState(null);
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
          setSelectedAddressId(response.addressList.defaultAddress.id);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
      fetchAddresses();
    }
  }, [setAddresses]); // Dependencies: Only `setAddresses` for consistent state.

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
  // if (cartItems.length === 0) {
  //   return <EmptyCart />;
  // }
  
  return (
    <div className="sb-wrapper">
      <div className="sb-container">
        <div className="sbc-header">
          <label htmlFor="">Shopping Bag</label>
        </div>
        <div className="sb-cartset">
          <div className="sb-cartset-left">h</div>
          <div className="sb-cartset-right">
            <div className="csr-container">
              <div className="csr-delivery">
                <label htmlFor="">Delivery</label>
                <div className="csr-del-"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBag;
