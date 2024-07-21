import { ObjectId, Schema } from 'mongoose';
import { Request } from 'express';
declare class CartService {
    getAllCarts: () => Promise<object>;
    createACart: (id: Schema.Types.ObjectId | string, cookies: Request['cookies'], data: any) => Promise<object>;
    updateACart: (cookies: Request['cookies'], data: any) => Promise<object>;
    deleteACart: (data: Request['body'], cookies: Request['cookies']) => Promise<object>;
    getACart: (cookies: Request['cookies']) => Promise<object>;
}
declare const _default: CartService;
export default _default;
