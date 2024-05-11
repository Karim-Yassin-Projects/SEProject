import {boolean, InferType, object, string} from "yup";
import {randomElement, randomInt} from "./random.ts";

export const SchoolSupplies = ["Books", "Stationary"];

export const StationaryItems = ["Pens", "Pencils", "Erasers", "Rulers", "Notebooks", "Binders", "Highlighters", "Markers", "Glue", "Scissors"];
export const BookLanguages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean", "Arabic", "Russian", "Portuguese", "Italian"];

export const schoolSuppliesSchema = object().shape({
    search: boolean().optional().label("Is Searching"),
    type: string().optional().oneOf(SchoolSupplies).label("Type"),
    quantity: string().optional().label("Quantity").matches(/^\d+$/, "Quantity must be a positive number").when("search", {
        is: (search: boolean) => !search,
        then: (s) => s.required(),
    }),
    stationaryType: string().optional().oneOf(StationaryItems).label("Stationary Type")
        .when(["search", "type"], {
            is: (search: boolean, type: string) => !search && type === "Stationary",
            then: (s) => s.required(),
        }),
    bookName: string().optional().label("Book Name")
        .when(["search", "type"], {
            is: (search: boolean, type: string) => !search && type === "Books",
            then: (s) => s.required(),
        }),
    bookLanguage: string().optional().oneOf(BookLanguages).label("Book Language")
        .when(["search", "type"], {
            is: (search: boolean, type: string) => !search && type === "Books",
            then: (s) => s.required(),
        }),
    bookAuthor: string().optional().label("Book Author")
        .when(["search", "type"], {
            is: (search: boolean, type: string) => !search && type === "Books",
            then: (s) => s.required(),
        }),
    edition: string().optional().label("Book Edition")
        .when(["search", "type"], {
            is: (search: boolean, type: string) => !search && type === "Books",
            then: (s) => s.required(),
        }),
    bookSummary: string().optional().label("Book Summary")
        .when(["search", "type"], {
            is: (search: boolean, type: string) => !search && type === "Books",
            then: (s) => s.required(),
        }),
});

export type SchoolSuppliesItem = InferType<typeof schoolSuppliesSchema>;

type Book = {
    bookName: string;
    bookLanguage: string;
    bookAuthor: string;
    edition: string;
    bookSummary: string;
};

const books: Book[] = [
    {
        bookName: "To Kill a Mockingbird",
        bookLanguage: "English",
        bookAuthor: "Harper Lee",
        edition: "2nd Edition",
        bookSummary: "A novel about the injustices of the American South."
    },
    {
        bookName: "1984",
        bookLanguage: "English",
        bookAuthor: "George Orwell",
        edition: "1st Edition",
        bookSummary: "A dystopian novel about a future totalitarian state."
    },
    {
        bookName: "The Great Gatsby",
        bookLanguage: "English",
        bookAuthor: "F. Scott Fitzgerald",
        edition: "3rd Edition",
        bookSummary: "A novel about the American dream in the Roaring Twenties."
    },
    {
        bookName: "الأجنحة المتكسرة",
        bookLanguage: "Arabic",
        bookAuthor: "جبران خليل جبران",
        edition: "1st Edition",
        bookSummary: "رواية رومانسية عن الحب والتضحية."
    },
    {
        bookName: "الفيل الأزرق",
        bookLanguage: "Arabic",
        bookAuthor: "أحمد مراد",
        edition: "1st Edition",
        bookSummary: "رواية تجمع بين الإثارة والتشويق."
    },
    {
        bookName: "ثلاثية غرناطة",
        bookLanguage: "Arabic",
        bookAuthor: "رضوى عاشور",
        edition: "1st Edition",
        bookSummary: "رواية تاريخية عن الأندلس."
    },
];

export function generateRandomSchoolSuppliesItem(): SchoolSuppliesItem {
    const type = randomElement(SchoolSupplies);
    if (type === "Stationary") {
        return {
            type,
            stationaryType: randomElement(StationaryItems),
            quantity: randomInt(1, 10).toString(),
        };
    }
    if (type === "Books") {
        const book = randomElement(books);
        return {
            type,
            quantity: randomInt(1, 10).toString(),
            ...book,
        };
    }
    return {
        type,
        quantity: randomInt(1, 10).toString(),
    };
}