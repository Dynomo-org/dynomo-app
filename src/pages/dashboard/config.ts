import { FormItemProps } from "@/components/form/types"

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
    addAppForm
}