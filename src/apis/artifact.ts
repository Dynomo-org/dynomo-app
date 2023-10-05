import network from "@/utils/network";
import { ArtifactList } from "./artifact.types";

const GET_APP_ARTIFACT_LIST_KEY = "GET_APP_ARTIFACT_LIST"
const GET_USER_ARTIFACT_LIST_KEY = "GET_USER_ARTIFACT_LIST"

const getArtifactsListByAppID = (appID: string): Promise<ArtifactList> => network.get(`/artifacts?app_id=${appID}`)
const getArtifactsListByOwnerID = (): Promise<ArtifactList> => network.get(`/artifacts`)

export default {
    GET_APP_ARTIFACT_LIST_KEY,
    GET_USER_ARTIFACT_LIST_KEY,

    getArtifactsListByAppID,
    getArtifactsListByOwnerID,
}