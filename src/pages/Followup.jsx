import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFollowupAPI } from "../services/allAPI";

const Followup = ({ insidemanager }) => {
  const [followup, setFollowup] = useState([]); // State to store follow-up data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const response = await getFollowupAPI();
        
        if (response && Array.isArray(response.data)) {
          setFollowup(response.data); // Extract the data array
        } else {
          console.error("Unexpected response format", response);
          setError("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching follow-up data:", err); // Log the error
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowups();
  }, []); // Empty dependency array to run once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
      {insidemanager && (
        <Table striped bordered hover responsive className="text-center shadow-sm bg-white rounded">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Contact Name</th>
              <th>Submitted By</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {followup.map((followup, index) => (
              <tr key={followup.id}> {/* Use 'id' as the key */}
                <td>{index + 1}</td>
                <td>
                  <Link to={`/followup-view/${followup._id}`} className="text-primary fw-bold text-decoration-none">
                    {followup.name}
                  </Link>
                </td>
                <td>{followup.submittedby}</td>
                <td>{followup.date}</td>
                <td>
                  <span className={`badge ${followup.status === "Pending" ? "bg-warning" : "bg-success"}`}>
                    {followup.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Followup;
