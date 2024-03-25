import { Request, Response } from "express";
import BillModel from "../models/billModel";
import PaymentModel from "../models/paymentModel";
import messages from '../json/messages.json';

class PaymentController {
    static async createPayment(req: Request, res: Response){
        const { amount, bill, paymentMethod } = req.body;
        if(!amount || !bill || !paymentMethod){
            return res.status(400).json({ message: messages.error.MissingParameters });
        }

        try {
            const billPayment = await BillModel.findById(bill);
            if(!billPayment) return res.status(404).json({ message: messages.error.ElementNotFound });

            const paymentMethodPayment = await PaymentModel.findById(paymentMethod);
            if(!paymentMethodPayment) return res.status(404).json({ message: messages.error.ElementNotFound });

            const newPayment = new PaymentModel({ amount, bill, paymentMethod });
            await newPayment.save();

            return res.status(201).json({ newPayment });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deletePayment(req: Request, res: Response){
        const { payment } = req.body;
        if(!payment) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            await PaymentModel.findByIdAndDelete(payment);
            return res.status(200).json({ message: messages.success.ElementDeleted });
        } catch (error: any) {
            return res.status(500).json({ message: error.message }); 
        }
    }

    static async getPaymentsByBill(req: Request, res: Response){
        const { bill } = req.body;
        if(!bill) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const billPayments = await PaymentModel.findById(bill);
            if(!billPayments) return res.status(404).json({ message: messages.error.ElementNotFound });

            const payments = await PaymentModel.find({ bill });
            
            return res.status(200).json({ payments });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default PaymentController;