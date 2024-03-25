import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: {
        _id: false,
        versionKey: false,
        timestamps: true,
    }
})
class Address {

    @prop({ required: true, trim: true, type: String })
    street?: string;

    @prop({ required: true, trim: true, type: String })
    city?: string;

    @prop({ required: true, trim: true, type: String })
    state?: string;

    @prop({ required: true, trim: true, type: String })
    country?: string;
}

export default Address; 