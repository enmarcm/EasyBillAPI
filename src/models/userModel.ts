import { pre, prop, getModelForClass, Ref, ReturnModelType } from '@typegoose/typegoose'
import PersonModel, { Person } from './personModel';
import { IUser } from '../interfaces/IUser';
import { Document } from 'mongoose';

import message from '../json/messages.json'
import Encrypt from '../adapters/bcryptAdapter';

const salt = process.env.SALT ?? "11";
const encrypt = new Encrypt(salt);

@pre<User>('save', async function (next) {
    if (!(this as User).isModified('password')) return next();

    const { hash } = await encrypt.encrypt((this as User).password as string);

    (this as User).password = hash;
    next();
})
export class User extends Document {

    @prop({ required: true, type: String })
    password?: string;

    @prop({ default: true, type: Boolean })
    status?: boolean;

    @prop({ required: false, default: null, lowercase: true, type: String })
    url_image?: string;

    @prop({ required: true, unique: true, ref: () => Person, type: () => Person })
    person?: Ref<Person>;

    static async findUserByEmailOrDocument(this: ReturnModelType<typeof User>, email?: string, document?: string) {
        try {
            const person = await PersonModel.findOne({ email }).select('_id');

            const user = await this.findOne({ person: person?._id })
                .populate('person', 'email -_id') as IUser;

            if (!user) {
                const person = await PersonModel.findOne({ document }).select('_id');
                const user = await this.findOne({ person: person?._id })
                    .populate('person', 'email -_id') as IUser;

                return { user }
            }
            return { user };
        } catch (e: any) {
            console.error('Error making query', e.message);
            return { error: message.error.RequestDBError }
        }
    }
}

const UserModel = getModelForClass(User);
export default UserModel;