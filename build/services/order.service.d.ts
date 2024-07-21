import { ObjectId, Schema } from 'mongoose';
import { Request } from 'express';
declare class OrderService {
    getAllOrder: () => Promise<object>;
    createOrder: (cookies: Request['cookies'], data: any) => Promise<object>;
    deleteAOrder: (id: Schema.Types.ObjectId | string) => Promise<object>;
    getAOrder: (id: Schema.Types.ObjectId | string, data: any) => Promise<object>;
    updateAOrder: (id: Schema.Types.ObjectId | string, data: any) => Promise<object>;
    getProductOrder: () => Promise<object>;
}
declare const _default: OrderService;
export default _default;
