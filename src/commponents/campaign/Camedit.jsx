import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Camedit = ({ campaign, onUpdate }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: campaign?.name || "",
    type: campaign?.type || "",
    beginDate: campaign?.beginDate || "",
    endDate: campaign?.endDate || "",
    status: campaign?.status || "",
    description: campaign?.description || "",
    image: campaign?.image || "",
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(campaign?.image || "");

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Campaign name is required.";
    if (!formData.type.trim()) newErrors.type = "Campaign type is required.";
    if (!formData.beginDate) newErrors.beginDate = "Begin date is required.";
    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    } else if (formData.beginDate && formData.endDate < formData.beginDate) {
      newErrors.endDate = "End date cannot be before begin date.";
    }
    if (!formData.status) newErrors.status = "Please select a status.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    
    // Validate Image URL
    const validURL = /^(http|https):\/\/[^ "]+$/;
    if (formData.image && !validURL.test(formData.image)) {
      newErrors.image = "Enter a valid image URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update image preview if it's a URL
    if (name === "image") {
      setPreviewImage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
      navigate(-1);
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4"> Edit Campaign</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="campaignName">
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="campaignType">
              <Form.Label>Campaign Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                isInvalid={!!errors.type}
              />
              <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="beginDate">
              <Form.Label>Begin Date</Form.Label>
              <Form.Control
                type="date"
                name="beginDate"
                value={formData.beginDate}
                onChange={handleChange}
                isInvalid={!!errors.beginDate}
              />
              <Form.Control.Feedback type="invalid">{errors.beginDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                isInvalid={!!errors.endDate}
              />
              <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="campaignStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
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
            <Form.Group controlId="imageURL">
              <Form.Label>Campaign Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
            </Form.Group>
            {previewImage && (
              <div className="text-center mt-2">
                <img
                  src={previewImage}
                  alt="Campaign Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px" }}
                  onError={() => setPreviewImage("")}
                />
              </div>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <Row className="d-flex justify-content-between mt-3">
          <Col md={4}>
            <Button variant="secondary" onClick={() => navigate(-1)} className="w-100">
              ⬅ Back
            </Button>
          </Col>
          <Col md={4}>
            <Button variant="primary" type="submit" className="w-100">
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Camedit;
