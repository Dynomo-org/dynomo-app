import network from "@/utils/network";
import { Content } from "./content.types"

const GET_CONTENT_LIST_KEY = "APP_CONTENT_LIST"
const GET_CONTENT_DETAIL = "APP_CONTENT_DETAIL"

const createContent = (content: Content) => network.post('/app/content', JSON.stringify(content))
const getContents = (appID: string): Promise<Content[]> => network.get(`/app/contents?app_id=${appID}`)
const getContentDetail = (contentID: string): Promise<Content> => network.get(`/app/content?content_id=${contentID}`)
const updateContent = (content: Partial<Content>) => network.put(`/app/content`, JSON.stringify(content))

export default {
    GET_CONTENT_DETAIL,
    GET_CONTENT_LIST_KEY,

    createContent,
    getContents,
    getContentDetail,
    updateContent
}