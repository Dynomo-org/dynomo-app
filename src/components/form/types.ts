export interface FormProps {
    onSubmit?: () => void
    children: any
}

export interface FormItemProps {
    name: string
    label: string
    type: "text" | "password"
    multiline?: boolean
    helperText?: string
    placeholder?: string
    validation?: {
        required?: boolean
        pattern?: RegExp
        minLength?: number
    }
}