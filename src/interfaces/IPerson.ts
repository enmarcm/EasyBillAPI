export interface IPerson {
    _id?: string;
    fullname?: string;
    email?: string;
    address?: {
        street: string;
        number: string;
        city: string;
        state: string;
        country: string;
        postal_code: string;
    };
    document?: string;
    type_document?: {
        description: string;
        type: string;
    };
    type_person?: {
        description: string;
    }[];
}