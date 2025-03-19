import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Camview = () => {
  const navigate = useNavigate();

  

  return (
    <Container className="p-4">
      <Card className="shadow-lg">
       
          <Card.Img variant="top" src="" alt="no img"className="p-3 rounded" />
     
        <Card.Body>
          <h2 className="text-primary">name</h2>
          <p>
            <strong>Type:</strong> type
          </p>
          <p>
            <strong>Begin Date:</strong> beginDate
            
          </p>
          <p>
            <strong>End Date:</strong> endDate
          </p>
          <p>
            <strong>Status:</strong> <span className="badge bg-info">status</span>
          </p>
          <p>
            <strong>Description:</strong> description
          </p>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            ⬅ Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Camview;
