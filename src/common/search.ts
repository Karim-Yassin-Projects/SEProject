import {InferType, object, string} from "yup";
import {ClothesItem, clothesSchema} from "./clothes.ts";
import {ToysItem, toysSchema} from "./toys.ts";
import {FoodItem, foodSchema} from "./food.ts";
import {MedicalSuppliesItem, medicalSuppliesSchema} from "./medical-supplies.ts";
import {SchoolSuppliesItem, schoolSuppliesSchema} from "./school-supplies.ts";
import {BloodDonationItem, bloodDonationsSchema} from "./blood-donations.ts";
import {
    AllPosts, isBloodDonationPost,
    isClothesPost,
    isFoodPost, isMedicalCasesPost,
    isMedicalSuppliesPost,
    isSchoolSuppliesPost, isTeachingPost,
    isToysPost,
    Post, PostCategories
} from "./posts.ts";
import {TeachingItem, teachingSchema} from "./teaching.ts";
import {MedicalCaseItem, medicalCasesSchema} from "./medical-cases.ts";

export const SearchSchema = object().shape({
    category: string().optional().oneOf(PostCategories).label("Donation Category"),
    clothes: clothesSchema.required(),
    toys: toysSchema.required(),
    food: foodSchema.required(),
    medicalSupplies: medicalSuppliesSchema.required(),
    schoolSupplies: schoolSuppliesSchema.required(),
    bloodDonation: bloodDonationsSchema.required(),
    teaching: teachingSchema.required(),
    medicalCase: medicalCasesSchema.required(),
});

export type SearchCriteria = InferType<typeof SearchSchema>;


function matchToyItem(toys: ToysItem, criteria: ToysItem) {
    if (criteria.category && criteria.category !== toys.category) {
        return false;
    }
    if (criteria.ageRange && criteria.ageRange !== toys.ageRange) {
        return false;
    }
    return !(criteria.toyGender && criteria.toyGender !== toys.toyGender);

}

function matchFoodItem(food: FoodItem, criteria: FoodItem) {
    return !(criteria.category && criteria.category !== food.category);

}

function matchClothesItem(clothes: ClothesItem, criteria: ClothesItem) {
    if (criteria.ageRange && criteria.ageRange !== clothes.ageRange) {
        return false;
    }
    if (criteria.season && criteria.season !== clothes.season) {
        return false;
    }
    return !(criteria.gender && criteria.gender !== clothes.gender);

}

function matchMedicalSuppliesItem(medicalSupplies: MedicalSuppliesItem, criteria: MedicalSuppliesItem) {
    if (criteria.category && criteria.category !== medicalSupplies.category) {
        return false;
    }
    if (criteria.category === 'Medications' && criteria.medicationType && criteria.medicationType !== medicalSupplies.medicationType) {
        return false;
    }
    if (criteria.category === 'Medical Equipments' && criteria.equipmentType && criteria.equipmentType !== medicalSupplies.equipmentType) {
        return false;
    }
    return !(criteria.category === 'Medical Devices' && criteria.deviceType && criteria.deviceType !== medicalSupplies.deviceType);

}

function matchSchoolSuppliesItem(schoolSupplies: SchoolSuppliesItem, criteria: SchoolSuppliesItem) {
    return !(criteria.type && criteria.type !== schoolSupplies.type);

}

function matchBloodDonationItem(bloodDonation: BloodDonationItem, criteria: BloodDonationItem) {
    if (criteria.type && criteria.type !== bloodDonation.type) {
        return false;
    }

    if (criteria.hospitalName && criteria.hospitalName !== bloodDonation.hospitalName) {
        return false;
    }

    if (criteria.governorate) {
        if (criteria.governorate !== bloodDonation.governorate) {
            return false;

        }
        if (criteria.area && criteria.area !== bloodDonation.area) {
            return false;
        }
    }

    return true;
}

function matchTeachingItem(teaching: TeachingItem, criteria: TeachingItem) {
    if (criteria.subject && criteria.subject !== teaching.subject) {
        return false;
    }

    if (criteria.governorate) {
        if (criteria.governorate !== teaching.governorate) {
            return false;
        }
        if (criteria.area && criteria.area !== teaching.area) {
            return false;
        }
    }
    return true;
}

function matchMedicalItem(medicalCase: MedicalCaseItem, criteria:MedicalCaseItem) {
    if (criteria.specialization && criteria.specialization !== medicalCase.specialization) {
        return false;
    }

    if (criteria.governorate) {
        if (criteria.governorate !== medicalCase.governorate) {
            return false;
        }

        if (criteria.area && criteria.area !== medicalCase.area) {
            return false;
        }

        return !(criteria.organizationName && criteria.organizationName !== medicalCase.organizationName);

    }
    return true;
}

function match(post: Post, searchCriteria: SearchCriteria) {
    if (post.fulfilled) {
        return false;
    }
    if (!searchCriteria.category) {
        return true;
    }
    if (post.category !== searchCriteria.category){
        return false;
    }
    if (isToysPost(post)) {
        return matchToyItem(post.toys, searchCriteria.toys);
    }
    if (isFoodPost(post)) {
        return matchFoodItem(post.food, searchCriteria.food);
    }
    if (isClothesPost(post)) {
        return matchClothesItem(post.clothes, searchCriteria.clothes);
    }
    if (isMedicalSuppliesPost(post)) {
        return matchMedicalSuppliesItem(post.medicalSupplies, searchCriteria.medicalSupplies);
    }
    if (isSchoolSuppliesPost(post)) {
        return matchSchoolSuppliesItem(post.schoolSupplies, searchCriteria.schoolSupplies);
    }
    if (isBloodDonationPost(post)) {
        return matchBloodDonationItem(post.bloodDonation, searchCriteria.bloodDonation);
    }

    if (isTeachingPost(post)) {
        return matchTeachingItem(post.teaching, searchCriteria.teaching);
    }

    if (isMedicalCasesPost(post)) {
        return matchMedicalItem(post.medicalCase, searchCriteria.medicalCase);
    }

    return false;
}

export function searchPosts(searchCriteria: SearchCriteria): Post[] {
    return AllPosts.filter(p => match(p, searchCriteria));
}