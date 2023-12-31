import { FormItemProps } from "@/components/form/types"

const addKeystoreForm: FormItemProps[] = [
    {
        name: "keystore_name",
        label: "Keystore Name",
        type: "text",
        placeholder: "My Keystore",
        helperText: "Keystore name can not be empty",
        validation: {
            required: true,
        }
    },
    {
        name: "full_name",
        label: "Full Name",
        type: "text",
        placeholder: "John Doe",
        helperText: "Full name can not be empty",
        validation: {
            required: true,
        }
    },
    {
        name: "organization",
        label: "Organization",
        type: "text",
        placeholder: "Google",
    },
    {
        name: "country",
        label: "Country Code",
        type: "text",
        placeholder: "ID",
        helperText: "Country can not be empty",
        validation: {
            required: true,
        }
    },
    {
        name: "alias",
        label: "Alias",
        type: "text",
        placeholder: "my_keystore",
        helperText: "Alias can not be empty",
        validation: {
            required: true,
        }
    },
    {
        name: "key_password",
        label: "Key Password",
        type: "password",
        helperText: "Key password must be at least 6 digit numbers",
        validation: {
            required: true,
            minLength: 6,
            pattern: /^\d+$/i,
        }
    },
    {
        name: "store_password",
        label: "Store Password",
        type: "password",
        helperText: "Store must be at least 6 digit numbers",
        validation: {
            required: true,
            minLength: 6,
            pattern: /^\d+$/i,
        }
    },
]

export default {
    addKeystoreForm
}