"use strict";
const api_1 = require("./api");
module.exports = {
    getTokenByAPIKey: async (code) => {
        let token = await api_1.api.post('/token', { code: code });
        return token;
    },
};
