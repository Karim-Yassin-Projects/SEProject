import {boolean, InferType, object, string} from "yup";
import {randomElement, randomInt} from "./random.ts";

export const ClothSeasons = ["Winter", "Summer", "Demi-Season"];
export const ClothAges = ["0-3", "4-7", "8-12", "13-17", "Adults"];
export const ClothGenders = ["Male", "Female", "Unisex"];
export const ClothTypes = ["T-Shirt", "Sweater", "Jeans", "Dress"];
export const ClothMaterials = ['Cotton', 'Polyester', 'Silk', 'Denim', 'Leather', 'Wool', 'Linen', 'Rayon', 'Nylon', 'Velvet'];


export const clothesSchema = object().shape({
    search: boolean().optional().label("Is Searching"),
    season: string().optional().oneOf(ClothSeasons).label("Season").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    ageRange: string().optional().oneOf(ClothAges).label("Age Range").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    gender: string().optional().oneOf(ClothGenders).label("Gender").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    quantity: string().optional().matches(/^\d+$/, "Quantity must be a positive number").label("Quantity").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    type: string().optional().oneOf(ClothTypes).label("Type").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    material: string().optional().oneOf(ClothMaterials).label("Material").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
});

export type ClothesItem = InferType<typeof clothesSchema>;

export function generateRandomClothItem(): ClothesItem {
    return {
        season: randomElement(ClothSeasons),
        ageRange: randomElement(ClothAges),
        gender: randomElement(ClothGenders),
        type: randomElement(ClothTypes),
        material: randomElement(ClothMaterials),
        quantity: randomInt(1, 10).toString(),
    };
}