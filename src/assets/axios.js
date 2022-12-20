import axios from "axios";

export default axios.create({
    baseURL: 'https://nicenice-api.ap-northeast-1.elasticbeanstalk.com/'
});