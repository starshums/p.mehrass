import axios from "axios";

const HOST = "http://localhost:5000/api/v1/";

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