import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Campaign = () => {
  return (
    <>
    <Container className="p-4">
      
      <h2 className="text-center mb-4 text-primary fw-bold">Campaign</h2>

      
        <Link to="/campaign-add">
          <Button className="btn btn-success mb-3" style={{ width: "200px" }}>
            Add New Campaign ➕
          </Button>
        </Link>
      

      <Table striped bordered hover responsive className="text-center shadow-sm p-3 bg-white rounded">
        <thead className="bg-dark text-white">
          <tr>
            <th>#</th>
            <th>Campaign Name</th>
            <th>Campaign Type</th>
            <th>Proposed Begin Date</th>
            <th>Proposed End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Link to={`/campaign-view`}>
                      <Button className="btn btn-info">
                        <i className="fa-regular fa-eye"></i>
                      </Button>
                    </Link>

                   
                      <>
                        <Link to={`/campaign-edit`}>
                          <Button className="btn btn-warning">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Button>
                        </Link>
                        <Button className="btn btn-danger" onClick={() => handleDelete(campaign._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </>
                    
                  </div>
                </td>
              </tr>
            {/* ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">No campaigns found</td>
            </tr>
          )} */}
        </tbody>
      </Table>
    </Container>
    </>
  )
}

export default Campaign