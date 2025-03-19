import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="bg-primary text-light d-flex flex-column align-items-center p-4 vh-100 shadow"
      style={{ width: "250px" }}
    >
      <img
        width="100"
        height="100"
        className="rounded-circle m-3 border border-light"
        src="https://cdn3.iconfinder.com/data/icons/user-group-black/100/user-upload-512.png"
        alt="User"
      />

      <h5 className="text-center fw-bold">User Name</h5>

      <nav className="d-flex flex-column mt-3">
        <Link to="/campaign" className="text-light fw-semibold my-2 text-decoration-none">
          📢 Campaign
        </Link>
        <Link to="/leads" className="text-light fw-semibold my-2 text-decoration-none">
          📋 Leads
        </Link>
        {/* Uncomment these when needed */}
         <Link to="/follow-up" className="text-light fw-semibold my-2 text-decoration-none">
          🔄 Follow-up
        </Link>
        <Link to="/customer" className="text-light fw-semibold my-2 text-decoration-none">
          👤 Customers
        </Link> 
      </nav>
    </aside>
  );
};

export default Sidebar;
