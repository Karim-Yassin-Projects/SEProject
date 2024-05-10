import {InferType, object, string} from "yup";
import {Governorates, Organization} from "./organizations.ts";
import {generateRandomName} from "./names.ts";
import {randomElement} from "./random.ts";

export const BloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodDonationsSchema = object().shape({
    type: string().required().oneOf(BloodTypes).label("Blood Type"),
    patientName: string().required().min(1).label("Patient Name"),
    hospitalName: string().optional().min(1).label("Hospital Name"),
    governorate: string().optional().oneOf(Governorates).label("Governorate"),
    area: string().optional().min(1).label("Area"),
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