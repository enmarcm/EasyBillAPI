import { getModelForClass, prop } from "@typegoose/typegoose";


export class Counter {

    @prop({ required: true, type: String })
    public _id?: string;

    @prop({ required: true, default: 0, type: Number })
    public count?: number;
}

const CounterModel = getModelForClass(Counter);
export default CounterModel;
