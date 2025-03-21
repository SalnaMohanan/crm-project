import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const role = sessionStorage.getItem("role");

  return (
    <aside
      className="bg-primary text-light d-flex flex-column align-items-center p-4 vh-100 shadow"
      style={{ width: "250px" }}
    >

      <nav className="d-flex flex-column mt-5">

<Link
  to={role === "manager" ? "/campaign" : "/user-campaign"}
  className="text-light fw-semibold my-2 text-decoration-none"
  style={{ textDecoration: "none" }}
>
📢 Campaign
</Link>
        <Link to={role === "manager" ? "/leads" : "/user-leads"} className="text-light fw-semibold my-2 text-decoration-none">
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
