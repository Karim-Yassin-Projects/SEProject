
export type Donor = {
    postId: number;
    donorId: number;
    donorName: string;
    postName: string;
    postStatus: 'Fulfilled' | 'Pending';
    details?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    area?: string;
    governorate?: string;
}

export const donors: Donor[] = [

    {postId: 1, details: 'Donated 5,000 EGP', donorId: 1, donorName: 'Kareem', postName: 'Post 1', postStatus: 'Fulfilled', firstName: 'Kareem', lastName: 'ElMeteny', area: 'Maadi', email: 'kareem.elmeteny@student.guc.edu.eg', address: '18 street 9', phone: '+20 012 555 11111', governorate: 'Cairo'},
    {postId: 2, details: 'Donated 12 items of clothing.', donorId: 2, donorName: 'Yassin', postName: 'Post 2', postStatus: 'Pending', firstName: 'Yassin', lastName: 'ElHelly', area: 'Maadi', email: 'yassin.ahmed@student.guc.edu.eg', address: '18 street 9', phone: '+20 012 555 11111', governorate: 'Cairo'},
    {postId: 3, details: 'Taught 40 hours', donorId: 3, donorName: 'Ahmed', postName: 'Post 3', postStatus: 'Fulfilled', firstName: 'Ahmed', lastName: 'Hossam', area: 'Maadi', email: 'ahmed.hossam@student.guc.edu.eg', address: '18 street 9', phone: '+20 012 555 11111', governorate: 'Cairo'},
    {postId: 4, details: 'Donated medical supplies.', donorId: 4, donorName: 'Youssef', postName: 'Post 4', postStatus: 'Pending', firstName: 'Youssef', lastName: 'Khamis', area: 'Maadi', email: 'youssef.khamis@student.guc.edu.eg', address: '18 street 9', phone: '+20 012 555 11111', governorate: 'Cairo'},
    {postId: 5, details: 'Donated 3,000 EGP', donorId: 5, donorName: 'Raghad', postName: 'Post 5', postStatus: 'Fulfilled', firstName: 'Raghad', lastName: 'Helal', area: 'Maadi', email: 'raghad.mohammed@student.guc.edu.eg', address: '18 street 9', phone: '+20 012 555 11111', governorate: 'Cairo'},
    {postId: 6, details: 'Donated 1,500 EGP', donorId: 6, donorName: 'Haneen', postName: 'Post 6', postStatus: 'Pending', firstName: 'Haneen', lastName: 'Tarek', area: 'Maadi', email: 'haneen.ahmed@student.guc.edu.eg', address: '18 street 9', phone: '+20 012 555 11111', governorate: 'Cairo'},
]

