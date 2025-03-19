import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Camadd = () => {
  const navigate=useNavigate();
  const [campaignData, setCampaignData] = useState({
    name: "",
    type: "",
    beginDate: "",
    endDate: "",
    status: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const validateForm = (data) => {
    let newErrors = {};
    const validURL = /^(http|https):\/\/[^ "]+$/;

    if (!data.name.trim()) newErrors.name = "Campaign name is required.";
    if (!data.type.trim()) newErrors.type = "Campaign type is required.";
    if (!data.beginDate) newErrors.beginDate = "Begin date is required.";
    if (!data.endDate) newErrors.endDate = "End date is required.";

    if (data.beginDate && data.endDate && new Date(data.endDate) < new Date(data.beginDate)) {
      newErrors.endDate = "End date cannot be before begin date.";
    }

    if (!data.status) newErrors.status = "Please select a status.";
    if (!data.description.trim()) newErrors.description = "Description is required.";

    if (data.image && !validURL.test(data.image)) {
      newErrors.image = "Enter a valid image URL.";
    }

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...campaignData, [name]: value };
    setCampaignData(updatedData);
    validateForm(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      console.log(" Campaign Added:", campaignData);
      alert(" Campaign added successfully!");

      // Reset form
      setCampaignData({
        name: "",
        type: "",
        beginDate: "",
        endDate: "",
        status: "",
        description: "",
        image: "",
      });
      setErrors({});
      setFormValid(false);
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold"> Create a Campaign</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={campaignData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={campaignData.type}
                onChange={handleChange}
                isInvalid={!!errors.type}
              />
              <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Begin Date</Form.Label>
              <Form.Control
                type="date"
                name="beginDate"
                value={campaignData.beginDate}
                onChange={handleChange}
                isInvalid={!!errors.beginDate}
              />
              <Form.Control.Feedback type="invalid">{errors.beginDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={campaignData.endDate}
                onChange={handleChange}
                isInvalid={!!errors.endDate}
              />
              <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={campaignData.status}
                onChange={handleChange}
                isInvalid={!!errors.status}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Planned">Planned</option>
                <option value="Completed">Completed</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Image (URL)</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={campaignData.image}
                onChange={handleChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={campaignData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit" className="me-2" disabled={!formValid}>
             Add Campaign
          </Button>
          <Button variant="secondary" onClick={() => navigate("/campaign")}>
                      Cancel
                    </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Camadd;
