import network from "@/utils/network";
import { App, AppList, CreateAppRequest } from "./app.types";

const GET_APP_LIST_KEY = "APP_LIST"
const GET_APP_DETAIL_KEY = "APP_DETAIL"

const createApp = (payload: CreateAppRequest) => network.post('/app', JSON.stringify(payload))
const updateApp = (app: Partial<App>) => network.put('/app', JSON.stringify(app))
const getAppDetail = (appId: string): Promise<App> => network.get(`/app?id=${appId}`)
const getAppList = (): Promise<AppList> => network.get('/apps')

export default {
    GET_APP_LIST_KEY,
    GET_APP_DETAIL_KEY,

    createApp,
    updateApp,
    getAppDetail,
    getAppList
}