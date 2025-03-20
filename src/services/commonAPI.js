// commonAPI.js
import axios from 'axios';

const commonAPI = async(httpMethod, URL, reqBody, reqheader) => {
    const reqConfig = {
        method: httpMethod,
        url: URL,
        data: reqBody,
        headers: reqheader ? reqheader : { 'Content-Type': 'application/json' }
    };
    return await axios(reqConfig)
        .then(res => res)
        .catch(err => err);
};
export default commonAPI