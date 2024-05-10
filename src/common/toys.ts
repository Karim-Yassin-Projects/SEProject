import {InferType, object, string} from "yup";
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
    category: string().optional().oneOf(ToyCategories).label("Toy Category"),
    ageRange: string().optional().oneOf(ToyAges).label("Age Range"),
    toyGender: string().optional().oneOf(ToyGenders).label("Suitable for"),
    quantity: string().optional().matches(/\d+/, "Quantity must be a positive number").optional().label("Quantity"),
    toyType: string().optional().label("Type"),
    document: string().optional().label("Toy Picture"),
    documentSize: string().optional().label("Toy Picture Size").max(4 * 1024*1024, 'Toy Picture size cannot exceed 4MB'),
    documentType: string().optional().oneOf(AllowedExtensions, 'Toy Picture type must be an image file').label("Toy Picture Type")
});

export type ToyItem = InferType<typeof toysSchema>;

export function generateRandomToyItem(): ToyItem {
    const category = randomElement(ToyCategories);
    const toyItem: ToyItem = {
        category,
        ageRange: randomElement(ToyAges),
        toyGender: randomElement(ToyGenders),
        quantity: randomInt(1, 100).toString(),
    };

    toyItem.document = "/images/" + category.replace(/\s/g, "-").toLowerCase() + ".svg";
    return toyItem;
}