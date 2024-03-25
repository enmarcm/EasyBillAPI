import { Request, Response } from "express";
import TypeProductModel from "../models/typeProductModel";
import messages from '../json/messages.json';

class TypeProductController {
    static async createTypeProduct(req: Request, res: Response){
        const { description } = req.body;
        if (!description) return res.status(400).json({ message: messages.error.MissingParameters });
        try {
            const newTypeProduct = await TypeProductModel.create({ description });
            await newTypeProduct.save();

            return res.status(201).json(newTypeProduct);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteTypeProduct(req: Request, res: Response){
        const { typeProduct } = req.body;
        if (!typeProduct) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            await TypeProductModel.findByIdAndDelete(typeProduct);
            return res.status(200).json({ message: messages.success.ElementDeleted });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getTypeProducts(res: Response){
        try {
            const typeProducts = await TypeProductModel.find();
            return res.status(200).json(typeProducts);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateTypeProduct(req: Request, res: Response){
        const { typeProduct, description } = req.body;
        if (!typeProduct || !description) return res.status(400).json({ message: messages.error.MissingParameters });

        try {
            const typeProductToUpdate = await TypeProductModel.findById(typeProduct);
            if (!typeProductToUpdate) return res.status(404).json({ message: messages.error.ElementNotFound });

            typeProductToUpdate.description = description;
            await typeProductToUpdate.save();

            return res.status(200).json({ 
                message: messages.success.ElementUpdated, 
                typeProduct: typeProductToUpdate
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default TypeProductController;