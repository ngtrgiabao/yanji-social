import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/manage-posts">Manage Posts</Link></li>
        <li><Link to="/admin/manage-users">Manage Users</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
