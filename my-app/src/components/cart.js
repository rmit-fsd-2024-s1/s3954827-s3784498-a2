// Cart.js
import React from "react";

function Cart({ cartItems, removeFromCart }) {
  return (
    <div className="cart">
      <h3>Your Cart</h3>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="row mb-3">
            <div className="col-md-4">
              <p>{item.name}</p>
            </div>
            <div className="col-md-4">
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="col-md-4">
              <p>Price: ${item.price}</p>
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
