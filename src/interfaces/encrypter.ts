export interface Cryptography {
    encrypt: (value: string) => Promise<object>;
    compare: (value: string, compary: string) => Promise<object>
}