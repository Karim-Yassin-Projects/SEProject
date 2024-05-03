import {InferType, object, ref, string} from "yup";

export const OrganizationTypes = ["Government", "NGO"];
export const Governorates = ["Cairo",
    "Alexandria",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Daqahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr El Sheikh",
    "Luxor",
    "Matruh",
    "Minya",
    "Monufia",
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
export const registerSchema = object().shape({
    firstName: string().required().label("First Name").min(2).max(30),
    lastName: string().required().label("Last Name").min(2).max(30),
    gender: string().required().label("Gender").oneOf(["Male", "Female"]),
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
    governorate: string().required().label("Governorate").oneOf(Governorates)
});

export type RegisterRequest = InferType<typeof registerSchema>;