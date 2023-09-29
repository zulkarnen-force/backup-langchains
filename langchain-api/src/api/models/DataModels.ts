export interface User{
    uid: string;
    displayName: string;
    email: string;
    password: string;
}
export interface Bot {
    name:string;
    description?: string;
    owner: string;
    channels?: {[key: string]: any};
    created_at: Date;
}

export interface Conversation {
    id: string;
    user_id: string;
    bot_id: string;
    content: string;
    created_at: Date;
}

export interface File{
    id: string;
    title: string;
    user_id: string;
    path: string;
    type: string;
    size: number;
    created_at: Date;
}