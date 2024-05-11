import {
    isBloodDonationPost,
    isClothesPost,
    isFoodPost, isMedicalCasesPost,
    isMedicalSuppliesPost,
    isSchoolSuppliesPost, isTeachingPost, isToysPost,
    Post
} from "./posts.ts";
import BloodDonationInfo from "./BloodDonationInfo.tsx";
import ClothesInfo from "./ClothesInfo.tsx";
import FoodInfo from "./FoodInfo.tsx";
import MedicalSuppliesInfo from "./MedicalSuppliesInfo.tsx";
import SchoolSuppliesInfo from "./SchoolSuppliesInfo.tsx";
import ToysInfo from "./ToysInfo.tsx";
import TeachingInfo from "./TeachingInfo.tsx";
import MedicalCaseInfo from "./MedicalCaseInfo.tsx";

function PostInfo({post}: { post: Post }) {
    return (
        <div className="border border-1 border-info-subtle rounded-1 p-2 my-3 text-info-emphasis">
            {isBloodDonationPost(post) && <BloodDonationInfo item={post.bloodDonation}/>}
            {isClothesPost(post) && <ClothesInfo item={post.clothes}/>}
            {isFoodPost(post) && <FoodInfo item={post.food}/>}
            {isMedicalSuppliesPost(post) && <MedicalSuppliesInfo item={post.medicalSupplies}/>}
            {isSchoolSuppliesPost(post) && <SchoolSuppliesInfo item={post.schoolSupplies}/>}
            {isToysPost(post) && <ToysInfo item={post.toys}/>}
            {isMedicalCasesPost(post) && <MedicalCaseInfo item={post.medicalCase}/>}
            {isTeachingPost(post) && <TeachingInfo item={post.teaching}/>}
        </div>
    );
}

export default PostInfo;