declare const _default: {
    create: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
    getDetailWebhookById: (webhookId: any) => Promise<import("axios").AxiosResponse<any, any>>;
    updateWebhookById: (webhookId: any, data: any) => Promise<import("axios").AxiosResponse<any, any>>;
    deleteWebhookById: (webhookId: any) => Promise<import("axios").AxiosResponse<any, any>>;
    deleteWebhookByUrl: (urlWebhook: any) => Promise<import("axios").AxiosResponse<any, any>>;
    parseOrderId: (caseInsensitive: boolean, transactionPrefix: string, description: string) => string;
};
export = _default;
