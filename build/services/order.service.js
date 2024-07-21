"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const Cart_model_1 = __importDefault(require("../models/Cart.model"));
const Order_model_1 = __importDefault(require("../models/Order.model"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
class OrderService {
    getAllOrder = async () => {
        try {
            const data = await Order_model_1.default.find({});
            if (!data)
                throw new Error('Order not found');
            let orderCompleted = data.reduce((acc, cur) => {
                if (cur.status === 'completed') {
                    acc += cur.total_price;
                }
                return acc;
            }, 0);
            let orderPending = data.reduce((acc, cur) => {
                if (cur.status === 'pending') {
                    acc += cur.total_price;
                }
                return acc;
            }, 0);
            return {
                status: 'Successfully found all',
                orders: data || [],
                expectedRevenue: orderPending,
                actualRevenue: orderCompleted,
                reducedRevenue: (orderCompleted * 30) / 100,
            };
        }
        catch (err) {
            throw new Error(err);
        }
    };
    createOrder = async (cookies, data) => {
        try {
            const cartId = cookies.cart;
            const cart = await Cart_model_1.default.findById(cartId);
            if (!cart)
                throw new Error('Cart not found');
            const cartProduct = [];
            const productsPrice = [];
            for (let i = 0; i < cart.products.length; i++) {
                const product = await Product_model_1.default.findById(cart.products[i].product);
                if (product.stock - cart.products[i].quantity >= 0) {
                    cartProduct.push({
                        product: cart.products[i].product,
                        quantity: cart.products[i].quantity,
                    });
                    productsPrice.push(product.price * cart.products[i].quantity);
                }
            }
            for (let i = 0; i < cartProduct.length; i++) {
                const product = await Product_model_1.default.findById(cartProduct[i].product);
                const stockProduct = product.stock - cartProduct[i].quantity;
                const newStock = stockProduct < 0 ? 0 : stockProduct;
                await Product_model_1.default.findByIdAndUpdate(cartProduct[i].product, {
                    stock: newStock,
                });
            }
            const oldPrice = productsPrice.reduce((total, price) => {
                return total + price;
            }, 0);
            const results = await Order_model_1.default.create({
                customer: data,
                products: cartProduct,
                total_price: oldPrice,
                captcha: data.captcha,
            });
            await Cart_model_1.default.findByIdAndDelete(cartId);
            return {
                status: 'Successfully create Order',
                results,
            };
        }
        catch (err) {
            console.log({ ErrorOder: err });
            throw new Error(err);
        }
    };
    deleteAOrder = async (id) => {
        try {
            const order = await Order_model_1.default.findById(id);
            // let results
            if (!order) {
                throw new Error('Something went wrong! Please try again later!');
            }
            const deleteOder = await Order_model_1.default.findByIdAndDelete(id);
            return {
                deleteOder,
            };
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };
    getAOrder = async (id, data) => {
        try {
            const order = await (await Order_model_1.default.findById(id)).populate('products.product');
            // let results
            if (!order) {
                throw new Error('Something went wrong! Please try again later!');
            }
            return {
                order,
            };
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };
    updateAOrder = async (id, data) => {
        try {
            const order = await Order_model_1.default.findById(id);
            // let results
            if (!order) {
                throw new Error('Something went wrong! Please try again later!');
            }
            const updateOder = await Order_model_1.default.findByIdAndUpdate(id, data);
            return {
                updateOder,
            };
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };
    getProductOrder = async () => {
        try {
            const order = await Order_model_1.default.find();
            // let results
            if (!order) {
                throw new Error('Something went wrong! Please try again later!');
            }
            let productOrder = order.map((item) => {
                return { products: item.products };
            });
            const output = productOrder.reduce((acc, cur) => {
                return acc.concat(cur.products);
            }, []);
            const result = [];
            const dict = [{}];
            for (const item of output) {
                const { product, quantity } = item;
                if (dict[product]) {
                    dict[product] += quantity;
                }
                else {
                    dict[product] = quantity;
                }
            }
            for (const product in dict) {
                if (product != '0') {
                    const itemProduct = await Product_model_1.default.findById(product);
                    console.log(itemProduct);
                    result.push({
                        product: itemProduct,
                        quantity: dict[product],
                    });
                }
            }
            return {
                result,
            };
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };
}
exports.default = new OrderService();
