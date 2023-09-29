export interface User{
    uid: string;
    displayName: string;
    email: string;
    password: string;
}
export interface Bot {
    _id?:string;
    name:string;
    description?: string;
    type:string;
    owner: string;
    channels?: {[key: string]: any};
    created_at: Date;
    updated_at: Date;
}

export interface Conversation {
    _id?: string;
    user_id: string;
    bot_id: string;
    content: string;
    created_at: Date;
}

export interface Vector{
    _id?: string;
    vectorname: string;
    user_id: string;
    bot_id: string;
    path: string;   
    created_at: Date;
}
export interface File{
    _id?: string;
    filename: string;
    user_id: string;
    type?: string;
    bot_id?: string;
    file_path: string;   
    created_at?: Date;
    updated_at?:Date;
    mimetype: string;
    size?: number;
    vectorstore_path?: string;
}
