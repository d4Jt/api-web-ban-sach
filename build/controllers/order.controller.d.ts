import { Request, Response } from 'express';
declare const _default: {
    getAllOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateAOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteAOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProductOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
