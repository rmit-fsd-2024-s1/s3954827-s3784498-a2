import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "../components/cart";
import Product from "../components/product";
import { Link } from "react-router-dom";
import "./ShoppingCart.css"; // Ensure the CSS file is imported

function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [creditCard, setCreditCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);

  useEffect(() => {
    // Fetch products from the backend API
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch cart items from the backend API
    axios
      .get("http://localhost:4000/api/cart")
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const addToCart = (product) => {
    // Make API call to add product to cart
    axios
      .post("http://localhost:4000/api/cart/add", product)
      .then((response) => {
        // If the request is successful, update the state with the new cart items
        setCartItems((prevCartItems) => [...prevCartItems, response.data]);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  const removeFromCart = (id) => {
    // Remove item from cart via backend API
    console.log(`Attempting to remove item with id: ${id}`); // Add logging
    axios
      .delete(`http://localhost:4000/api/cart/remove/${id}`)
      .then((response) => {
        console.log(`Item with id: ${id} removed successfully.`); // Add logging
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  const handleCheckout = () => {
    console.log("Credit Card:", creditCard);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);

    const creditCardRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    console.log("Credit Card Regex Test:", creditCardRegex.test(creditCard));
    console.log("Expiry Date Regex Test:", expiryDateRegex.test(expiryDate));
    console.log("CVV Regex Test:", cvvRegex.test(cvv));

    if (
      creditCardRegex.test(creditCard) &&
      expiryDateRegex.test(expiryDate) &&
      cvvRegex.test(cvv)
    ) {
      setIsPurchaseComplete(true);
    } else {
      alert("Please enter valid credit card details.");
    }
  };
  const handleContinueShopping = () => {
    setIsCheckout(false);
  };

  const handleCompletePurchase = () => {
    handleCheckout();
  };

  return (
    <div className="shopping-cart-container">
      {!isPurchaseComplete ? (
        !isCheckout ? (
          <div>
            <h2 className="shopping-cart-header">Shopping Cart</h2>
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <Product product={product} addToCart={addToCart} />
                </div>
              ))}
            </div>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            <button
              className="btn btn-primary"
              onClick={() => setIsCheckout(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <div>
            <h2 className="shopping-cart-header">Checkout</h2>
            <div className="checkout-form">
              <div className="checkout-input">
                <label>Credit Card Number:</label>
                <input
                  type="text"
                  value={creditCard}
                  onChange={(e) => setCreditCard(e.target.value)}
                />
              </div>
              <div className="checkout-input">
                <label>Expiry Date (MM/YY):</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="checkout-input">
                <label>CVV:</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCVV(e.target.value)}
                />
              </div>
              <button
                className="checkout-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button
                className="checkout-button"
                onClick={handleCompletePurchase}
              >
                Complete Purchase
              </button>
            </div>
          </div>
        )
      ) : (
        <div>
          <h2 className="shopping-cart-header">Purchase Summary</h2>
          <p>Thank you for your purchase!</p>
          <p>Order Summary:</p>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p className="cart-item-name">{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
          <div>
            <Link to="/">
              <button> Return to Home </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
