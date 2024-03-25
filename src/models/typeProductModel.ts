import { prop, getModelForClass } from "@typegoose/typegoose";

export class TypeProduct {
    @prop({ required: true, type: String })
    description?: string;
}

const TypeProductModel = getModelForClass(TypeProduct);

export default TypeProductModel;