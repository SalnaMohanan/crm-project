import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addFollowupAPI } from "../../services/allAPI";

const Followadd = () => {
  const navigate = useNavigate();

  const [followupData, setFollowupData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    status: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFollowupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format

    if (!followupData.name.trim()) newErrors.name = "Contact Name is required!";
    if (!followupData.email.trim() || !emailRegex.test(followupData.email))
      newErrors.email = "Valid Email is required!";
    if (!followupData.phone.trim() || !phoneRegex.test(followupData.phone))
      newErrors.phone = "Valid 10-digit Phone Number is required!";
    if (!followupData.status) newErrors.status = "Status selection is required!";
    if (!followupData.notes.trim()) newErrors.notes = "Notes are required!";
    if (!followupData.date.trim() || !dateRegex.test(followupData.date))
      newErrors.date = "Invalid date format. Use YYYY-MM-DD.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setMessage({ text: "", type: "" });

    try {
      const response = await addFollowupAPI(followupData);
      console.log("API Response:", response);

      if (response?.status === 200) {
        setMessage({ text: "Follow-up added successfully!", type: "success" });
        setTimeout(() => navigate("/followup"), 2000);
      } else {
        setMessage({ text: "Failed to add Follow-up. Please check your data.", type: "danger" });
      }
    } catch (error) {
      console.error("Error adding Follow-up:", error);
      setMessage({ text: "Error adding Follow-up. Please try again.", type: "danger" });
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold">📝 Add New Follow-up</h2>

      {message.text && <Alert variant={message.type} className="text-center">{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Contact Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={followupData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={followupData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={followupData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Status</Form.Label>
              <Form.Select
                name="status"
                value={followupData.status}
                onChange={handleChange}
                isInvalid={!!errors.status}
              >
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Follow-up Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={followupData.date}
                onChange={handleChange}
                isInvalid={!!errors.date}
              />
              <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold">Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="notes"
                value={followupData.notes}
                onChange={handleChange}
                isInvalid={!!errors.notes}
              />
              <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center mt-3">
          <Col md={4}>
            <Button variant="primary" type="submit" className="w-100">
              Add Follow-up
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Followadd;
