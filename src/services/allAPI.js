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