import axios from 'axios';

const axios_instance = axios.create({
    baseURL: "https://burger-cb919.firebaseio.com/"
});

export default axios_instance;