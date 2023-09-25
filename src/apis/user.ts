import network from "@/utils/network";

const GET_USER_INFO_KEY = "user_info"

const getUserInfo = () => network.get('/user/info')

export default {
    GET_USER_INFO_KEY,
    getUserInfo
}