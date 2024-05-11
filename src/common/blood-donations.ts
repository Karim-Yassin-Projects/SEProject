import {boolean, InferType, object, string} from "yup";
import {Governorates, Organization} from "./organizations.ts";
import {generateRandomName} from "./names.ts";
import {randomElement} from "./random.ts";

export const BloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodDonationsSchema = object().shape({
    search: boolean().optional().label("Is Searching"),
    type: string().optional().oneOf(BloodTypes).label("Blood Type").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    patientName: string().optional().min(1).label("Patient Name").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    hospitalName: string().optional().min(1).label("Hospital Name").when("search", {
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



export type BloodDonationItem = InferType<typeof bloodDonationsSchema>;


export function generateRandomBloodDonationItem(hospital: Organization): BloodDonationItem {

    return {
        type: randomElement(BloodTypes),
        patientName: generateRandomName(),
        hospitalName: hospital.name,
        governorate: hospital.governorate,
        area: hospital.area,
    };
}