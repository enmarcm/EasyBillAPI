import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { TypeProduct } from "./typeProductModel";

export class Product {
    @prop({ required: true, type: String })
    sku?: string;

    @prop({ required: true, type: String})
    description?: string;

    @prop({ required: true, type: Number })
    price?: number;

    @prop({ required: true, type: Number, default: 0 })
    tax?: number;

    @prop({ required: false, type: String })
    urlImage?: string;

    @prop({ required: false, ref: () => TypeProduct, type: () => TypeProduct })
    type_product?: Ref<TypeProduct>;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;