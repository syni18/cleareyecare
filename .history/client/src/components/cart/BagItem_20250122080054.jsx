import React from "react";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Relaxed Fit T-shirt",
      price: 12.99,
      size: "XL",
      color: "Blue",
      stockStatus: "In Stock",
      quantity: 1,
      image: "path-to-tshirt-image",
    },
    {
      id: 2,
      name: "Nylon Sports Cap",
      price: 14.99,
      size: null,
      color: null,
      stockStatus: "Available in 2 days",
      quantity: 1,
      image: "path-to-cap-image",
    },
    {
      id: 3,
      name: "Sneakers",
      price: 34.99,
      size: "UK 9",
      color: null,
      stockStatus: "Out in stock",
      quantity: 1,
      image: "path-to-sneakers-image",
    },
    {
      id: 4,
      name: "Slim Fit Suit Vest",
      price: 17.99,
      size: "XL",
      color: "Yellow",
      stockStatus: "In Stock",
      quantity: 1,
      image: "path-to-vest-image",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.cartItems}>
        <h2>Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={styles.details}>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
              <p style={styles.stockStatus(item.stockStatus)}>
                {item.stockStatus}
              </p>
              <div style={styles.options}>
                {item.size && <span>Size: {item.size}</span>}
                {item.color && <span>Color: {item.color}</span>}
              </div>
              <div style={styles.actions}>
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.summary}>
        <h3>Delivery</h3>
        <div>
          <button>Free</button>
          <button>Express: $9.99</button>
        </div>
        <p>Delivery Date: June 24, 2025</p>
        <div>
          <input
            type="text"
            placeholder="Promocode"
            style={styles.promocodeInput}
          />
          <button>Apply</button>
        </div>
        <p>20% off discount</p>
        <div>
          <p>Subtotal: $80.96</p>
          <p>Discount: -$16.19</p>
          <p>Delivery: $0.00</p>
          <p>Tax: $14.00</p>
        </div>
        <h3>Total: $78.76</h3>
        <button style={styles.checkoutButton}>Proceed to checkout</button>
        <button style={styles.continueShoppingButton}>Continue shopping</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "2rem",
    gap: "2rem",
    backgroundColor: "#f9f9f9",
  },
  cartItems: {
    flex: 2,
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cartItem: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    borderBottom: "1px solid #ddd",
    paddingBottom: "1rem",
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  details: {
    flex: 1,
  },
  stockStatus: (status) => ({
    color: status === "In Stock" ? "green" : "red",
  }),
  options: {
    display: "flex",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  summary: {
    flex: 1,
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  promocodeInput: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  checkoutButton: {
    padding: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  continueShoppingButton: {
    padding: "1rem",
    backgroundColor: "#ddd",
    color: "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
};

export default CartPage;
