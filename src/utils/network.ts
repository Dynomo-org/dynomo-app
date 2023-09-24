import localStorage from "./localstorage"
import string from "./string"

const BASE_URL = "http://localhost:5000"

const buildURL = (endpoint: string) => `${BASE_URL}${endpoint}`
const buildRequestConfig = (config: any) => {
    let result = {
        ...config,
        headers: {
        }
    }
    const token = localStorage.getJSON("_DNM_AUTH")?.token || ""
    if (token) {
        result.headers.Authorization = `Bearer ${token}`
    }

    return result
}

const doRequest = async (endpoint: string, config: any) => {
    try {
        const response = await fetch(buildURL(endpoint), buildRequestConfig(config))
        const json = await response.json()
        if (!json.is_success || response.status < 200 || response.status > 299) {
            return Promise.reject(string.toTitleCase(json.error))
        }
        return Promise.resolve(json.data)
    } catch (err: any) {
        return Promise.reject(err.message.replace(/\b\w/g, (s: string) => s.toUpperCase()))
    }
}

const network = {
    get: async (endpoint: string, config: any) => {
        return doRequest(endpoint, config)
    },
    post: async (endpoint: string, body: any) => {
        return doRequest(endpoint, { method: 'post', body })
    },
    put: async (endpoint: string, body: any) => {
        return doRequest(endpoint, { method: 'put', body })
    },
    delete: async (endpoint: string) => {
        return doRequest(endpoint, { method: 'delete' })
    }
}

export default network