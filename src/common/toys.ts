import {boolean, InferType, number, object, string} from "yup";
import {randomElement, randomInt} from "./random.ts";

export const ToyCategories = [
    'Board Games',
    'Stuffed Toys',
    'Dolls',
    'Sports',
    'Cars',
    'Outdoor',
];

export const ToyAges = [
    '0-3',
    '4-7',
    '8-12',
    '13-17',
];

export const ToyGenders = [
    'Boys',
    'Girls',
    'Both'
];
export const AllowedExtensions = ["xbm", "tif", "tiff", "ico", "bmp", "pjpeg", "avif", "apng", "svg", "svgz", "webp", "jpg", "jpeg", "png", "jpe", "gif"];

export const toysSchema = object().shape({
    search: boolean().optional().label("Is Searching"),
    category: string().optional().oneOf(ToyCategories).label("Toy Category").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    ageRange: string().optional().oneOf(ToyAges).label("Age Range").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    toyGender: string().optional().oneOf(ToyGenders).label("Suitable for").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    quantity: string().optional().matches(/^\d+$/, "Quantity must be a positive number").optional().label("Quantity").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    toyType: string().optional().label("Type").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    document: string().optional().label("Toy Picture").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    documentSize: number().optional().label("Toy Picture Size").max(4 * 1024 * 1024, 'Toy Picture size cannot exceed 4MB'),
    documentType: string().optional().oneOf(AllowedExtensions, 'Toy Picture type must be an image file').label("Toy Picture Type")
});

export type ToysItem = InferType<typeof toysSchema>;

export function generateRandomToyItem(): ToysItem {
    const category = randomElement(ToyCategories);
    const toyItem: ToysItem = {
        category,
        ageRange: randomElement(ToyAges),
        toyGender: randomElement(ToyGenders),
        quantity: randomInt(1, 100).toString(),
        toyType: category == "Board Games" ? "Chess" :
            category == "Stuffed Toys" ? "Stuffed Bunny" :
                category == "Dolls" ? "Barbie doll" :
                    category == "Sports" ? "Football" :
                        category == "Cars" ? "Remote controlled car" :
                            category == "Outdoor" ? "Summer Sand Bucket with Shovel" : "Unknown",
    };

    toyItem.document = "/images/" + category.replace(/\s/g, "-").toLowerCase() + ".svg";
    return toyItem;
}