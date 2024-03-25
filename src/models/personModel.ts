import { prop, getModelForClass, Ref, ReturnModelType, modelOptions } from "@typegoose/typegoose";
import { TypeDocument } from "./typeDocumentModel";
import { TypePerson } from "./typePersonModel";
import message from "../json/messages.json";
import { IPerson } from "../interfaces/IPerson";


@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Person {

    @prop({ required: true, type: String })
    fullname?: string;

    @prop({ required: true, unique: true, trim: true, type: String })
    email?: string;

    @prop({ required: false, type: String })
    address?: string;

    @prop({ required: true, type: String })
    phoneNumber?: string;

    @prop({ required: true, trim: true, unique: true, type: String })
    document?: string;

    @prop({ required: true, ref: () => TypeDocument, type: () => TypeDocument })
    type_document?: Ref<TypeDocument>;

    @prop({ required: true, ref: () => TypePerson, type: Array })
    type_person!: Ref<TypePerson>[];

    static async findPersonByDocument(this: ReturnModelType<typeof Person>, document: string) {
        try {

            const person = await this.findOne({ document })
                .populate('type_document', 'description type -_id')
                .populate('type_person', 'description -_id') as IPerson;

            return { person };

        } catch (e: any) {
            console.error('Error making query', e.message);
            return { error: message.error.RequestDBError }
        }
    }
}


const PersonModel = getModelForClass(Person);
export default PersonModel;