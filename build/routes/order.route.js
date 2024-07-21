"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
router.get('/statistics', order_controller_1.default.getProductOrder);
router
    .route('/:id')
    .get(order_controller_1.default.getAOrder)
    .put(order_controller_1.default.updateAOrder)
    .delete(order_controller_1.default.deleteAOrder);
router
    .route('/')
    .get(order_controller_1.default.getAllOrder)
    .post(order_controller_1.default.createOrder);
exports.orderRouter = router;
