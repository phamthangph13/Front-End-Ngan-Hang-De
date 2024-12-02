import axios, { CreateAxiosDefaults } from "axios";
import { useRouter } from "vue-router";

const iSDev = import.meta.env.DEV

const config: CreateAxiosDefaults = {
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },

}

const client = axios.create(config);

// add Interceptors for handle request and response if 401
!iSDev && client.interceptors.response.use(
    // if response is success, return response
    response => response,
    error => {


        // if current page is login page, do nothing
        if (window.location.pathname === '/auth') {
            return Promise.reject(error);
        }

        // if user is not authenticated, remove token and redirect to login page
        if (error.response.status === 401) {
            sessionStorage.removeItem('token');
            alert('Your session is expired, please login again');
            window.location.reload();
        }

        return Promise.reject(error);
    }
)

const token = sessionStorage.getItem('token');
if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default client;
export { config };
