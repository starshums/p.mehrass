import axios from "axios";

const HOST = process.env.REACT_APP_API_ENDPOINT;

export const setToken = token => {
    if(token) {
        axios.defaults.headers.common["auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["auth-token"];
    }
}

export const call = async (method, path, data) => {
    const response = await axios[method](`${HOST}${path}`, data);
    return response;
}

export default { call, setToken };