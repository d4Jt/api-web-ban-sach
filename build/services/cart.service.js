"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_model_1 = __importDefault(require("../models/Cart.model"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
class CartService {
    getAllCarts = async () => {
        try {
            const data = await Cart_model_1.default.find({}).populate('products.product');
            return { status: 'Successfully found all', data };
        }
        catch (err) {
            throw new Error(err);
        }
    };
    createACart = async (id, cookies, data) => {
        try {
            const quantityBody = data.quantity;
            const product = await Product_model_1.default.findOne({ _id: id });
            if (!product)
                throw new Error('Product not found');
            const price = product.price;
            //* Có giỏ hàng
            if (Object.keys(cookies).length > 0 &&
                Object.hasOwn(cookies, 'cart')) {
                const cartId = cookies.cart;
                const cart = await Cart_model_1.default.findById(cartId);
                if (!cart)
                    throw new Error('Cart not found');
                const oldPrice = cart.total_price;
                // check xem giỏ hàng đã có sản phẩm đó chưa
                // nếu có rồi thì tăng số lượng lên 1
                // nếu chưa có thì thêm sản phẩm vào giỏ hàng
                const product = await Cart_model_1.default.findById(cartId).elemMatch('products', { product: id });
                //* Có sản phẩm trong giỏ
                let result;
                if (product) {
                    const productGetStock = await Product_model_1.default.findById(id);
                    if (!productGetStock)
                        throw new Error('Product not found');
                    const stock = productGetStock.stock;
                    // check xem số lượng sản phẩm trong giỏ hàng có vượt quá số lượng trong kho không
                    // nếu vượt quá thì báo lỗi
                    // lay quantity cua product do ra roi tang len 1
                    const quantity = product.products.find((p) => p.product == id)?.quantity;
                    const newQuantity = quantity + quantityBody;
                    if (newQuantity > stock) {
                        throw new Error('Out of stock');
                    }
                    result = await Cart_model_1.default.findByIdAndUpdate(cartId, {
                        $set: {
                            'products.$.quantity': newQuantity,
                            total_price: price * quantityBody + oldPrice,
                        },
                    }, { returnDocument: 'after' }).elemMatch('products', { product: id });
                }
                else {
                    //* Chưa có sản phẩm trong giỏ hàng
                    result = await Cart_model_1.default.findByIdAndUpdate(cartId, {
                        $push: {
                            products: {
                                product: id,
                                quantity: quantityBody,
                            },
                        },
                        total_price: price * quantityBody + oldPrice,
                    }, { returnDocument: 'after' });
                }
                return { status: 'Successfully updated', result };
            }
            //* Chưa có giỏ hàng
            const result = await Cart_model_1.default.create({
                products: [
                    {
                        product: id,
                        quantity: quantityBody,
                    },
                ],
                total_price: price * quantityBody,
            });
            return {
                status: 'Successfully created',
                result,
                cookieValue: result._id,
            };
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };
    updateACart = async (cookies, data) => {
        try {
            const { productId, quantity } = data;
            if (!productId || !quantity) {
                throw new Error('Missing required fields');
            }
            if (Object.keys(cookies).length < 1 && !Object.hasOwn(cookies, 'cart'))
                throw new Error('Something went wrong! Please try again later!');
            const cartId = cookies.cart;
            //* Cập nhật số lượng
            await Cart_model_1.default.findByIdAndUpdate(cartId, {
                $set: { 'products.$.quantity': quantity },
            }).elemMatch('products', { product: productId });
            //* Cập nhật tổng tiền (có nhiều sản phẩm thì cộng tiền)
            const cart = await (await Cart_model_1.default.findById(cartId)).populate('products.product');
            let tempPrice = 0;
            // cart.products.forEach((p: any) => {
            //    tempPrice += p.quantity * p.product.price;
            // });
            tempPrice = cart.products.reduce((acc, p) => {
                return acc + p.quantity * p.product.price;
            }, tempPrice);
            const result = await Cart_model_1.default.findByIdAndUpdate(cartId, {
                $set: { total_price: tempPrice },
            }, { returnDocument: 'after' }).populate('products.product');
            return { status: 'Successfully updated', result };
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };
    deleteACart = async (data, cookies) => {
        try {
            const { productId } = data;
            if (!productId) {
                throw new Error('Missing required fields');
            }
            if (Object.keys(cookies).length < 1 && !Object.hasOwn(cookies, 'cart'))
                throw new Error('Something went wrong! Please try again later!');
            const cartId = cookies.cart;
            // Kiểm tra giỏ hàng có tồn tại không
            const cart = await Cart_model_1.default.findById(cartId).populate({
                path: 'products.product',
            });
            if (!cart)
                throw new Error('Cart not found');
            // Kiểm tra product có trong giỏ hàng không
            const product = await Cart_model_1.default.findById(cartId).elemMatch('products', { product: productId });
            if (!product)
                throw new Error('Product not found');
            const oldPrice = Number(cart.total_price);
            cart.products.forEach(async (p) => {
                if (p.product._id == productId) {
                    const price = p.product.price;
                    const quantity = p.quantity;
                    const newPrice = oldPrice - price * quantity;
                    await Cart_model_1.default.findByIdAndUpdate(cartId, {
                        $set: { total_price: newPrice },
                    });
                }
            });
            const result = await Cart_model_1.default.findByIdAndUpdate({ _id: cartId }, {
                $pull: {
                    products: { product: productId },
                },
            }, { returnDocument: 'after' });
            // Kiểm tra giỏ hàng có sản phẩm nào không
            if (result.products.length < 1) {
                await Cart_model_1.default.findByIdAndDelete(cartId);
                return { status: 'Successfully deleted', result: {} };
            }
            return { status: 'Successfully deleted', result };
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };
    getACart = async (cookies) => {
        try {
            // Kiểm tra giỏ hàng có tồn tại không
            if (Object.keys(cookies).length < 1 && !Object.hasOwn(cookies, 'cart'))
                return {};
            const cartId = cookies.cart;
            const cart = await Cart_model_1.default.findById(cartId).populate({
                path: 'products.product',
            });
            if (!cart)
                throw new Error('Cart not found');
            return cart;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };
}
exports.default = new CartService();
