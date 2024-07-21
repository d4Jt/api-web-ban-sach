"use strict";
const api_1 = require("./api");
module.exports = {
    getDetailUser: async () => {
        let res = await api_1.api.get(`/userInfo`);
        return res;
    },
};
