import axios from 'axios';
// window.axios = axios;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const axiosClient = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token')
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, error => Promise.reject(error))

axiosClient.interceptors.response.use(response => response.data, error => {
    if(error.response && error.response.status === 401) {
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
    }
    return Promise.reject(error)
})

export default axiosClient;
