// Product.js
import React from "react";

function Product({ product, addToCart }) {
  const { id, name, price } = product;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Price: ${price}</p>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;

// h5: {product.name}

// p: {product.price}
