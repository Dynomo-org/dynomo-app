import network from "@/utils/network"
import { BuildStatus, CreateKeystoreRequest, KeystoreList } from "./keystore.types"

const GET_BUILD_KEYSTORE_LIST_KEY = "GET_BUILD_KEYSTORE_LIST"
const GET_BUILD_KEYSTORE_STATUS_KEY = "GET_BUILD_KEYSTORE_STATUS"
const GET_KEYSTORE_LIST_KEY = "GET_KEYSTORE_LIST"

const createKeystore = (payload: CreateKeystoreRequest) => network.post("/keystore", JSON.stringify(payload))
const getBuildKeystoreList = (): Promise<KeystoreList> => network.get("/keystores?build_status=1")
const getBuildKeystoreStatus = (id: string): Promise<BuildStatus> => network.get(`/build-status/keystore?build_id=${id}`)
const getKeystoreList = (): Promise<KeystoreList> => network.get("/keystores")

export default {
    GET_BUILD_KEYSTORE_LIST_KEY,
    GET_BUILD_KEYSTORE_STATUS_KEY,
    GET_KEYSTORE_LIST_KEY,

    createKeystore,
    getBuildKeystoreList,
    getBuildKeystoreStatus,
    getKeystoreList
}