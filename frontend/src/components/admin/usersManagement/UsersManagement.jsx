import React from "react";
import "../main/main.css";
import { useSelector } from "react-redux";

const UsersManagement = () => {
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser?.data;
  });
  return (
    <div className="main_admin">
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Hello {auth.user.username}</h1>
            <p>Welcome to your Admin Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;