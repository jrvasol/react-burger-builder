import axios from 'axios';

const firebaseInstance = axios.create({
    baseURL: "https://react-burger-builder-f5a6f.firebaseio.com/"
});

export default firebaseInstance;