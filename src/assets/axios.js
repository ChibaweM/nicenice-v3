import axios from "axios";

export default axios.create({
    baseURL: 'http://nicenice-api.ap-northeast-1.elasticbeanstalk.com/'
});