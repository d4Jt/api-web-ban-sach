"use strict";
const api_1 = require("./api");
module.exports = {
    create: async (data) => {
        let res = await api_1.api.post('/webhooks', data);
        return res;
    },
    getDetailWebhookById: async (webhookId) => {
        let res = await api_1.api.get(`/webhooks/${webhookId}`);
        return res;
    },
    updateWebhookById: async (webhookId, data) => {
        let res = await api_1.api.put(`/webhooks/${webhookId}`, data);
        return res;
    },
    deleteWebhookById: async (webhookId) => {
        let res = await api_1.api.delete(`/webhooks/${webhookId}`);
        return res;
    },
    deleteWebhookByUrl: async (urlWebhook) => {
        // Thêm url vào query để delete https://oauth.casso.vn/v1/webhooks?webhook=https://website-cua-ban.com/api/webhook
        let query = { params: { webhook: urlWebhook } };
        let res = await api_1.api.delete(`/webhooks`, query);
        return res;
    },
    parseOrderId: (caseInsensitive, transactionPrefix, description) => {
        const indexEBOOK = description.indexOf('EBOOK');
        const captcha = description.substring(indexEBOOK + 5, indexEBOOK + 11);
        return captcha;
    },
};
