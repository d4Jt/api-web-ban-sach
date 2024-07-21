"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const cart_route_1 = require("./cart.route");
const product_route_1 = require("./product.route");
const order_route_1 = require("./order.route");
const webhook_route_1 = require("./webhook.route");
const routes = (app) => {
    app.use('/api/carts', cart_route_1.cartRouter);
    app.use('/api/products', product_route_1.productRouter);
    app.use('/api/orders', order_route_1.orderRouter);
    app.use('/api/webhook', webhook_route_1.webhookRouter);
    app.use('/api/post', (req, res) => {
        res.cookie('token', '1234567890', {
            // domain: 'localhost',
            // path: '/',
            sameSite: 'none',
            httpOnly: true,
            maxAge: 600 * 1000,
            secure: true,
        });
        res.send('Set cookie success');
    });
    app.use('/api/get', (req, res) => {
        const token = req.cookies.token;
        res.send(token);
    });
    // app.use('/', (req, res) => {
    //    res.send('Hello World!');
    // });
};
exports.routes = routes;
