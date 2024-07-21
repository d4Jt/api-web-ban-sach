"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const api_key = process.env.API_KEY_CASSO;
const axiosClient = axios_1.default.create({
    baseURL: 'https://oauth.casso.vn/v2',
    headers: {
        'content-type': 'application/json',
        Authorization: `Apikey ${api_key}`,
    },
});
exports.api = axiosClient;
axiosClient.interceptors.request.use(async (config) => {
    return config;
});
axiosClient.interceptors.response.use((response) => {
    if (response && response.data)
        return response.data;
    return response;
}, (error) => {
    throw error;
});
