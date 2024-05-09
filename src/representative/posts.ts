import {boolean, InferType, object, string} from "yup";

export const PostCategories = [
    "Clothes",
    "Toys",
    "Food",
    "Medical Supplies",
    "School Supplies",
    "Blood Donations",
];

export const newPostSchema = object().shape({
    title: string().required().min(1).label("Donation Title"),
    category: string().required().oneOf(PostCategories).label("Donation Category"),
    details: string().required().min(10).label("Donation Details").meta({
        placeholder: "Enter details about the donation",
        textarea: true
    })
});

export type CreatePostRequest = InferType<typeof newPostSchema>;

export const updatePostSchema = object().shape({
    title: string().required().min(1).label("Donation Title"),
    category: string().required().oneOf(PostCategories).label("Donation Category"),
    fulfilled: boolean(),
    details: string().required().min(10).label("Donation Details").meta({
        placeholder: "Enter details about the donation",
        textarea: true
    })
});

export type UpdatePostRequest = InferType<typeof updatePostSchema>;

export type Post = {
    id: number;
    title: string;
    category: string;
    fulfilled: boolean;
    details: string;
    donors: Donor[];
}

export type Donor = {
    donorId: number;
    firstName: string;
    lastName: string;
    address: string;
    area: string;
    governorate: string;
    details: string;
    email: string;
    phone: string;
}

export type DonorWithPost = Donor & {
    post: Post;
}

export const allPosts: Post[] = [
    {
        id: 1, category: "Clothes", fulfilled: true, title: "Need clothes for orphan children",
        details:
`As the seasons change, we find ourselves in urgent need of clothing for our children. Many of them have outgrown their clothes and we are struggling to keep up with their needs. We are therefore reaching out to our generous community for help.

We are gratefully accepting donations of new or gently used:

- Children's clothing (all sizes)
- Shoes (all sizes)
- Winter wear (coats, hats, gloves, scarves)
- Socks and underwear (new only please)

Your generous donations will go a long way in ensuring that our children are warm, comfortable, and well-dressed. Every child deserves to feel good about what they wear and your help can make a big difference.
`,
        donors: [
            {
                donorId: 1,
                firstName: "Kareem",
                lastName: "ElMeteny",
                address: "18 street 9",
                area: "Maadi",
                governorate: "Cairo",
                details: "Donated 12 items of clothing",
                email: "kareem.elmeteny@student.guc.edu.eg",
                phone: "+20 012 555 11111",
            },
            {
                donorId: 2,
                firstName: "Yassin",
                lastName: "ElHelly",
                address: "18 street 9",
                area: "Maadi",
                governorate: "Cairo",
                details: "Donated 10 items of clothing",
                email: "yassin.ahmed@student.guc.edu.eg",
                phone: "+20 012 555 11111",
            }
        ],

    },
    {
        id: 2, category: "Toys", fulfilled: true, title: "Need toys for orphan children",
        details:
`As we strive to provide a nurturing environment for our children, we realize the importance of play in their development. Toys can bring joy, comfort, and help our children learn and grow. However, we are currently facing a shortage of toys and are therefore appealing to our kind-hearted community for donations.

We would be extremely grateful for donations of new or gently used:

- Educational toys and games
- Puzzles and board games
- Sports equipment
- Dolls and action figures
- Art and craft supplies

Your generous donations will not only bring smiles to our children's faces but also contribute to their cognitive, physical, and emotional development.`,

        donors: [
            {
                donorId: 3,
                firstName: "Ahmed",
                lastName: "Hossam",
                address: "18 street 9",
                area: "Maadi",
                governorate: "Cairo",
                details: "Donated 12 toys",
                email: "ahmed.hossam@student.guc.edu.eg",
                phone: "+20 012 555 11111",
            },
            {
                donorId: 4,
                firstName: "Raghad",
                lastName: "Helal",
                address: "18 street 9",
                area: "Maadi",
                governorate: "Cairo",
                details: "Donated 1000 EGP to buy toys",
                email: "raghad.mohamed@student.guc.edu.eg",
                phone: "+20 012 555 11111",
            }
        ],
    },

    {
        id: 3, category: "Medical Supplies", fulfilled: false, title: "Need medical supplies",
        details:
`In these challenging times, our hospital is facing a critical shortage of medical supplies. We are therefore reaching out to our generous community for help.

We are gratefully accepting donations of:

- Personal Protective Equipment (PPE) such as masks, gloves, and gowns
- Hand sanitizers and disinfectants
- Medical equipment and devices
- First aid supplies
- Over-the-counter medications

Your generous donations will go a long way in ensuring that we can continue to provide quality healthcare to our patients and protect our dedicated healthcare workers.
`,
        donors: [
            {
                donorId: 5,
                firstName: "Youssef",
                lastName: "Khamis",
                address: "18 street 9",
                area: "Maadi",
                governorate: "Cairo",
                details: "Donated protective masks and gloves.",
                email: "youssef.khamis@student.guc.edu.eg",
                phone: "+20 012 555 11111",
            },
            {
                donorId: 6,
                firstName: "Haneen",
                lastName: "Tarek",
                address: "18 street 9",
                area: "Maadi",
                governorate: "Cairo",
                details: "Donated bandages and medicine",
                email: "haneen.ahmed@student.guc.edu.eg",
                phone: "+20 012 555 11111",
            }
        ],
    }
]

