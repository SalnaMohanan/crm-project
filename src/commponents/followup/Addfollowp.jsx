import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Followadd = () => {
  const navigate = useNavigate();

  const [followupData, setFollowupData] = useState({
    contactname: "",
    email: "",
    phone: "",
   date:"",
    status: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { contactname, value } = e.target;
    setLeadData({ ...followupData, [contactname]: value });
    setErrors({ ...errors, [contactname]: "" });
  };



  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Basic date format validation (YYYY-MM-DD)
  
    // Contact name validation
    if (!followupData.contactname.trim()) newErrors.contactname = "Contact Name is required!";
  
    // Email validation
    if (!followupData.email.trim() || !emailRegex.test(followupData.email))
      newErrors.email = "Valid Email is required!";
  
    // Phone number validation
    if (!followupData.phone.trim() || !phoneRegex.test(followupData.phone))
      newErrors.phone = "Valid 10-digit Phone Number is required!";
  
    // Status validation
    if (!followupData.status) newErrors.status = "Status selection is required!";
  
    // Notes validation
    if (!followupData.notes.trim()) newErrors.notes = "Notes are required!";
  
    // Date validation (Check if the date is in the correct format and not empty)
    if (!followupData.date.trim()) {
      newErrors.date = "Follow-up date is required!";
    } else if (!dateRegex.test(followupData.date)) {
      newErrors.date = "Invalid date format. Use YYYY-MM-DD.";
    } else if (new Date(followupData.date) < new Date()) {
      newErrors.date = "Follow-up date must be a future date.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Follow-up Data Submitted:", followupData);
      alert("Follow-up details added successfully!");

      // Reset form                                                                       
      setFollowupData({
        contactname: "",
    email: "",
    phone: "",
   date:"",
    status: "",
    notes: "",
      });

      navigate("/followup");
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold">📝 Add New Follow-up</h2>
      <Form onSubmit={handleSubmit}>
        {/* Name & Email */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Contact Name</Form.Label>
              <Form.Control
                type="text"
                name="contactname"
                value={followupData.contactname}
                onChange={handleChange}
                isInvalid={!!errors.contactname}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.contactname}</Form.Control.Feedback>
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
                required
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Phone & Source */}
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
                required
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
                required
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

        

        

        {/* Notes */}
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
                required
              />
              <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Centered Submit Button */}
        <Row className="d-flex justify-content-center mt-3">
          <Col md={4}>
            <Button variant="primary" type="submit" className="w-100">
              Add followup
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Followadd;