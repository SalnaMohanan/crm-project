import React, { useEffect, useState } from "react";
import { Button, Container, Table, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteCampaignAPI, fetchCampaignsAPI } from "../services/allAPI";

const Campaign = ({ insidemanager }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage] = useState(5); // Items per page

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaignsAPI();
        setCampaigns(data);
      } catch (error) {
        console.error("Error loading campaigns:", error);
      }
    };
    loadCampaigns();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await deleteCampaignAPI(id);
        setCampaigns((prev) => prev.filter((campaign) => campaign._id !== id));
        alert("Campaign deleted successfully!");
      } catch (error) {
        console.error("Error deleting campaign:", error);
        alert("Failed to delete campaign.");
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold">Campaigns</h2>

      {/* Add New Campaign Button (Only for Managers) */}
      {insidemanager && (
        <Link to="/campaign-add">
          <Button className="btn btn-success mb-3" style={{ width: "200px" }}>
            Add New Campaign ➕
          </Button>
        </Link>
      )}

      {/* Campaign Table */}
      <Table striped bordered hover responsive className="text-center shadow-sm bg-white rounded">
        <thead className="bg-dark text-white">
          <tr>
            <th>#</th>
            <th>Campaign Name</th>
            <th>Campaign Type</th>
            <th>Begin Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCampaigns.length > 0 ? (
            currentCampaigns.map((campaign, index) => (
              <tr key={campaign._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{campaign.campaignname}</td>
                <td>{campaign.type}</td>
                <td>{new Date(campaign.beginDate).toLocaleDateString()}</td>
                <td>{new Date(campaign.endDate).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${campaign.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                    {campaign.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    {/* View Button */}
                    <Link to={`/campaign-view/${campaign._id}`}>
                      <Button className="btn btn-info">
                        <i className="fa-regular fa-eye"></i>
                      </Button>
                    </Link>

                    {/* Edit & Delete (Only for Managers) */}
                    {insidemanager && (
                      <>
                        <Link to={`/campaign-edit/${campaign._id}`}>
                          <Button className="btn btn-warning">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Button>
                        </Link>
                        <Button className="btn btn-danger" onClick={() => handleDelete(campaign._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">No campaigns found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        />
      </Pagination>
    </Container>
  );
};

export default Campaign;
