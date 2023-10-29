import { FormItemProps } from "@/components/form/types"

const templateForm: FormItemProps[] = [
    {
        name: "name",
        label: "Template Name",
        type: "text",
        placeholder: "My template",
        helperText: "Template Name cannot be empty",
        validation: {
            required: true,
        }
    },
    {
        name: "repository_url",
        label: "Repository URL",
        type: "text",
        placeholder: "https://github.com/dynomo/simple-wallpaper-base",
        helperText: "Repository URL cannot be empty",
        validation: {
            required: true,
        }
    }
]

export default {
    templateForm
}