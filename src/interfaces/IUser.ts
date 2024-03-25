export interface IUser {
    _id: string;
    password: string;
    status: boolean;
    url_image: string;
    person: {
        email: string;
    }
}