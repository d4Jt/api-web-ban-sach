"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const webhook_controller_1 = __importDefault(require("../controllers/webhook.controller"));
router
    .route('/handler-bank-transfer')
    .post(webhook_controller_1.default.handlerBankTransfer);
router.route('/users-paid').post(webhook_controller_1.default.usersPaid);
router.route('/register-webhook').post(webhook_controller_1.default.registerWebhook);
router.route('/check-transfer').post(webhook_controller_1.default.checkTransfer);
exports.webhookRouter = router;
