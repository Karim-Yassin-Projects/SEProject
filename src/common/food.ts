import {boolean, InferType, object, string} from "yup";
import {randomElement, randomInt} from "./random.ts";

export const FoodCategories = ["Fruits", "Vegetables", "Canned foods", "Fresh meals", "Baked Goods"];
export const WeightCategories = ["Fruits", "Vegetables"];

export const foodSchema = object().shape({
        search: boolean().optional().label("Is Searching"),
        category: string().optional().oneOf(FoodCategories).label("Food Category")
            .when("search", {
                is: (search: boolean) => !search,
                then: (s) => s.required(),
            }),
        quantity: string().optional().label("Quantity")
            .when("category", {
                is: (c: string) => !WeightCategories.includes(c),
                then: (s) => s.matches(/^\d+$/, "Quantity must be a positive number"),
            }).when(["category", "search"], {
                is: (c: string, s: boolean) => !WeightCategories.includes(c) && !s,
                then: (s) => s.required().matches(/^\d+$/, "Quantity must be a positive number"),
            }),
        weight: string().optional().label("Weight (Kg)")
            .when(["category", "search"], {
                is: (c: string, s: boolean) => WeightCategories.includes(c) && !s,
                then: (s) => s.required().matches(/^\d+$/, "Weight must be a positive number"),
            }),
    })
;

export type FoodItem = InferType<typeof foodSchema>;

export function generateRandomFoodItem(): FoodItem {
    const item: FoodItem = {
        category: randomElement(FoodCategories),
    }

    if (item.category === "Fruits" || item.category === "Vegetables") {
        item.weight = randomInt(1, 10).toString();
    } else {
        item.quantity = randomInt(1, 10).toString();
    }
    return item;
}