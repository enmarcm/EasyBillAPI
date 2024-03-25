import PaymentReferenceModel from "../models/paymentReferenceModel";
import PaymentModel from "../models/paymentModel";
import messages from '../json/messages.json';
import { Request, Response } from "express";

class PaymentReferenceController {
    static async createPaymentReference(req: Request, res: Response){
        const { payment, reference } = req.body;
        if(!payment || !reference) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const paymentReferencePayment = await PaymentModel.findById(payment);
            if(!paymentReferencePayment) return res.status(404).json({ message: messages.error.ElementNotFound });

            const newPaymentReference = new PaymentReferenceModel({ payment, reference });
            await newPaymentReference.save();

            return res.status(201).json({ newPaymentReference });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default PaymentReferenceController;