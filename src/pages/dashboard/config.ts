import { FormItemProps } from "@/components/form/types"
import { App } from "./types"

const dummyData: App[] = [
    {
        id: '1213',
        img: 'https://github.com/Dynomo-org/master-storage-1/blob/main/assets/default-icon.png?raw=true',
        package_name: "com.example.example",
        name: "Example App"
    },
    {
        id: '12123',
        img: 'https://github.com/Dynomo-org/master-storage-1/blob/main/assets/default-icon.png?raw=true',
        package_name: "com.example.example",
        name: "Example App"
    },
]

const addAppForm: FormItemProps[] = [
    {
        name: "app_name",
        label: "App Name",
        type: "text",
        helperText: "App name can not be empty",
        validation: {
            required: true,
        }
    },
    {
        name: "package_name",
        label: "Package Name",
        type: "text",
        placeholder: "com.example.some_app",
        helperText: "Package name should not be empty and follow the format",
        validation: {
            required: true
        }
    },
]

export default {
    addAppForm,
    dummyData
}