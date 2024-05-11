import {generateRandomToyItem, ToysItem} from "./toys.ts";
import {ClothesItem, generateRandomClothItem} from "./clothes.ts";
import {generateRandomMedicalSuppliesItem, MedicalSuppliesItem} from "./medical-supplies.ts";
import {BloodDonationItem, generateRandomBloodDonationItem} from "./blood-donations.ts";
import {FoodItem, generateRandomFoodItem} from "./food.ts";
import {Hospitals, Organization, Organizations} from "./organizations.ts";
import {generateRandomPerson} from "./names.ts";
import {randomBoolean, randomElement, randomInt} from "./random.ts";
import {generateRandomSchoolSuppliesItem, SchoolSuppliesItem} from "./school-supplies.ts";
import {generateRandomTeachingItem, TeachingItem} from "./teaching.ts";
import {generateRandomMedicalCaseItem, MedicalCaseItem} from "./medical-cases.ts";

export const PostCategories = [
    'Toys',
    'Clothes',
    'Medical Supplies',
    'Blood Donations',
    'Food',
    'School Supplies',
    'Teaching Cases',
    'Medical Cases',
];
export type PostType = typeof PostCategories[number];

export interface Post {
    id: number;
    organization: Organization;
    title: string;
    category: PostType;
    fulfilled: boolean;
    details: string;
    donations: Donation[];
}

export interface Donation {
    id: number;
    post: Post;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    area: string;
    governorate: string;
    isDropped: boolean;
    dropDate?: Date;
    details: string;
}

export interface ToysPost extends Post {
    category: 'Toys';
    toys: ToysItem
}

export interface ClothesPost extends Post {
    category: 'Clothes';
    clothes: ClothesItem;
}

export interface MedicalSuppliesPost extends Post {
    category: 'Medical Supplies';
    medicalSupplies: MedicalSuppliesItem;
}

export interface BloodDonationPost extends Post {
    category: 'Blood Donations';
    bloodDonation: BloodDonationItem;
}

export interface FoodPost extends Post {
    category: 'Food';
    food: FoodItem;
}

export interface SchoolSuppliesPost extends Post {
    category: 'School Supplies';
    schoolSupplies: SchoolSuppliesItem;
}

export interface TeachingPost extends Post {
    category: 'Teaching Cases';
    teaching: TeachingItem;
}

export interface MedicalCasesPost extends Post {
    category: 'Medical Cases';
    medicalCase: MedicalCaseItem;
}

export function isFoodPost(post: Post): post is FoodPost {
    return post.category === 'Food';
}

export function isBloodDonationPost(post: Post): post is BloodDonationPost {
    return post.category === 'Blood Donations';
}

export function isMedicalSuppliesPost(post: Post): post is MedicalSuppliesPost {
    return post.category === 'Medical Supplies';
}

export function isClothesPost(post: Post): post is ClothesPost {
    return post.category === 'Clothes';
}

export function isSchoolSuppliesPost(post: Post): post is SchoolSuppliesPost {
    return post.category === 'School Supplies';
}

export function isToysPost(post: Post): post is ToysPost {
    return post.category === 'Toys';
}

export function isTeachingPost(post: Post): post is TeachingPost {
    return post.category === 'Teaching Cases';
}

export function isMedicalCasesPost(post: Post): post is MedicalCasesPost {
    return post.category === 'Medical Cases';
}

function generateToysPost(id: number, organization: Organization, category: "Toys") {
    const item = generateRandomToyItem();
    const post: ToysPost = {
        id,
        organization,
        title: `Toys Needed for Children in ${organization.name}`,
        category,
        fulfilled: false,
        details: `Our organization, ${organization.name}, is in need of toys for the children under our care. We are looking for donations of the following items:
- Category: ${item.category}
- Age Range: ${item.ageRange}
- Suitable for: ${item.toyGender}
- Quantity: ${item.quantity}
- Type: ${item.toyType}

Your generous donations will help us provide essential toys to the children in our care. If you have items that fit the above description and are in good condition, please consider donating.

To donate, please visit ${organization.name} at ${organization.address}, ${organization.area}. Our staff will guide you through the donation process.

We appreciate your support in this critical situation. Your donation can make a significant difference in someone's life. Thank you.`,
        toys: item,
        donations: [],
    }
    return post;
}

function generateClothsPost(id: number, organization: Organization, category: "Clothes") {
    const item = generateRandomClothItem();
    const post: ClothesPost = {
        id,
        organization,
        title: `Clothes Needed for ${organization.name}`,
        details: `With changing seasons, our organization, ${organization.name}, is currently in need of clothing donations to keep those in need warm and comfortable. We are specifically looking for the following:

- Category: ${item.type}
- Material: ${item.material}
- Season: ${item.season}
- Gender: ${item.gender}
- Age Group: ${item.ageRange}
- Quantity: ${item.quantity}

Your generous donations will help us provide essential clothing items to those in need in our community. If you have items that fit the above description and are in good condition, please consider donating.

To donate, please visit ${organization.name} at ${organization.address}, ${organization.area}. Our staff will guide you through the donation process.

We appreciate your support in this critical situation. Your donation can make a significant difference in someone's life. Thank you.`,
        category,
        fulfilled: false,
        clothes: item,
        donations: [],
    }
    return post;
}

function generateMedicalSuppliesPost(id: number, organization: Organization, category: "Medical Supplies") {
    const item = generateRandomMedicalSuppliesItem();
    const itemCategoryDescription =
        item.category === 'Medical Devices' ?
            `Device Type: ${item.deviceType}` :
            item.category === 'Medical Equipment' ?
                `Equipment Type: ${item.equipmentType}` :
                `Medication Type: ${item.medicationType}`;

    const post: MedicalSuppliesPost = {
        id,
        organization,
        title: `Medical Supplies Needed`,
        category,
        fulfilled: false,
        details: `Our hospital is in urgent need of medical supplies. We are looking for donations of the following items:
- Category: ${item.category}
- ${itemCategoryDescription}
- ${item.use}

Your generous donations will help us provide better care to our patients. Thank you for your support.`,
        medicalSupplies: item,
        donations: [],
    }

    return post;
}

function generateBlootDonationsPost(id: number, organization: Organization, category: "Blood Donations") {
    const item = generateRandomBloodDonationItem(organization);
    const post: BloodDonationPost = {
        id,
        organization,
        title: `Blood Donation for ${item.patientName}`,
        category,
        fulfilled: false,
        details: `Patient ${item.patientName}, has been admitted to ${organization.name} in ${organization.area}, ${organization.governorate}. He has been diagnosed with a severe condition that requires immediate blood transfusion. The patient's blood type is ${item.type}, and we urgently need donors of the same blood type (${item.type}). 

The patient's condition is critical, and the required blood type ${item.type} is not available in the blood bank of our hospital. We are therefore reaching out to the community for help. 

If you are a healthy individual aged between 18 and 65, and your blood type is ${item.type}, we kindly request you to consider donating blood for this cause. Your donation can make a significant difference and potentially save a life. 

Please remember, before donating, you should have a good night's sleep, have eaten in the last four hours, and be well hydrated. 

To donate, please visit ${organization.name} at ${organization.address}. Our staff will guide you through the process. 

We appreciate your support in this critical situation. Your donation can give someone another chance at life. Thank you.`,
        bloodDonation: item,
        donations: [],
    };
    return post;
}

function generateFoodPost(id: number, organization: Organization, category: "Food") {
    const item = generateRandomFoodItem();
    const description = item.weight ? `Weight: ${item.weight} Kg` : `Quantity: ${item.quantity}`;
    const post: FoodPost = {
        id,
        organization,
        title: `Food Needed for ${organization.name}`,
        category,
        fulfilled: false,
        details: `Our organization, ${organization.name}, is in urgent need of food donations to support families in need. 
We are looking for donations of non-perishable food items such as:
- Category: ${item.category}
${description}

Your generous donations will help us provide essential food items to those in need in our community.

To donate, please visit ${organization.name} at ${organization.address}, ${organization.area}. Our staff will guide you through the donation process.
Thank you for your support.
`,
        food: item,
        donations: [],
    };
    return post;
}

function generateSchoolSuppliesPost(id: number, organization: Organization, category: "School Supplies") {
    const item = generateRandomSchoolSuppliesItem();

    const description = item.type === 'Stationery' ? `- Stationery Type: ${item.stationaryType}` :
        item.type === "Books" ? `- Book name: ${item.bookName}
- Book Language: ${item.bookLanguage}
- Book Author: ${item.bookAuthor}
- Edition: ${item.edition}
- Book Summary: ${item.bookSummary}
` : '';
    const post: SchoolSuppliesPost = {
        id,
        organization,
        title: `School Supplies Needed for ${organization.name}`,
        category,
        fulfilled: false,
        details: `Our organization, ${organization.name}, is in need of school supplies for the children under our care. We are looking for donations of the following items:
- Category: ${item.type}
- Quantity: ${item.quantity}
${description}

Your generous donations will help us provide essential school supplies to the children in our care. If you have items that fit the above description and are in good condition, please consider donating.

To donate, please visit ${organization.name} at ${organization.address}, ${organization.area}. Our staff will guide you through the donation process.

Thank you for your support.`,
        schoolSupplies: item,
        donations: [],
    }
    return post;
}

function generateTeachingPost(id: number, organization: Organization, category: "Teaching Cases"): TeachingPost {
    const item = generateRandomTeachingItem(organization);
    const title = `${item.subject} teacher needed for ${organization.name}`;
    const description = `Our organization, ${organization.name}, is in need of volunteer teachers to teach ${item.subject} to the ${item.numberOfStudents} students in our community.

The classes will be held in ${organization.area}, ${organization.governorate}. If you have experience in teaching ${item.subject} and are willing to volunteer your time, we would greatly appreciate your help.

If you experienced in teaching ${item.subject} and are interested in volunteering, please visit ${organization.name} at ${organization.address}. Our staff will guide you through the process.

Thank you for your support.`;
    return {
        id,
        organization,
        title,
        category,
        fulfilled: false,
        details: description,
        teaching: item,
        donations: [],
    };
}

function generateMedicalCasesPost(id: number, organization: Organization, category: "Medical Cases"): MedicalCasesPost {
    const item = generateRandomMedicalCaseItem(organization);
    const title = `${item.specialization} Doctor needed for ${item.patientName}`;

    const description = `Patient ${item.patientName}, has been admitted to ${organization.name} in ${organization.area}, ${organization.governorate}. 
    
    ${item.patientGender === 'Male' ? 'He' : 'She'} has been diagnosed with a severe condition that requires immediate medical attention. 
    The patient is a ${item.patientGender} aged ${item.patientAge} years old, weighing ${item.patientWeight} Kg.
    
    ${item.caseDescription}
    `;

    return {
        id,
        organization,
        title,
        category,
        fulfilled: false,
        details: description,
        medicalCase: item,
        donations: [],
    };
}



function generateRandomPost(id: number): Post {
    const category = randomElement(PostCategories as unknown as PostType[]);
    let organization: Organization;
    if (category === 'Blood Donations') {
        organization = randomElement(Hospitals);
        return generateBlootDonationsPost(id, organization, category);
    } else if (category === 'Medical Supplies') {
        organization = randomElement(Hospitals);
        return generateMedicalSuppliesPost(id, organization, category);
    } else if (category === 'Clothes') {
        organization = randomElement(Organizations);
        return generateClothsPost(id, organization, category);
    } else if (category === 'Toys') {
        organization = randomElement(Organizations);
        return generateToysPost(id, organization, category);
    } else if (category === 'Food') {
        organization = randomElement(Organizations);
        return generateFoodPost(id, organization, category);
    } else if (category == 'School Supplies') {
        organization = randomElement(Organizations);
        return generateSchoolSuppliesPost(id, organization, category);
    } else if (category == 'Teaching Cases') {
        organization = randomElement(Organizations);
        return generateTeachingPost(id, organization, category);
    } else if (category == 'Medical Cases') {
        organization = randomElement(Hospitals);
        return generateMedicalCasesPost(id, organization, category);
    }
    throw new Error(`Unknown category: ${category}`);
}

function generatePosts() {
    const result: Post[] = [];
    for (let i = 1; i <= 1000; i++) {
        result.push(generateRandomPost(i));
    }
    return result;
}

function generateDonation(id: number, posts: Post[]): Donation {
    const post = randomElement(posts);
    const person = generateRandomPerson();
    const dropped = randomBoolean();
    const donation: Donation = {
        id,
        post,
        ...person,
        address: `Street ${randomInt(1, 100)}, Building ${randomInt(1, 100)}`,
        area: post.organization.area,
        governorate: post.organization.governorate,
        isDropped: dropped,
        dropDate: dropped ? new Date(2024, 4, 2) : randomBoolean() ? new Date(2024, 6, 2) : undefined,
        details: `I want to donate to the cause of ${post.title}.`
    }
    post.donations.push(donation);
    return donation;
}

function generateDonations(posts: Post[]) {
    const result: Donation[] = [];
    for (let i = 1; i <= 1000; i++) {
        const donation = generateDonation(i, posts);
        result.push(donation);

        if (donation.isDropped) {
            donation.post.fulfilled = true;
        }
    }
    return result;
}

function generate(): [Post[], Donation[]] {
    const posts = generatePosts();
    const donations = generateDonations(posts);
    return [posts, donations];

}

export const [AllPosts, AllDonations] = generate();

export function getPostsByOrganization(organization: Organization): Post[] {
    return AllPosts.filter((post) => post.organization === organization);
}

let defaultOrgPosts: Post[] | undefined;

export function getPostsForDefaultOrganization(): Post[] {
    if (defaultOrgPosts) {
        return defaultOrgPosts;
    }
    defaultOrgPosts = getPostsByOrganization(Organizations[0]);
    return defaultOrgPosts;
}

let defaultOrgDonations: Donation[] | undefined;

export function getDonationsForDefaultOrganization(): Donation[] {
    if (defaultOrgDonations) {
        return defaultOrgDonations;
    }
    defaultOrgDonations = AllDonations.filter((donation) => donation.post.organization === Organizations[0]);
    return defaultOrgDonations;
}