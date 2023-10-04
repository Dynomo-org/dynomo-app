import network from "@/utils/network";
import { UserInfo } from "./user.types";

const GET_USER_INFO_KEY = "USER_INFO"

const getUserInfo = (): Promise<UserInfo> => network.get('/user/info')

export default {
    GET_USER_INFO_KEY,
    
    getUserInfo
}