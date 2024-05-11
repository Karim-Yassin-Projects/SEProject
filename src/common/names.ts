import {randomElement, randomInt} from "./random.ts";

export const FirstNames = ["Ali", "Mohamed", "Ahmed", "Omar", "Hassan", "Khaled", "Nour",  "Farida", "Farah", "Nadine", "Rana", "Heba"];
export const LastNames = ["Ali", "Mohamed", "Ahmed", "Omar", "Hassan", "Hussein", "Khalil", "Khaled"]

export type Person = {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phone: string;
}

export function generateRandomName(gender?: string): string {
    const index = gender === undefined
    ? randomInt(0, FirstNames.length)
        : gender === 'Male' ? randomInt(0, FirstNames.length / 2)
        : randomInt(FirstNames.length / 2, FirstNames.length);


    const firstName = FirstNames[index];
    const lastName = randomElement(LastNames);
    return `${firstName} ${lastName}`;
}

export function generateRandomPerson(): Person {
    const firstName = randomElement(FirstNames);
    const lastName = randomElement(LastNames);

    return {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}@example.com`,
        phone: `201055558888`,
    }
}