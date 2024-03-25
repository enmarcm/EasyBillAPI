import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Payment } from "./paymentModel";

class PaymentReference {
    @prop({ required: true, ref: () => Payment, type: () => Payment })
    payment?: Ref<Payment>;

    @prop({ required: true, type: String })
    reference?: string;
}

const PaymentReferenceModel = getModelForClass(PaymentReference);

export default PaymentReferenceModel;