import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteLeadAPI, getLeadsAPI } from "../services/allAPI";

const Lead = ({ insidemanager }) => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeads = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("Fetching leads...");
                const allLeads = await getLeadsAPI();
                console.log("All leads data:", allLeads);

                const userRole = sessionStorage.getItem("role");
                const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
                const salespersonName = storedUser.username ? storedUser.username.trim().toLowerCase() : "";

                if (!salespersonName) {
                    console.error("Salesperson name is missing in session storage!");
                    setError("Salesperson information is missing.");
                    return;
                }

                console.log("User Role:", userRole);
                console.log("Salesperson Name:", salespersonName);

                let filteredLeads = [];
                if (userRole === "manager") {
                    filteredLeads = allLeads;
                } else {
                    filteredLeads = allLeads.filter((lead) => {
                        const assignedTo = lead.assignedTo?.trim().toLowerCase() || "";
                        console.log(`Checking lead: ${lead.name}, Assigned To: ${assignedTo}`);
                        return assignedTo === salespersonName;
                    });
                }

                console.log("Filtered leads:", filteredLeads);
                setLeads(filteredLeads);
            } catch (err) {
                console.error("Error fetching leads:", err);
                setError("Failed to fetch leads. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

     const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this lead?")) {
                try {
                    await deleteLeadAPI(id);
                    setLeads((prev) => prev.filter((lead) => lead._id !== id));
                    alert("lead deleted successfully!");
                } catch (error) {
                    console.error("Error deleting lead:", error);
                    alert("Failed to delete lead.");
                }
            }
        };

    if (error) {
        return <Container className="p-4"><p className="text-danger">{error}</p></Container>;
    }

    return (
        <Container className="p-4">
            <h2 className="text-center mb-4 text-primary fw-bold">Leads</h2>

            {insidemanager && (
                <Link to="/lead-add">
                    <Button className="btn btn-success mb-3" style={{ width: "200px" }}>
                        Add leads ➕
                    </Button>
                </Link>
            )}

            {loading ? (
                <p className="text-center">Loading leads...</p>
            ) : (
                <Table striped bordered hover responsive className="text-center shadow-sm p-3 bg-white rounded">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.length > 0 ? (
                            leads.map((lead, index) => (
                                <tr key={lead._id}>
                                    <td>{index + 1}</td>
                                    <td>{lead.name}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.phone}</td>
                                    <td>{lead.assignedTo}</td>
                                    <td>{lead.status}</td>
                                    <td>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <Link to={`/lead-view/${lead._id}`}>
                                                <Button className="btn btn-info">
                                                    <i className="fa-regular fa-eye"></i>
                                                </Button>
                                            </Link>
                                            {insidemanager && (
                                                <>
                                                    <Link to={`/lead-edit/${lead._id}`}>
                                                        <Button className="btn btn-warning">
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Button>
                                                    </Link>
                                                    <Button className="btn btn-danger" onClick={() => handleDelete(lead._id)}>
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
                                <td colSpan="7" className="text-center text-muted">
                                    No leads found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Lead;