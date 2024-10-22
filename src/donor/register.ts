import {InferType, object, ref, string, number} from "yup";
import {Genders, Governorates} from "../common/organizations.ts";
import {Specializations} from "../common/medical-cases.ts";
import {Subjects} from "../common/teaching.ts";

export const Roles = ["Regular Donor", "Doctor", "Teacher"];

export const AllowedExtensions = ["pdf", "xbm", "tif", "tiff", "ico", "bmp", "pjpeg", "avif", "apng", "svg", "svgz", "webp", "jpg", "jpeg", "png", "jpe", "gif"];
export const registerSchema = object().shape({
    firstName: string().required().label("First Name").min(2).max(30),
    lastName: string().required().label("Last Name").min(2).max(30),
    gender: string().required().label("Gender").oneOf(Genders),
    email: string().required().email().label("Email").max(60),
    password: string().required().label("Password").min(6).max(20),
    confirmPassword: string().required().label("Confirm Password").min(6).max(20)
        .oneOf([ref('password')], "Passwords do not match"),
    phoneNumber: string().required().label("Phone Number").min(10).max(20)
        .matches(/^[0-9]+$/, "Phone number must be numeric"),
    role: string().required().label("Role").oneOf(Roles),
    address: string().required().label("Address").min(2).max(60),
    area: string().required().label("Area").min(2).max(60),
    governorate: string().required().label("Governorate").oneOf(Governorates),

    doctorSpeciality: string().required().label("Doctor Specialty").oneOf(Specializations)
        .when('role', {
            is: (r: string) => r !== 'Doctor',
            then: (s) => s.optional()
        }),
    numberOfProBonoCases: string().required().matches(/^\d+$/, 'Number of pro-bono cases must be a positive integer.').optional().label("Number of Pro-bono Cases")
        .when('role', {
            is: (r: string) => r !== 'Doctor',
            then: (s) => s.optional()
        }),
    teacherSpeciality: string().required().label("Teacher Specialty").oneOf(Subjects)
        .when('role', {
            is: (r: string) => r !== 'Teacher',
            then: (s) => s.optional()
        }),
    numberOfProBonoStudents: string().required().matches(/^\d+$/, 'Number of pro-bono students must be a positive integer.').label("Number of Pro-bono Students")
        .when('role', {
            is: (r: string) => r !== 'Teacher',
            then: (s) => s.optional()
        }),
    numberOfProBonoClasses: string().required().matches(/^\d+$/, 'Number of pro-bono classes must be a positive integer.').label("Number of Pro-bono Classes")
        .when('role', {
            is: (r: string) => r !== 'Teacher',
            then: (s) => s.optional()
        }),
    document: string().optional().label("Document")
        .when('role', {
            is: (r: string) => r === 'Doctor' || r === 'Teacher',
            then: (s) => s.required()
        }),
    documentSize: number().min(1, 'Document cannot be empty.').max(4 * 1024*1024, 'Document size cannot exceeed 4MB').label("Document Size"),
    documentType: string().oneOf(AllowedExtensions, 'Document type must be a PDF file or an image file').label("Document Type"),
    acceptTerms: string().required().oneOf(['true'] as string[], 'You must accept the privacy policy and terms and conditions.').label("Accept Terms")
});

export type RegisterRequest = InferType<typeof registerSchema>;