"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const cart_service_1 = __importDefault(require("../services/cart.service"));
class CartController {
    getAllCarts = async (req, res) => {
        try {
            const result = await cart_service_1.default.getAllCarts();
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    };
    createACart = async (req, res) => {
        try {
            const result = await cart_service_1.default.createACart(req.params.id, req.cookies, req.body);
            if ('cookieValue' in result) {
                // Kiem tra xem co cookieValue trong result khong (hàm thay thế khác: Object.keys(result).includes('cookieValue'), Object.hasOwn(result, 'cookieValue'))
                if (process.env.BUILD_CODE === 'production') {
                    res.cookie('cart', result.cookieValue, {
                        // domain: 'api-ebook.cyclic.app',
                        sameSite: 'none',
                        // path: '/',
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        httpOnly: true,
                        secure: true,
                    });
                }
                else {
                    res.cookie('cart', result.cookieValue, {
                        // domain: 'api-ebook.cyclic.app',
                        sameSite: 'none',
                        // path: '/',
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        httpOnly: true,
                        secure: false,
                    });
                }
                return res.status(200).json(result);
            }
            else {
                return res.status(201).json(result);
            }
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).json(err.message);
        }
    };
    updateACart = async (req, res) => {
        try {
            const result = await cart_service_1.default.updateACart(req.cookies, req.body);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    };
    deleteACart = async (req, res, next) => {
        try {
            const data = await cart_service_1.default.deleteACart(req.body, req.cookies);
            for (let entry of Object.entries(data)) {
                const [key, value] = entry;
                if (key === 'result' && Object.keys(value).length === 0) {
                    res.clearCookie('cart', {
                        path: '/',
                        // domain: 'api-ebook.cyclic.app',
                        sameSite: 'none',
                        httpOnly: true,
                        secure: true,
                    });
                    return res.status(200).json(data);
                }
            }
            return res.status(200).json(data);
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    };
    getACart = async (req, res) => {
        try {
            const result = await cart_service_1.default.getACart(req.cookies);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    };
}
exports.default = new CartController();
