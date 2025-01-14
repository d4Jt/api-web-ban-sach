"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
router
    .route('/')
    .get(product_controller_1.default.getAllProducts)
    .post(product_controller_1.default.createAProduct);
router.route('/category').get(product_controller_1.default.getProductsByCategory);
router
    .route('/:id')
    .patch(product_controller_1.default.updateAProduct)
    .delete(product_controller_1.default.deleteAProduct)
    .get(product_controller_1.default.getAProduct);
exports.productRouter = router;
