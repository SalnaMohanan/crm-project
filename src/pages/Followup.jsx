import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Followup = ({insidemanager}) => {
  const followup = [
    { contactname: "abc", type: "Email", Date: "2025-03-10", status: "Pending" },
    { contactname: "xyz", type: "Phone Call", Date: "2025-03-15", status: "Completed" },
  ];

  return (
    <Container className="p-4">
      <h1 className="text-center mb-4 text-primary fw-bold">Follow-Up</h1>

      {/* Show "Add New Follow-up" button only if user is a salesperson */}
      {!insidemanager && (
        <div className="text-end">
          <Link to="/followup-add">
            <Button className="btn btn-success mb-3" style={{ width: "200px" }}>
              Add New Follow-up ➕
            </Button>
          </Link>
        </div>
      )}

      {/* Show Follow-up Table only if `insidemanager` is true */}
      
        <Table striped bordered hover responsive className="text-center shadow-sm bg-white rounded">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Contact Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {followup.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/followup-view/${index}`} className="text-primary fw-bold text-decoration-none">
                    {item.contactname}
                  </Link>
                </td>
                <td>{item.type}</td>
                <td>{item.Date}</td>
                <td>
                  <span className={`badge ${item.status === "Pending" ? "bg-warning" : "bg-success"}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      
    </Container>
  );
};

export default Followup;
