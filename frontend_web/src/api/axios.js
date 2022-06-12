import axios from 'axios';

export default axios.create({
    baseURL: 'https://measuringplacesd.herokuapp.com/api'
});