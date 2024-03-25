import { Request, Response } from "express";
import RowModel from "../models/rowModel";
import messages from '../json/messages.json';

class RowController {
    static async createRow(req: Request, res: Response){
        const { bill, product, amount } = req.body;
        if (!bill || !product || !amount) {
            return res.status(400).json({ message: messages.error.MissingParameters });
        }
        try {
            const newRow = await RowModel.create({ bill, product, amount });
            await newRow.save();

            return res.status(201).json(newRow);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteRow(req: Request, res: Response){
        const { row } = req.body;
        if (!row) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            await RowModel.findByIdAndDelete(row);
            return res.status(200).json({ message: messages.success.ElementDeleted });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateAmount(req: Request, res: Response){
        const { row, amount } = req.body;
        if (!row || !amount) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const rowToUpdate = await RowModel.findById(row);
            if (!rowToUpdate) return res.status(404).json({ message: messages.error.ElementNotFound });

            rowToUpdate.amount = amount;
            await rowToUpdate.save();

            return res.status(200).json({ message: messages.success.ElementUpdated, row: rowToUpdate});
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateProduct(req: Request, res: Response){
        const { row, product } = req.body;
        if (!row || !product) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const rowToUpdate = await RowModel.findById(row);
            if (!rowToUpdate) return res.status(404).json({ message: messages.error.ElementNotFound });

            rowToUpdate.product = product;
            await rowToUpdate.save();

            return res.status(200).json({ message: messages.success.ElementUpdated, row: rowToUpdate});
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default RowController;