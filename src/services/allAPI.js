import SERVER_URL from "./serverURL.JS";
import commonAPI from "./commonAPI"
// registerAPI called in auth

export const registerAPI = async(reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody);
};

// loginAPI calledby auth when clicked on button
export const loginAPI = async(reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody);
};