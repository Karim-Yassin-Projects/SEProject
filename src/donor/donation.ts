import {InferType, date, number, object, string} from "yup";

export const DonationTypes = ["Pickup", "Drop-off"];
export const TransportationTypes = ['Truck', 'Car', 'Motorcycle'];

export const donationSchema = object().shape({
    category: string().required().label("Category"),
    quantity: number().required().label("Quantity").min(1),
    type: string().required().label("Donation Type")
        .oneOf(DonationTypes)
        .when('category', {
            is: (c: string) => c === 'Medical Cases' || c === 'Teaching Cases',
            then: (s) => s.optional()
        }),
    transportationType: string().label("Transportation Type").optional()
        .when('type', {
            is: (t: string) => t === 'Pickup',
            then: (s) => s.required()
        }),
    date: date().required().label("Date")
        .when(['type', 'category'], {
            is: (t: string, c: string) => t === '' || c === 'Medical Cases' || c === 'Teaching Cases',
            then: (s) => s.optional().nullable()
        }),
})

export type DonationRequest = InferType<typeof donationSchema>;