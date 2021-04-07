import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
    // email
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }
    // username
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "username must be greater than 2",
            },
        ];
    }
    // email forgot @
    if (options.username.includes("@")) {
        return [
            {
                field: "username",
                message: "cannot have an @",
            },
        ];
    }
    // password
    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "password must be greater than 2",
            },
        ];
    }
    return null;
};
