import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../logo.svg";
import ui from "../images/user.png";
import { getAllUsers, getUser, followUser, unfollowUser, getFollowingList, findUser } from "../data/repository";

export default function Social(props) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(getUser());
  const [followingList, setFollowingList] = useState([]);
  const [followingCount, setFollowingCount] = useState(currentUser.following);
  const [followersCount, setFollowersCount] = useState(currentUser.followers);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);

        // Fetch the current user's data from the server
        const currentUserData = await findUser(currentUser.username);
        setCurrentUser(currentUserData);
        setFollowingCount(currentUserData.following);
        setFollowersCount(currentUserData.followers);

        // Fetch the current user's following list from the server
        const followingData = await getFollowingList(currentUser.username);
        setFollowingList(followingData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, [currentUser.username]);

  const handleFollow = async (user) => {
    try {
      await followUser(currentUser.username, user.username);

      setFollowingList([...followingList, user.username]);
      setFollowingCount(followingCount + 1);
      setUsers(users.map(u => {
        if (u.username === user.username) {
          return { ...u, followers: u.followers + 1 };
        }
        return u;
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (user) => {
    try {
      await unfollowUser(currentUser.username, user.username);

      setFollowingList(followingList.filter(username => username !== user.username));
      setFollowingCount(followingCount - 1);
      setUsers(users.map(u => {
        if (u.username === user.username) {
          return { ...u, followers: u.followers - 1 };
        }
        return u;
      }));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const isFollowing = (user) => {
    return followingList.includes(user.username);
  };

  return (
    <div>
      <h1 className="text-center display-4">Soil's Socials!</h1>
      {props.user !== null && (
        <div className="d-flex my-4">
          <img
            src={ui}
            alt="User Image Placeholder"
            className="img-fluid"
            style={{ maxWidth: "140px", marginRight: "20px" }}
          />
          <div>
            <h3>{props.user.username}</h3>
            <h5>{props.user.first_name} {props.user.last_name}</h5>
            <p>Following: {followingCount}</p>
            <p>Followers: {followersCount}</p>
          </div>
        </div>
      )}
      {users.length > 0 && (
        <div className="user-gallery">
          {users.map((user, index) => (
            <div key={index} className="card my-2">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">
                  {user.first_name} {user.last_name}
                </p>
                {currentUser.username !== user.username && (
                  isFollowing(user) ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUnfollow(user)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleFollow(user)}
                    >
                      Follow
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
