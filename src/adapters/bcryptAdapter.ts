import {
    Cryptography
} from '../interfaces/encrypter';
import { hash, compare as comapareBcrypt } from 'bcrypt';
import message from "../json/messages.json";

class Encrypt implements Cryptography {
    private readonly salt: number | string;

    constructor(salt: string) {
        this.salt = parseInt(salt);
    }

    /**
     * Encrypts a value using bcrypt.
     * @param value - The value to be encrypted.
     * @returns An object containing the encrypted hash or an error message.
     */
    encrypt = async (value: string) => {
        try {
            const hashValue = await hash(value, this.salt);

            return { hash: hashValue };
        } catch (e: any) {
            return { error: message.error.EncryptError }
        }
    }

    /**
     * Compares a value with a hash using bcrypt.
     * @param value - The value to be compared.
     * @param compary - The hash to be compared.
     * @returns An object containing the result of the comparison or an error message.
     */
    compare = async (value: string, compary: string) => {
        try {
            const isValid = await comapareBcrypt(value, compary);
            return { isValid }
        } catch (e: any) {
            return { error: message.error.CompareEncryptionError }
        }
    }
}

export default Encrypt;