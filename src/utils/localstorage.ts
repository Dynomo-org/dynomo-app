const get = (key: string): string => localStorage.getItem(key) || "{}"
const getJSON = (key: string) => JSON.parse(get(key))

const set = (key: string, value: string) => localStorage.setItem(key, value)
const setJSON = (key: string, value: string) => set(key, JSON.stringify(value))

export default {
    getJSON,
    setJSON
}