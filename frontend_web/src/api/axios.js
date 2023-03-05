import axios from 'axios';

export default axios.create({
    baseURL: 'https://p2bp.herokuapp.com/api'
});
