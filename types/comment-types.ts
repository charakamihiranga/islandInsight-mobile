export interface CommentTypes {
    userId: string;
    username: string;
    comment: string;
    userPhoto?: string;
}

export interface CommentWithId extends CommentTypes {
    id: string;
    timestamp: any;
}
