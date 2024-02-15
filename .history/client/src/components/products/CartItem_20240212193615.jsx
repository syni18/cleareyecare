import React from 'react'
import './cartitem.css';
import img2 from '../../assets/img2.png';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

function CartItem() {
  const dispatch = useDispatch();
  const cartiItems = useSelector(state => state.cart.cartiItems);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="cart-item-wrapper">
      <div className="cart-item-container">
        <div className="cart-item-top">
          <div className="cart-item-head">
            <span className="cart-item-index">4</span>
            <h3>Product Bag</h3>
          </div>
        </div>
        <div className="cart-item-items">
          <table className="bag-table">
            <tr className="table-row">
              <th className="table-head">Items</th>
              <th className="table-head">Price</th>
              <th className="table-head">Quantity</th>
              <th className="table-head">Total</th>
            </tr>
            <tbody>
              {cartItems.map((item, index) => (
                <tr className="table-row" key={index}>
                  <td>
                    <div className="table-item-details">
                      <img src={item.thumbnail || img2} alt={item.title} />
                      <div className="item-details-container">
                        <h4>{item.title}</h4>
                        {/* Size and Color, if available */}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="item-container-price">
                      <h4>${item.price}</h4>
                      {/* Discount information, if any */}
                    </div>
                  </td>
                  <td>
                    <h4 className="item-quantity">{item.quantity}</h4>
                  </td>
                  <td>
                    <h4 className="item-quantity">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h4>
                  </td>
                  <td>
                    <X
                      color="darkgrey"
                      onClick={() => handleRemoveFromCart(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tr className="table-row">
              <td>
                <div className="table-item-details">
                  <img src={img2} alt="img1" />
                  <div className="item-details-container">
                    <h4>Product 1</h4>
                    <div className="container-spec">
                      <small className="item-size">Size: 42</small>
                      <small className="item-size">
                        Color: <span>G</span>
                      </small>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="item-container-price">
                  <h4>
                    $40.00 <span>$50.00</span>
                  </h4>
                  <p>
                    you save $10.00 <span>(20%)</span>
                  </p>
                </div>
              </td>
              <td>
                <h4 className="item-quantity">01</h4>
              </td>
              <td>
                <h4 className="item-quantity">$40.00</h4>
              </td>
              <td>
                <X color="darkgrey" />
              </td>
            </tr>
            <tr className="table-row">
              <td>
                <div className="table-item-details">
                  <img src={img2} alt="img1" />
                  <div className="item-details-container">
                    <h4>Product 1</h4>
                    <div className="container-spec">
                      <small className="item-size">Size: 42</small>
                      <small className="item-size">
                        Color: <span>G</span>
                      </small>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="item-container-price">
                  <h4>
                    $40.00 <span>$50.00</span>
                  </h4>
                  <p>
                    you save $10.00 <span>(20%)</span>
                  </p>
                </div>
              </td>
              <td>
                <h4 className="item-quantity">01</h4>
              </td>
              <td>
                <h4 className="item-quantity">$40.00</h4>
              </td>
              <td>
                <X color="darkgrey" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartItem;