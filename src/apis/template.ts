import network from "@/utils/network";
import { CreateTemplateRequest, Template, TemplateList } from "./template.types";

const GET_TEMPLATE_INFO_KEY = "GET_TEMPLATE_INFO"
const GET_TEMPLATE_LIST_KEY = "GET_TEMPLATE_LIST"

const createTemplate = (template: CreateTemplateRequest) => network.post("/template", JSON.stringify(template))
const getTemplateByID = (id: string):Promise<Template> => network.get(`/template?id=${id}`)
const getTemplateList = ():Promise<TemplateList> => network.get("/templates")
const editTemplate = (template: Template) => network.put("/template", JSON.stringify(template))

export default {
    GET_TEMPLATE_INFO_KEY,
    GET_TEMPLATE_LIST_KEY,

    createTemplate,
    getTemplateByID,
    getTemplateList,
    editTemplate
}