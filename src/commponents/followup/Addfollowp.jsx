import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FollowupAdd = () => {
  const navigate = useNavigate();

  const [followupData, setFollowupData] = useState({
    contactname: "",
    type: "",
    date: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFollowupData({ ...followupData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!followupData.contactname.trim()) newErrors.contactname = "Contact Name is required.";
    if (!followupData.type.trim()) newErrors.type = "Follow-up Type is required.";
    if (!followupData.date) newErrors.date = "Date is required.";
    if (!followupData.status) newErrors.status = "Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Follow-up Added Successfully ✅");
      console.log("Added Follow-up:", followupData);
      navigate("/follow-up");
    }
  };

  return (
    <Container className="p-4 d-flex justify-content-center">
      <div style={{ width: "400px" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Add Follow-Up</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Contact Name</Form.Label>
            <Form.Control
              type="text"
              name="contactname"
              value={followupData.contactname}
              onChange={handleChange}
              placeholder="Enter contact name"
              isInvalid={!!errors.contactname}
            />
            <Form.Control.Feedback type="invalid">{errors.contactname}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Follow-up Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={followupData.type}
              onChange={handleChange}
              placeholder="Enter follow-up type (e.g., Email, Call)"
              isInvalid={!!errors.type}
            />
            <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={followupData.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={followupData.status}
              onChange={handleChange}
              isInvalid={!!errors.status}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit">
              Add Follow-Up ✅
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default FollowupAdd;
