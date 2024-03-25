import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Bill } from './billModel';
import { PaymentMethod } from './paymentMethodModel';

export class Payment {
    @prop({ required: true, type: Number })
    amount?: number;

    @prop({ required: true, ref: () => Bill, type: () => Bill })
    bill?: Ref<Bill>;

    @prop({ required: true, ref: () => PaymentMethod, type: () => PaymentMethod})
    paymentMethod?: Ref<PaymentMethod>;
}

const PaymentModel = getModelForClass(Payment);

export default PaymentModel;