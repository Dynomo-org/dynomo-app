import { FormItemProps } from "@/components/form/types"

const addContentForm: FormItemProps[] = [
    {
        name: "title",
        label: "Title",
        type: "text",
        helperText: "Content Title can not be empty",
        validation: {
            required: true,
        }
    },
]

export default {
    addContentForm
}