import network from "@/utils/network"
import { CreateKeystoreRequest, KeystoreList } from "./keystore.types"

const GET_KEYSTORE_LIST_KEY = "GET_KEYSTORE_LIST"

const createKeystore = (payload: CreateKeystoreRequest) => network.post("/keystore", JSON.stringify(payload))
const getKeystoreList = (): Promise<KeystoreList> => network.get("/keystores")

export default {
    GET_KEYSTORE_LIST_KEY,

    createKeystore,
    getKeystoreList
}