// import React from 'react'
// import { Button, Container, Table } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// const Campaign = () => {
//   return (
//     <>
//     <Container className="p-4">
      
//       <h2 className="text-center mb-4 text-primary fw-bold">Campaign</h2>

      
//       {insideadmin && (
//         <Link to="/campadd">
//           <Button className="btn btn-success mb-3" style={{ width: "200px" }}>
//             Add New Campaign ➕
//           </Button>
//         </Link>
//       )}
      

//       <Table striped bordered hover responsive className="text-center shadow-sm p-3 bg-white rounded">
//         <thead className="bg-dark text-white">
//           <tr>
//             <th>#</th>
//             <th>Campaign Name</th>
//             <th>Campaign Type</th>
//             <th>Proposed Begin Date</th>
//             <th>Proposed End Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
          
//               <tr>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td>
//                   <div style={{ display: "flex", gap: "10px" }}>
//                     <Link to={`/campaign-view`}>
//                       <Button className="btn btn-info">
//                         <i className="fa-regular fa-eye"></i>
//                       </Button>
//                     </Link>

                   
//                       <>
//                         <Link to={`/campaign-edit`}>
//                           <Button className="btn btn-warning">
//                             <i className="fa-solid fa-pen-to-square"></i>
//                           </Button>
//                         </Link>
//                         <Button className="btn btn-danger" onClick={() => handleDelete(campaign._id)}>
//                           <i className="fa-solid fa-trash"></i>
//                         </Button>
//                       </>
                    
//                   </div>
//                 </td>
//               </tr>
//             {/* ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center text-muted">No campaigns found</td>
//             </tr>
//           )} */}
//         </tbody>
//       </Table>
//     </Container>
//     </>
//   )
// }

// export default Campaign

import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Campaign = ({ insidemanager }) => {
  const [campaigns, setCampaigns] = useState([]); // State to hold campaign data

  useEffect(() => {
    // Fetch campaigns from API or local storage (Placeholder for now)
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns"); // Replace with actual API endpoint
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await fetch(`/api/campaigns/${id}`, { method: "DELETE" }); // Replace with actual API
        setCampaigns(campaigns.filter((campaign) => campaign._id !== id)); // Update state
      } catch (error) {
        console.error("Error deleting campaign:", error);
      }
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold">Campaign</h2>

      {/* Add New Campaign Button (Only for Manager) */}
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
          {campaigns.length > 0 ? (
            campaigns.map((campaign, index) => (
              <tr key={campaign._id}>
                <td>{index + 1}</td>
                <td>{campaign.name}</td>
                <td>{campaign.type}</td>
                <td>{campaign.beginDate}</td>
                <td>{campaign.endDate}</td>
                <td>{campaign.status}</td>
                <td>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    {/* View Button */}
                    <Link to={`/campaign-view/${campaign._id}`}>
                      <Button className="btn btn-info">
                        <i className="fa-regular fa-eye"></i>
                      </Button>
                    </Link>

                    {/* Edit & Delete (Only for Manager) */}
                    {insidemanager && (
                      <>
                        <Link to={`/campedit/${campaign._id}`}>
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
    </Container>
  );
};

export default Campaign;
