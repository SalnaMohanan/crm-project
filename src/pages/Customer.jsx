import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteCustomerAPI, getCustomersAPI } from "../services/allAPI";

const Customer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomersAPI();
        setCustomers(response?.data || []);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to fetch customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomerAPI(id);
        setCustomers((prev) => prev.filter((customer) => customer._id !== id));
        alert("Customer deleted successfully!");
      } catch (error) {
        alert("Failed to delete customer.");
      }
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold">Customer Management</h2>

      {loading ? (
        <p className="text-center">Loading customers...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : customers.length > 0 ? (
        <Table striped bordered hover responsive className="shadow-sm text-center">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="info" onClick={() => navigate(`/customer-view/${customer._id}`)}>
                      <i className="fa-solid fa-eye"></i>
                    </Button>
                    <Button variant="warning" onClick={() => navigate(`/customer-edit/${customer._id}`)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center mt-4">No customers found.</p>
      )}
    </Container>
  );
};

export default Customer;
