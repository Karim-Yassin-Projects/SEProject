import {boolean, InferType, object, string} from "yup";
import {Genders, Governorates, Organization} from "./organizations.ts";
import {randomBoolean, randomElement, randomInt} from "./random.ts";
import {generateRandomName} from "./names.ts";

export const Specializations = [
    'Pediatrics',
    'Dentistry',
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'Hematology',
    'Infectious Diseases',
    'Nephrology',
    'Neurology',
    'Oncology',
    'Pulmonology',
    'Rheumatology',
    'Urology'
];

export const medicalCasesSchema = object({
    search: boolean().optional().label("Is Searching"),
    specialization: string().optional().oneOf(Specializations).label("Specialization").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    patientName: string().optional().min(1).label("Patient Name").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    patientAge: string().optional().matches(/^\d+$/, "Patient age must be a positive number").label("Patient Age")
        .when("search", {
            is: (search: boolean) => !search,
            then: (s) => s.required(),
        }),
    patientGender: string().optional().oneOf(Genders).label("Patient Gender").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    patientWeight: string().optional().matches(/^\d+$/, "Patient wight must be a positive number").label("Patient Weight (Kg)").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    caseDescription: string().optional().meta({
        placeholder: "Enter details about the medical case (symptoms, diagnosis, etc.)",
        textarea: true
    }).min(1).label("Case Description").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    organizationName: string().optional().min(1).label("Organization").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    governorate: string().optional().oneOf(Governorates).label("Governorate").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    area: string().optional().min(1).label("Area").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
});

export type MedicalCaseItem = InferType<typeof medicalCasesSchema>;

export function generateRandomMedicalCaseItem(organization: Organization): MedicalCaseItem {
    const age = randomInt(1, 80);
    const gender = randomBoolean() ? 'Male' : 'Female'
    const weight = gender === 'Male'
        ? (age < 18 ? age * 4 : randomInt(70, 120))
        : (age < 18 ? age * 3.5 : randomInt(45, 95));
    const specialization = randomElement(Specializations);
    return {
        specialization,
        patientName: generateRandomName(gender),
        patientAge: age.toString(),
        patientGender: gender,
        patientWeight: weight.toString(),
        caseDescription: `Patient in need for ${specialization} doctor. 
Blood Pressure is normal.
Blood Sugar is high.
Patient is allergic to penicillin.`,
        organizationName: organization.name,
        governorate: organization.governorate,
        area: organization.area,
    };
}