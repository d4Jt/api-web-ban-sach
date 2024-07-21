import { Request, Response } from 'express';
declare class WebhookController {
    handlerBankTransfer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    usersPaid: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    registerWebhook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    checkTransfer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: WebhookController;
export default _default;
