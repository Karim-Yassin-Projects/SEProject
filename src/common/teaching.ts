import {boolean, InferType, object, string} from "yup";
import {Governorates, Organization} from "./organizations.ts";
import {randomElement, randomInt} from "./random.ts";

export const Subjects = [
    'Mathematics',
    'Science',
    'History',
    'Arabic Language',
    'English Language',
    'Art',
    'Physical Education',
    'Computer Science',
    'Geology',
    'Chemistry',
    'Physics',
    'Biology',
    'Geography',
    'Civics',
    'Economics'
];

export const teachingSchema = object({
    search: boolean().optional().label("Is Searching"),
    subject: string().optional().oneOf(Subjects).label("Subject").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    numberOfStudents: string().optional().matches(/^\d+$/, "Number of students must be a positive number").label("Number of students")
        .when("search", {
            is: (search: boolean) => !search,
            then: (s) => s.required(),
        }),
    governorate: string().optional().oneOf(Governorates).label("Governorate").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
    area: string().optional().min(1).label("Area").when("search", {
        is: (search:boolean) => !search,
        then: (s) => s.required(),
    }),
});

export type TeachingItem = InferType<typeof teachingSchema>;

export function generateRandomTeachingItem(organization: Organization): TeachingItem {
    return {
        subject: randomElement(Subjects),
        numberOfStudents: randomInt(50, 100).toString(),
        governorate: organization.governorate,
        area: organization.area,
    };
}