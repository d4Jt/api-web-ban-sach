import { NextFunction, Request, Response } from 'express';
declare class CartController {
    getAllCarts: (req: Request, res: Response) => Promise<Response>;
    createACart: (req: Request, res: Response) => Promise<Response>;
    updateACart: (req: Request, res: Response) => Promise<Response>;
    deleteACart: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
    getACart: (req: Request, res: Response) => Promise<Response>;
}
declare const _default: CartController;
export default _default;
