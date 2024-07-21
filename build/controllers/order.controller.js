"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const order_service_1 = __importDefault(require("../services/order.service"));
exports.default = new (class OrderController {
    getAllOrder = async (req, res) => {
        try {
            const result = await order_service_1.default.getAllOrder();
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    };
    createOrder = async (req, res) => {
        try {
            const result = await order_service_1.default.createOrder(req.cookies, req.body);
            res.clearCookie('cart', {
                path: '/',
                sameSite: 'none',
                httpOnly: true,
                secure: true,
            });
            return res.status(200).json(result);
        }
        catch (err) {
            console.log({ errOrder: err.message });
            return res.status(500).json({ message: err.message });
        }
    };
    getAOrder = async (req, res) => {
        try {
            const result = await order_service_1.default.getAOrder(req.params.id, req.body);
            return res.status(200).json(result);
        }
        catch (err) {
            console.log({ errOrder: err.message });
            return res.status(500).json({ message: err.message });
        }
    };
    updateAOrder = async (req, res) => {
        try {
            const result = await order_service_1.default.updateAOrder(req.params.id, req.body);
            return res.status(200).json(result);
        }
        catch (err) {
            console.log({ errOrder: err.message });
            return res.status(500).json({ message: err.message });
        }
    };
    deleteAOrder = async (req, res) => {
        try {
            const result = await order_service_1.default.deleteAOrder(req.params.id);
            return res.status(200).json(result);
        }
        catch (err) {
            console.log({ errOrder: err.message });
            return res.status(500).json({ message: err.message });
        }
    };
    getProductOrder = async (req, res) => {
        try {
            const result = await order_service_1.default.getProductOrder();
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    };
})();
