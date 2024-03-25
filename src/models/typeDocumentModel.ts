import { getModelForClass, prop } from "@typegoose/typegoose";

export class TypeDocument {

    @prop({ required: true, unique: true, maxlength: 50, minlength: 3, type: String })
    public description?: string;

    @prop({ required: true, unique: true, uppercase: true, maxlength: 2, minlength: 1, type: String })
    public type?: string;
}

const TypeDocumentModel = getModelForClass(TypeDocument);
export default TypeDocumentModel;