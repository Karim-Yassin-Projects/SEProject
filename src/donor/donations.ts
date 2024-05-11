import {number, object, string} from "yup";
import {PostCategories} from "../common/posts.ts";

export type CreateDonationRequest = {
    category: string;
    details: string;
    title: string;
    quantity: number;
};

export const newDonationSchema = object().shape({
    title: string().required().min(1).label("Donation Title"),
    category: string().required().oneOf(PostCategories).label("Donation Category"),
    details: string().required().min(10).label("Donation Details").meta({
        placeholder: "Enter details about the donation",
        textarea: true
    }),
    quantity: number().required().min(1).label("Quantity"),
});

