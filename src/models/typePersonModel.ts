import { getModelForClass, prop } from "@typegoose/typegoose";

export class TypePerson {

    @prop({ required: true, unique: true, lowercase: true, maxlength: 30, trim: true, type: String })
    description?: string;

}

const TypePersonModel = getModelForClass(TypePerson);
export default TypePersonModel;