import {boolean, InferType, object, string} from "yup";
import {randomElement, randomInt} from "./random.ts";

export const SchoolSuppliesCategories = ["Books", "Stationary", "Backpacks", "Uniforms", "Electronics"];

export const schoolSuppliesSchema = object().shape({
    search: boolean().optional().label("Is Searching"),
    type: string().optional().oneOf(SchoolSuppliesCategories).label("Type"),
    quantity: string().optional().label("Quantity").matches(/^\d+$/, "Quantity must be a positive number").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
});

export type SchoolSuppliesItem = InferType<typeof schoolSuppliesSchema>;

export function generateRandomSchoolSuppliesItem(): SchoolSuppliesItem {
    return {
        type: randomElement(SchoolSuppliesCategories),
        quantity: randomInt(1, 10).toString(),
    };
}