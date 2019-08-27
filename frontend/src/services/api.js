import axios from 'axios';

import constantes from "../constantes";

const api = axios.create({
    baseURL: `${constantes.BASE_URL}`
});

export default api;