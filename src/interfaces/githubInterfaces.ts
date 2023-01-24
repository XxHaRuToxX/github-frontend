
export interface User {
    id?:number;
    name?:string;
    login:string;
    avatar_url?:string;
    followers_url?:string;
    html_url?:string;
    created_at?:string;
}

export interface Owner extends User {
    type?:string;
}
export interface GithubRepository {
    id?:number;
    name?:string;
    html_url?:string;
    visibility?:string;
    owner?:Owner
}


export interface GithubUser {
    singleUser: User | null;
    users:User[];
    repositories: GithubRepository[];
}


export interface GithubRepositories {
    singleRespository: GithubRepository;
    repositories: GithubRepository[];
}