import {InferType, object, ref, string} from "yup";
import {representatives} from "./users.ts";

export const loginSchema  = object().shape({
    username: string().required().label("Username"),
    password: string().required().label("Password")
});

export type LoginRequest = InferType<typeof loginSchema>;

export function login(username: string, password: string): boolean {
    return representatives.find(user => user.username === username && user.password === password) !== undefined;
}

export const changePasswordSchema = object().shape({
    oldPassword: string().required().label("Old Password"),
    newPassword: string().required().label("New Password").min(6),
    confirmPassword: string().required().label("Confirm Password").oneOf([ref('newPassword')], "Passwords do not match")
});

export type ChangePasswordRequest = InferType<typeof changePasswordSchema>;