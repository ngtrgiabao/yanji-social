import React from 'react';
import "../main/main.css";
import { useSelector } from "react-redux";
import RegisterAdmin from "./RegisterAdmin";

const AdminManagement = () => {
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser?.data;
  });
  
  return (
    <div className="main_admin">
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Hello {currentUser?.username}</h1>
            <p>Welcome to your Admin Management</p>
          </div>
        </div>
        <RegisterAdmin />
      </div>
    </div>
  );
}

export default AdminManagement