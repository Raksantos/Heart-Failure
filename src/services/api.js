import axios from 'axios';

const API = axios.create({
    baseURL: 'https://datascience-backend-xug6u5kcpq-uc.a.run.app/',
    headers: {
        "Content-type": "application/json"
    }
});

export default API;