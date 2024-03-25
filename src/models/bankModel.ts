import { getModelForClass, prop } from "@typegoose/typegoose";

export class Bank {

    @prop({ required: true, unique: true, type: String })
    description?: string;

    @prop({ required: true, unique: true, type: Object })
    accountData?: object;

}

const BankModel = getModelForClass(Bank);
export default BankModel;