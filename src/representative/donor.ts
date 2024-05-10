
export type Donor = {
    postId: number;
    donorId: number;
    donorName: string;
    postName: string;
    postStatus: 'Fulfilled' | 'Pending';
    details?: string;
}

export const donors: Donor[] = [

    {postId: 1, donorId: 1, donorName: 'Kareem', postName: 'Post 1', postStatus: 'Fulfilled'},
    {postId: 2, donorId: 2, donorName: 'Yassin', postName: 'Post 2', postStatus: 'Pending'},
    {postId: 3, donorId: 3, donorName: 'Ahmed', postName: 'Post 3', postStatus: 'Fulfilled'},
    {postId: 4, donorId: 4, donorName: 'Youssef', postName: 'Post 4', postStatus: 'Pending'},
    {postId: 5, donorId: 5, donorName: 'Raghad', postName: 'Post 5', postStatus: 'Fulfilled'},
    {postId: 6, donorId: 6, donorName: 'Haneen', postName: 'Post 6', postStatus: 'Pending'},
]

