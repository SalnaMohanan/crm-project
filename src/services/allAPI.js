import SERVER_URL from "./serverURL.JS";
import commonAPI from "./commonAPI"
import axios from "axios";


// registerAPI called in auth

export const registerAPI = async(reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody);
};

// loginAPI calledby auth when clicked on button
export const loginAPI = async(reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody);
};

// API to add a new campaign
export const addCampaignAPI = async(formData) => {
    return await axios.post(`${SERVER_URL}/add-campaign`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


// Fetch all campaigns

export const fetchCampaignsAPI = async() => {
    try {
        const response = await fetch(`${SERVER_URL}/campaigns`); // Remove "/api"

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching campaigns:", error.message);
        return [];
    }
};
// detet api
export const deleteCampaignAPI = async(id) => {
    try {
        const response = await commonAPI("DELETE", `${SERVER_URL}/campaigns/${id}`);

        if (response && response.data) {
            return response.data;
        } else {
            throw new Error("No response data received.");
        }
    } catch (error) {
        console.error("Error deleting campaign:", error);
        throw new Error(error.response ? error.response.data : error.message);
    }
}; // ✅ Fetch campaign by ID
export const getCampaignByIdAPI = async(id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/campaigns/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching campaign:", error);
        throw error;
    }
};


// EDIT
export const updateCampaignAPI = async(id, updatedData) => {
    await fetch(`${SERVER_URL}/campaigns/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
};

//add leads

export const addLeadAPI = async(reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/add-lead`, reqBody);
};

// get all leads
export const getLeadsAPI = async() => {
    try {
        console.log("Calling API:", `${SERVER_URL}/all-leads`); // ✅ Debug log
        const response = await axios.get(`${SERVER_URL}/all-leads`);
        console.log("API Response:", response.data); // ✅ Debug log
        return response.data;
    } catch (error) {
        console.error("Error in getLeadsAPI:", error);
        throw error;
    }
};

// factch  salesperson
export const getSalespersonsAPI = async() => {
    try {
        const response = await axios.get(`${SERVER_URL}/salespersons`);
        return response.data;
    } catch (error) {
        console.error("Error fetching salespersons:", error);
        throw error;
    }
};

//lead view
export const getLeadByIdAPI = async(id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/lead-view/${id}`); // Remove extra "/"
        return response.data;
    } catch (error) {
        console.error("Error fetching lead:", error);
        throw error;
    }
};
// detet lead
export const deleteLeadAPI = async(id) => {
    try {
        const response = await commonAPI("DELETE", `${SERVER_URL}/leads/${id}`);

        if (response && response.data) {
            return response.data;
        } else {
            throw new Error("No response data received.");
        }
    } catch (error) {
        console.error("Error deleting lead:", error);
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// EDIT
export const updateeadAPI = async(id, updatedData) => {
    await fetch(`${SERVER_URL}/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
};

//add followup
export const addFollowupAPI = async(reqBody) => {
    try {
        const response = await commonAPI("POST", `${SERVER_URL}/add-lead`, reqBody);
        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};


// add customer

export const addCustomerAPI = async(customerData) => {
    try {
        const response = await commonAPI("POST", `${SERVER_URL}/add-customer`, customerData);
        return response;
    } catch (error) {
        console.error("Error adding customer:", error);
        throw error;
    }
};


// Fetch all customers
export const getCustomersAPI = async() => {
    return await commonAPI("GET", `${SERVER_URL}/customers`);
}; // getby id

export const getCustomerByIdAPI = async(customerId) => {
    return await commonAPI("GET", `${SERVER_URL}/customer-view/${customerId}`);
};

// Update customer by ID
export const updateCustomerByIdAPI = async(id, customerData) => {
    return await commonAPI("PUT", `${SERVER_URL}/customer-edit/${id}`, customerData);
};

// detet customer
export const deleteCustomerAPI = async(id) => {
    try {
        const response = await commonAPI("DELETE", `${SERVER_URL}/customer-delete/${id}`);

        if (response && response.data) {
            return response.data;
        } else {
            throw new Error("No response data received.");
        }
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw new Error(error.response ? error.response.data : error.message);
    }
};

//add contact
export const contactAPI = async(reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/contact`, reqBody);
};