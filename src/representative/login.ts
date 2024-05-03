import {InferType, object, string} from "yup";

export const loginSchema  = object().shape({
    username: string().required().label("Username"),
    password: string().required().label("Password")
});

export type LoginRequest = InferType<typeof loginSchema>;


