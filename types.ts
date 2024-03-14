export interface UserSession {
    id: string;
    name?: string;
    email?: string;
    image?: string;
}

export interface AddFavButtonProps {
    postId: string;
    isFavorite: boolean;
    userId: string;
}

export interface Technology {
    id: string;
    name: string;
}

export interface Posts {
    title: string;
    content: string;
    url: string;
    image: string;
    certification: boolean;
    technologies: Technology[];
    userId: string;
}