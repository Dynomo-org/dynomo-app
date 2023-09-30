
const authFormMap = {
    login: [
        {
            name: "email",
            label: "Email",
            type: "text",
            helperText: "Email must be in form example@domain.com",
            validation: {
                required: "invalid",
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            }
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            helperText: "Password can not be empty",
            validation: {
                required: true,
            }
        },
    ],
    register: [
        {
            name: "full_name",
            label: "Full Name",
            type: "text",
            helperText: "Full name can not be empty",
            validation: {
                required: true,
                maxLength: 25,
            }
        },
        {
            name: "email",
            label: "Email",
            type: "text",
            helperText: "Email must be in form example@domain.com",
            validation: {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            }
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            helperText: "Password can not be empty",
            validation: {
                required: true,
                maxLength: 16,
            }
        },
    ]
}

export default {
    authFormMap
}