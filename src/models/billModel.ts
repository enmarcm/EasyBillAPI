import { Ref, prop, getModelForClass, pre, modelOptions, ReturnModelType } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Person } from "./personModel";
import CounterModel from "./counterModel";
import { Document } from "mongoose";



@modelOptions({
    schemaOptions: {
        virtuals: true,
        timestamps: true,
        strictQuery: false
    }
})
@pre<Bill>('save', async function (next) {

    //No entiendo porque entra dos veces, puse o.5 y asi solo es 1
    const counter = await CounterModel.findByIdAndUpdate('billCounter',
        { $inc: { count: 0.5 } },
        { new: true, upsert: true });

    (this as Bill).code = counter?.count;

    next();
})
export class Bill extends Document {

    @prop({ unique: true, type: Number })
    public code?: number;

    @prop({ required: false, default: 0, type: Number })
    total?: number;

    @prop({ required: true, default: false, type: Boolean })
    payed?: boolean;

    @prop({ required: true, ref: () => Person, type: () => Person })
    customer?: Ref<Person>;

    @prop({ required: true, ref: () => User, type: () => User })
    cashier?: Ref<User>;

    static async findBillByCode(this: ReturnModelType<typeof Bill>, code: number) {
        try {
            const bill = await this.findOne({ code })
                .populate('customer', 'fullname -_id')
                .populate('cashier', 'person -_id')
                .populate('person', 'fullname -_id')
                .exec();

            return bill;
        } catch (e: any) {
            console.error('Error al hacer la consulta', e.message);
            return false;
        }
    }


}

const BillModel = getModelForClass(Bill, { schemaOptions: { strictQuery: false } });
export default BillModel;