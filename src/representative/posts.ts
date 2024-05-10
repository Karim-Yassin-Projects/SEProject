import {InferType, object, string} from "yup";

export const PostCategories = [
    "Clothes",
    "Toys",
    "Food",
    "Medical Supplies",
    "School Supplies",
    "Blood Donations",
];

export const newPostSchema = object().shape({
    category: string().required().oneOf(PostCategories).label("Donation Category"),
    details: string().required().min(10).label("Donation Details").meta({
        placeholder: "Enter details about the donation",
        textarea: true
    })
});

export type CreatePostRequest = InferType<typeof newPostSchema>;