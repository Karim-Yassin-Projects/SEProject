import {boolean, InferType, object, string} from "yup";
import {clothesSchema} from "../common/clothes.ts";

export const PostCategories = [
    "Clothes",
    "Toys",
    "Food",
    "Medical Supplies",
    "School Supplies",
    "Blood Donations",
];

export const newPostSchema = object().shape({
    title: string().required().min(1).label("Donation Title"),
    category: string().required().oneOf(PostCategories).label("Donation Category"),
    details: string().required().min(10).label("Donation Details").meta({
        placeholder: "Enter details about the donation",
        textarea: true
    }),
    cloths: clothesSchema
});

export type CreatePostRequest = InferType<typeof newPostSchema>;

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
