import {InferType, object, string} from "yup";
import {randomElement, randomInt} from "./random.ts";

export const FoodCategories = ["Fruits", "Vegetables", "Canned foods", "Fresh means", "Baked Goods"];
export const WeightCategories = ["Fruit", "Vegetables"];

export const foodSchema = object().shape({
    category: string().optional().oneOf(FoodCategories).label("Food Category"),
    quantity: string().optional().matches(/\d+/, "Quantity must be a positive number").label("Quantity"),
    weight: string().optional().matches(/\d+/, "Weight must be a positive number").label("Weight (Kg)"),
});

export type FoodItem = InferType<typeof foodSchema>;

export function generateRandomFoodItem(): FoodItem {
    const item: FoodItem =  {
        category: randomElement(FoodCategories),
    }

    if (item.category === "Fruits" || item.category === "Vegetables") {
        item.weight = randomInt(1, 10).toString();
    } else {
        item.quantity = randomInt(1, 10).toString();
    }
    return item;
}