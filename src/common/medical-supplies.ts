import {boolean, InferType, number, object, string} from "yup";
import {AllowedExtensions} from "./toys.ts";
import {randomElement, randomInt} from "./random.ts";

export const MedicalSuppliesCategories = [
    'Medical Devices',
    'Medical Equipments',
    'Medications'
];

export const MedicalDevices = [
    'Blood Pressure Monitors',
    'Thermometers',
    'Stethoscopes',
];

export const MedicalEquipments = [
    'Wheelchairs',
    'Walkers',
    'First Aid Kits',
    'Face Masks',
    'Gloves'
];

export const Medications = [
    'Pain Relievers',
    'Antibiotics',
    'Antiseptics',
    'Digestive Medications',
    'Respiratory Medications',
    'Skin Medications',
    'Vitamins',
    'Supplements',
    'Allergy Medications',
    'Cold Medications',
    'Diabetes Medications',
    'Heart Medications'
]

export const medicalSuppliesSchema = object().shape({
    search: boolean().optional().label("Is Searching"),
    category: string().optional().oneOf(MedicalSuppliesCategories).label("Medical Supplies Category").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    deviceType: string().optional().oneOf(MedicalDevices).label("Medical Device Type")
        .when(["category", "search"], {
            is: (category: string, search: boolean) => category === "Medical Devices" && !search,
            then: (s) => s.required(),
        }),
    equipmentType: string().optional().oneOf(MedicalEquipments).label("Medical Equipment Type")
        .when(["category", "search"], {
            is: (category: string, search: boolean) => category === "Medical Equipments" && !search,
            then: (s) => s.required(),
        }),
    medicationType: string().optional().oneOf(Medications).label("Medication Type")
        .when(["category", "search"], {
            is: (category: string, search: boolean) => category === "Medications" && !search,
            then: (s) => s.required(),
        }),
    use: string().optional().label("Use")
        .when("search", {
            is: (search: boolean) => !search,
            then: (s) => s.required(),
        }),
    quantity: string().optional().matches(/^\d+$/, "Quantity must be a positive number").label("Quantity")
        .when("search", {
            is: (search: boolean) => !search,
            then: (s) => s.required(),
        }),
    document: string().optional().label("Picture").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    documentSize: number().optional().label("Picture Size").max(4 * 1024 * 1024, 'Picture size cannot exceed 4MB'),
    documentType: string().optional().oneOf(AllowedExtensions, 'Picture type must be an image file').label("Toy Picture Type")
});

export type MedicalSuppliesItem = InferType<typeof medicalSuppliesSchema>;

export function generateRandomMedicalSuppliesItem(): MedicalSuppliesItem {
    const item: MedicalSuppliesItem = {
        category: randomElement(MedicalSuppliesCategories),
        quantity: randomInt(1, 100).toString(),
    };
    if (item.category === "Medical Devices") {
        item.deviceType = randomElement(MedicalDevices);
        item.document = "/images/" + item.deviceType.replace(/\s/g, "-").toLowerCase() + ".svg";
        item.use = "Monitoring patients health conditions";
    }
    if (item.category === "Medical Equipments") {
        item.equipmentType = randomElement(MedicalEquipments);
        item.document = "/images/" + item.equipmentType.replace(/\s/g, "-").toLowerCase() + ".svg";
        item.use = item.equipmentType === "Wheelchairs" || item.equipmentType === "Walkers" ? "Assisting patients with mobility" :
            item.equipmentType === "First Aid Kits" ? "Providing first aid in emergencies" : "Protection against infections";
    }
    if (item.category === "Medications") {
        item.medicationType = randomElement(Medications);
        item.document = "/images/medications.svg";
        item.use = "Treatment of health conditions";
    }

    return item;
}