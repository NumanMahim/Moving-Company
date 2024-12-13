import React from "react";
import "../styles/AdminFooter.css";

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-container">
        <p>&copy; {new Date().getFullYear()} Packers & Movers - Admin Panel. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;
