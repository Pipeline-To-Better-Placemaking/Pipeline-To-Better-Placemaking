import axios from 'axios';

// do not change this to localhost when pushing to the branch
export default axios.create({
    baseURL: 'http://localhost:3000/api'
});
