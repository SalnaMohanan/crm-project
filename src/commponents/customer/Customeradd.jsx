import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomerAdd = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    industry: "",
    website: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // Validate Inputs
  const validateForm = () => {
    let newErrors = {};

    if (!customer.name.trim()) newErrors.name = "Name is required!";
    if (!customer.email.trim()) newErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(customer.email))
      newErrors.email = "Invalid email format!";

    if (!customer.phone.trim()) newErrors.phone = "Phone number is required!";
    else if (!/^\d{10,15}$/.test(customer.phone))
      newErrors.phone = "Phone must be 10-15 digits only!";

    if (!customer.address.trim()) newErrors.address = "Address is required!";
    if (!customer.company.trim()) newErrors.company = "Company is required!";
    if (!customer.industry.trim()) newErrors.industry = "Industry is required!";
    if (!customer.website.trim()) newErrors.website = "Website is required!";
    else if (!/^https?:\/\/.+\..+/.test(customer.website))
      newErrors.website = "Enter a valid URL (e.g., https://example.com)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/customer");
      }, 2000);
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold">Add New Customer</h2>

      {showAlert && <Alert variant="success">Customer added successfully!</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company *</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={customer.company}
                onChange={handleChange}
                isInvalid={!!errors.company}
              />
              <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={customer.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Industry *</Form.Label>
              <Form.Control
                type="text"
                name="industry"
                value={customer.industry}
                onChange={handleChange}
                isInvalid={!!errors.industry}
              />
              <Form.Control.Feedback type="invalid">{errors.industry}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Website *</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={customer.website}
                onChange={handleChange}
                isInvalid={!!errors.website}
              />
              <Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="notes"
                value={customer.notes}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="success" type="submit" className="me-2">
            Save Customer
          </Button>
          <Button variant="secondary" onClick={() => navigate("/customer")}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CustomerAdd;
