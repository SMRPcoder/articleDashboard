import axios, { AxiosInstance, AxiosError } from "axios";



const Axios: AxiosInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    timeout: 5000,
});


Axios.interceptors.response.use(
    response => {
        return response;
    },
    (error: AxiosError) => {
        
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                console.error('Unauthorized:', error.response.data);
                // redirect to "/login";
            } else {
                // just console the error
                console.error('Error:', error.response.data);
            }
        } else if (error.request) {
            console.error('No response:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error); // Propagate the error
    }
);

export default Axios;