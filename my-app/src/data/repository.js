import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000"; // Base URL for API requests
const USER_KEY = "user"; // Key for storing user data in local storage

// --- User Functions -----------------------------------------------------------------------------
// Function to verify user credentials
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { username, password },
  });
  const user = response.data;

  if (user !== null) setUser(user);

  return user;
}

// Function to find a user by username
async function findUser(username) {
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);
  return response.data;
}

// Function to create a new user
async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);
  return response.data;
}

// --- Post Functions -----------------------------------------------------------------------------
// Function to retrieve all posts
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

// Function to create a new post
async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

// --- Review Functions ---------------------------------------------------------------------------
// Function to retrieve all reviews
async function getReviews() {
  const response = await axios.get(API_HOST + "/api/reviews");
  return response.data;
}

// Function to create a new review
async function createReview(review) {
  const response = await axios.post(API_HOST + "/api/reviews", review);
  return response.data;
}

// Function to update an existing review
async function updateReview(reviewId, review) {
  const response = await axios.put(API_HOST + `/api/reviews/${reviewId}`, review);
  return response.data;
}

// Function to delete a review
async function deleteReview(reviewId) {
  const response = await axios.delete(API_HOST + `/api/reviews/${reviewId}`);
  return response.data;
}

// Function to get all product names
async function getProductNames() {
  const response = await axios.get(API_HOST + "/api/products");
  return response.data.map(product => ({ id: product.id, name: product.name })); // Ensure you return an array of objects with id and name
}

// --- Helper functions to interact with local storage --------------------------------------------
// Function to set user data in local storage
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Function to get user data from local storage
function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

// Function to remove user data from local storage
function removeUser() {
  localStorage.removeItem(USER_KEY);
}

// Function to retrieve all users
async function getAllUsers() {
  const response = await axios.get(`${API_HOST}/api/users`);
  return response.data;
}

// Function to follow a user
async function followUser(followerId, followingId) {
  const response = await axios.post(API_HOST + "/api/users/follow", {
    followerId,
    followingId,
  });
  return response.data;
}

// Function to unfollow a user
async function unfollowUser(followerId, followingId) {
  const response = await axios.post(API_HOST + "/api/users/unfollow", {
    followerId,
    followingId,
  });
  return response.data;
}

// Function to get the list of users the current user is following
async function getFollowingList(username) {
  const response = await axios.get(`${API_HOST}/api/users/${username}/following`);
  return response.data;
}

// Exporting functions for use in other modules
export {
  verifyUser,
  findUser,
  createUser,
  getPosts,
  createPost,
  getReviews,
  createReview,
  updateReview, 
  deleteReview,
  getProductNames,
  getUser,
  removeUser,
  getAllUsers,
  followUser,
  unfollowUser,
  getFollowingList,
};
