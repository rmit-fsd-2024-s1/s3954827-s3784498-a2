import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getReviews, createReview, deleteReview, updateReview, getProductNames } from "../data/repository"; // Add getProductNames

export default function Forum(props) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    async function loadReviews() {
      const currentReviews = await getReviews();
      setReviews(currentReviews);
      setIsLoading(false);
    }
    async function loadProducts() {
      const productNames = await getProductNames();
      setProducts(productNames);
      if (productNames.length > 0) {
        setSelectedProduct(productNames[0].name); // Set the product name
      }
    }
    loadReviews();
    loadProducts();
  }, []);

  const resetReviewContent = () => {
    setReview("");
    setRating(1);
    setErrorMessage(null);
    setEditingReviewId(null);
    setSelectedProduct(products.length > 0 ? products[0].name : ""); // Set the product name
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!props.user || !props.user.username) {
      setErrorMessage("User is not logged in.");
      return;
    }

    if (review.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A review cannot be empty.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setErrorMessage("Rating must be between 1 and 5.");
      return;
    }

    if (!selectedProduct) {
      setErrorMessage("Please select a product to review.");
      return;
    }

    const newReview = { text: review, username: props.user.username, rating, product_name: selectedProduct }; // Note: use product_name here

    if (editingReviewId) {
      await updateReview(editingReviewId, newReview);
      setReviews(
        reviews.map((rev) =>
          rev.review_id === editingReviewId ? { ...rev, ...newReview } : rev
        )
      );
    } else {
      const createdReview = await createReview(newReview);
      setReviews([...reviews, createdReview]);
    }

    resetReviewContent();
  };

  const handleEdit = (review) => {
    setReview(review.text);
    setRating(review.rating);
    setEditingReviewId(review.review_id);
    setSelectedProduct(review.product_name); // Use product_name for selected product
  };

  const handleDelete = async (reviewId) => {
    await deleteReview(reviewId);
    setReviews(reviews.filter((rev) => rev.review_id !== reviewId));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>{editingReviewId ? "Edit Review" : "New Review"}</legend>
          <div className="form-group">
            <label htmlFor="product-select">Select Product:</label>
            <select
              id="product-select"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="form-control"
              required
            >
              {products.map((product, index) => (
                <option key={index} value={product.name}>
                  {product.name} {/* Display the product name */}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: "60px" }}>
            <ReactQuill
              theme="snow"
              value={review}
              onChange={setReview}
              style={{ height: "180px" }}
            />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              required
            />
          </div>
          {errorMessage && (
            <div className="form-group">
              <span className="text-danger">{errorMessage}</span>
            </div>
          )}
          <div className="form-group">
            <input
              type="button"
              className="btn btn-danger mr-5"
              value="Cancel"
              onClick={resetReviewContent}
            />
            <input type="submit" className="btn btn-primary" value={editingReviewId ? "Update" : "Post"} />
          </div>
        </fieldset>
      </form>

      <hr />
      <h1>Reviews</h1>
      <div>
        {isLoading ? (
          <div>Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <span className="text-muted">No reviews have been submitted.</span>
        ) : (
          reviews.map((x) => (
            <div className="border my-3 p-3" key={x.review_id}>
              <h6 className="text-primary">{x.username}</h6>
              <div dangerouslySetInnerHTML={{ __html: x.text }} />
              <p>Rating: {x.rating}</p>
              <p>Product: {x.product_name}</p> {/* Display the product name */}
              {props.user && props.user.username === x.username && (
                <div>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(x)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(x.review_id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Prop types validation
Forum.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

// Default props
Forum.defaultProps = {
  user: null,
};
