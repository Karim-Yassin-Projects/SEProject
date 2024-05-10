import {InferType, object, string} from "yup";
import {randomElement, randomInt} from "./random.ts";

export const SchoolSuppliesCategories = ["Books", "Stationary"];

export const schoolSuppliesSchema = object().shape({
    type: string().optional().oneOf(SchoolSuppliesCategories).label("Type"),
    quantity: string().matches(/\d+/, "Quantity must be a positive number").optional().label("Quantity"),
});

export type SchoolSuppliesItem = InferType<typeof schoolSuppliesSchema>;

export function generateRandomSchoolSuppliesItem(): SchoolSuppliesItem {
    return {
        type: randomElement(SchoolSuppliesCategories),
        quantity: randomInt(1, 10).toString(),
    };
}