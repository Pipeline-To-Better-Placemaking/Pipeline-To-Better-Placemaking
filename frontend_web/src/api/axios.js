import axios from 'axios';

export default axios.create({
    baseURL: 'http://p2bp.herokuapp.com/api'
});
