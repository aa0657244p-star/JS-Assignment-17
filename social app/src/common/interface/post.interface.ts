export interface IPost {
    _id?: string;
    title: string;
    content: string;
    userId: string;
    likes?: string[];
    commentsCount?: number;
}