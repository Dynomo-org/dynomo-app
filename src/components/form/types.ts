export interface FormProps {
    onSubmit: () => void
    children: any
}

export interface FormItemProps {
    name: string
    label: string
    type: "text" | "password"
    helperText?: string
    placeholder?: string
    validation?: {
        required: boolean
        pattern?: RegExp
    }
}