"use strict";
const api_1 = require("./api");
module.exports = {
    syncTransaction: async (bankNumber) => {
        let res = await api_1.api.post('/sync', { bank_acc_id: bankNumber });
        return res;
    },
};
