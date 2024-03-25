import { Request, Response } from "../adapters/expressAdapter";

import BillModel from "../models/billModel";
import message from "../json/messages.json";


class BillController {

    static createBill = async (req: Request, res: Response) => {
        const { customer, cashier } = req.body;
        if (!customer || !cashier) return res.status(400).send(message.error.MissingParameters);

        try {
            const bill = await BillModel.create({ customer, cashier });

            const b = await bill.save();
            if (!b) return res.status(400).json({ error: message.error.RequestDBError })

            return res.status(201).json({ idBill: b?._id })
        } catch (e: any) {
            console.error('Error al hacer la consulta', e.message);
            return res.status(400).json({ error: message.error.RequestDBError });
        }
    }

    static getBillByCode = async (req: Request, res: Response) => {
        const { code } = req.body;
        if (!code) return res.status(400).send(message.error.MissingParameters);

        try {
            if (code.match(/^[0-9]+$/)) return res.status(400).send(message.error.InvalidParameters);

            const bill = await BillModel.findBillByCode(code)
            if (!bill) return res.status(404).send(message.error.ElementNotFound);

            return res.status(200).json({ bill });
        } catch (error) {
            return res.status(400).json({ error: message.error.RequestDBError });
        }
    }

    static deleteBill = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;
            if (!id) return res.status(400).send(message.error.MissingParameters);

            const bill = await BillModel.findByIdAndDelete(id);
            if (!bill) return res.status(404).send(message.error.ElementNotFound);

            return res.status(200).send(message.success.ElementDeleted);
        } catch (error) {
            return res.status(400).json({ error: message.error.RequestDBError });
        }
    }
}

export default BillController;