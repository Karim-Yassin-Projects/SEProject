import {InferType, object, string} from "yup";
import {representatives} from "./users.ts";

export const loginSchema  = object().shape({
    username: string().required().label("Username"),
    password: string().required().label("Password")
});

export type LoginRequest = InferType<typeof loginSchema>;

export function login(username: string, password: string): boolean {
    return representatives.find(user => user.username === username && user.password === password) !== undefined;
}


