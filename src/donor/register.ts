import {InferType, object, ref, string, number} from "yup";

export const Roles = ["Regular Donor", "Doctor", "Teacher"];
export const Governorates = ["Cairo",
    "Alexandria",
    "Aswan",
    "Assiut",
    "Beheira",
    "Beni Suef",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr El-Sheikh",
    "Luxor",
    "Marsa Matrouh",
    "Minya",
    "Menofia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
    "Suez"
];

export const Genders = ["Male", "Female"];
export const AllowedExtensions = ["pdf", "xbm", "tif", "tiff", "ico", "bmp", "pjpeg", "avif", "apng", "svg", "svgz", "webp", "jpg", "jpeg", "png", "jpe", "gif"];
export const registerSchema = object().shape({
    firstName: string().required().label("First Name").min(2).max(30),
    lastName: string().required().label("Last Name").min(2).max(30),
    gender: string().required().label("Gender").oneOf(Genders),
    email: string().required().email().label("Email").max(60),
    password: string().required().label("Password").min(8).max(20),
    confirmPassword: string().required().label("Confirm Password").min(8).max(20)
        .oneOf([ref('password')], "Passwords do not match"),
    phoneNumber: string().required().label("Phone Number").min(10).max(20)
        .matches(/^[0-9]+$/, "Phone number must be numeric"),
    organizationName: string().required().label("Organization Name").min(2).max(60),
    organizationType: string().required().label("Organization Type").oneOf(OrganizationTypes),
    organizationAddress: string().required().label("Organization Address").min(2).max(60),
    area: string().required().label("Area").min(2).max(60),
    governorate: string().required().label("Governorate").oneOf(Governorates),
    document: string().required().label("Document"),
    documentSize: number().min(1, 'Document cannot be empty.').max(4 * 1024*1024, 'Document size cannot exceeed 4MB').label("Document Size"),
    documentType: string().oneOf(AllowedExtensions, 'Document type must be a PDF file or an image file').label("Document Type")
});

export type RegisterRequest = InferType<typeof registerSchema>;