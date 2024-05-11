import {boolean, InferType, object, string} from "yup";
import {clothesSchema} from "../common/clothes.ts";
import {toysSchema} from "../common/toys.ts";
import {foodSchema} from "../common/food.ts";
import {medicalSuppliesSchema} from "../common/medical-supplies.ts";
import {schoolSuppliesSchema} from "../common/school-supplies-categories.ts";
import {bloodDonationsSchema} from "../common/blood-donations.ts";

export const PostCategories = [
    "Clothes",
    "Toys",
    "Food",
    "Medical Supplies",
    "School Supplies",
    "Blood Donations",
];

export const postSchema = object().shape({
    title: string().required().min(1).label("Donation Title"),
    category: string().required().oneOf(PostCategories).label("Donation Category"),
    details: string().required().min(10).label("Donation Details").meta({
        placeholder: "Enter details about the donation",
        textarea: true
    }),
    fulfilled: boolean().default(false),
    cloths: clothesSchema.optional().nullable()
        .when("category", {
            is: "Clothes",
            then: (s) => s.required().nonNullable(),
        }),
    toys: toysSchema.optional().nullable().when("category", {
        is: "Toys",
        then: (s) => s.required().nonNullable(),
    }),
    food: foodSchema.optional().nullable().when("category", {
        is: "Food",
        then: (s) => s.required().nonNullable(),
    }),
    medicalSupplies: medicalSuppliesSchema.optional().nullable().when("category", {
        is: "Medical Supplies",
        then: (s) => s.required().nonNullable(),
    }),
    schoolSupplies: schoolSuppliesSchema.optional().nullable().when("category", {
        is: "School Supplies",
        then: (s) => s.required().nonNullable(),
    }),
    bloodDonation: bloodDonationsSchema.optional().nullable().when("category", {
        is: "Blood Donations",
        then: (s) => s.required().nonNullable(),
    }),
});

export type PostRequest = InferType<typeof postSchema>;

export const updatePostSchema = object().shape({
    title: string().required().min(1).label("Donation Title"),
    category: string().required().oneOf(PostCategories).label("Donation Category"),
    fulfilled: boolean(),
    details: string().required().min(10).label("Donation Details").meta({
        placeholder: "Enter details about the donation",
        textarea: true
    })
});

export type UpdatePostRequest = InferType<typeof updatePostSchema>;

export const Titles: Record<string, string> = {
    'fulfilled': 'Fulfilled posts',
    'unfulfilled': 'Unfulfilled posts',
    'recent': 'Recent donations',
    'monthly': 'This month\'s donations',
    'weekly': 'This week\'s donations',
    'all': 'All donations'
};
