import {InferType, object, string} from "yup";
import {randomElement, randomInt} from "./random.ts";

export const ClothSeasons = ["Winter", "Summer", "Demi-Season"];
export const ClothAges = ["0-3", "4-7", "8-12", "13-17", "Adults"];
export const ClothGenders = ["Male", "Female", "Unisex"];
export const ClothTypes = ["T-Shirt", "Sweater", "Jeans", "Dress"];
export const ClothMaterials = ['Cotton', 'Polyester', 'Silk', 'Denim', 'Leather', 'Wool', 'Linen', 'Rayon', 'Nylon', 'Velvet'];


export const clothesSchema = object().shape({
    season: string().optional().oneOf(ClothSeasons).label("Season"),
    ageRange: string().optional().oneOf(ClothAges).label("Age Range"),
    gender: string().optional().oneOf(ClothGenders).label("Gender"),
    quantity: string().matches(/\d+/, "Quantity must be a positive number").optional().label("Quantity"),
    type: string().optional().oneOf(ClothTypes).label("Type"),
    material: string().optional().oneOf(ClothMaterials).label("Material"),
});

export type ClothItem = InferType<typeof clothesSchema>;

export function generateRandomClothItem(): ClothItem {
    return {
        season: randomElement(ClothSeasons),
        ageRange: randomElement(ClothAges),
        gender: randomElement(ClothGenders),
        type: randomElement(ClothTypes),
        material: randomElement(ClothMaterials),
        quantity: randomInt(1, 10).toString(),
    };
}