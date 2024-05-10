import {randomElement} from "./random.ts";

export const FirstNames = ["Ali", "Mohamed", "Ahmed", "Omar", "Fatma", "Nour", "Hassan", "Khaled", "Nada", "Mona"];
export const LastNames = ["Ali", "Mohamed", "Ahmed", "Omar", "Hassan", "Hussein", "Khalil", "Khaled"]

export type Person = {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phone: string;
}

export function generateRandomName() {
    const firstName = randomElement(FirstNames);
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