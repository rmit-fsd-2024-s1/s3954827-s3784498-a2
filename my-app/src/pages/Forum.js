// Forum.js
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getPosts, createPost } from "../data/repository";

// Forum component to display forum posts and allow users to create new posts
export default function Forum(props) {
  // State variables
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Load posts from the server when the component mounts
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();
      setPosts(currentPosts);
      setIsLoading(false);
    }
    loadPosts();
  }, []);

  // Reset post content and error message
  const resetPostContent = () => {
    setPost("");
    setErrorMessage(null);
  };

  // Handle form submission to create a new post
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the post content is empty
    if (post.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A post cannot be empty.");
      return;
    }

    // Create post
    const newPost = { text: post, username: props.user.username };
    await createPost(newPost);

    // Add the new post to the locally stored posts
    setPosts([...posts, newPost]);
    resetPostContent();
  };

  return (
    <div>
      {/* Form to create a new post */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Post</legend>
          <div className="form-group" style={{ marginBottom: "60px" }}>
            {/* ReactQuill editor for post content */}
            <ReactQuill
              theme="snow"
              value={post}
              onChange={setPost}
              style={{ height: "180px" }}
            />
          </div>
          {/* Display error message if any */}
          {errorMessage !== null && (
            <div className="form-group">
              <span className="text-danger">{errorMessage}</span>
            </div>
          )}
          {/* Buttons to cancel or submit the post */}
          <div className="form-group">
            <input
              type="button"
              className="btn btn-danger mr-5"
              value="Cancel"
              onClick={resetPostContent}
            />
            <input type="submit" className="btn btn-primary" value="Post" />
          </div>
        </fieldset>
      </form>

      {/* Display forum posts */}
      <hr />
      <h1>Forum</h1>
      <div>
        {/* Show loading message while posts are being fetched */}
        {isLoading ? (
          <div>Loading posts...</div>
        ) : // Check if there are no posts
        posts.length === 0 ? (
          <span className="text-muted">No posts have been submitted.</span>
        ) : (
          // Map through posts array and display each post
          posts.map((x) => (
            <div className="border my-3 p-3">
              <h6 className="text-primary">{x.username}</h6>
              <div dangerouslySetInnerHTML={{ __html: x.text }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
