"use strict";
const api_1 = require("./api");
module.exports = {
    getTransactions: async (params, accessToken) => {
        api_1.api.defaults.headers.Authorization = accessToken;
        let res = await api_1.api.get('/transactions', { params });
        return res;
    },
    getDetailTransaction: async (transactionId, accessToken) => {
        api_1.api.defaults.headers.Authorization = accessToken;
        let res = await api_1.api.get(`/transactions/${transactionId}`);
        return res;
    },
};
