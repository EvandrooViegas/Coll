export interface IRepo {
    owner: {
        login: string, 
        url: string,
        repos_url: string,
        avatar_url: string
    }

    name: string,
    html_url: string
}