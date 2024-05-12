import {InferType, object, ref, string} from "yup";

export const loginSchema  = object().shape({
    email: string().required().label("Email"),
    password: string().required().label("Password")
});

export type LoginRequest = InferType<typeof loginSchema>;

export function login(email: string, password: string): boolean {
    return email === 'raghad.mohamed@student.guc.edu.eg' && password === '123456';
}

export const changePasswordSchema = object().shape({
    oldPassword: string().required().label("Old Password"),
    newPassword: string().required().label("New Password").min(6),
    confirmPassword: string().required().label("Confirm Password").oneOf([ref('newPassword')], "Passwords do not match")
});

export type ChangePasswordRequest = InferType<typeof changePasswordSchema>;