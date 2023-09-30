import network from "@/utils/network";
import { AppList, CreateAppRequest } from "./app.types";

const GET_APP_LIST_KEY = "APP_LIST"

const createApp = (payload: CreateAppRequest) => network.post('/app', JSON.stringify(payload))
const getAppList = (): Promise<AppList> => network.get('/apps')

export default {
    GET_APP_LIST_KEY,

    createApp,
    getAppList
}