"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = require("./routes/index");
const connectDB_1 = require("./config/connectDB");
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, connectDB_1.connectDB)().then(() => bootServer());
// const isProduction = process.env.BUILD_CODE === 'production'; // để phân biệt dev và production
// tạo file log theo ngày tới thư mục log trong thư mục gốc của project
// const accessLogStream = createStream('access.log', {
//    interval: '1d', // rotate daily
//    path: path.join(__dirname, 'log'),
// });
// app.use((req, res, next) => {
//    res.setHeader(
//       'Access-Control-Allow-Origin',
//       'https://ban-sach-truc-tuyen.vercel.app'
//    );
//    res.setHeader('Access-Control-Allow-Credentials', 'true');
//    res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH'
//    );
//    res.setHeader(
//       'Access-Control-Allow-Headers',
//       'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
//    );
//    next();
// });
const bootServer = async () => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    let whiteList = [
        'http://localhost:4090',
        'http://localhost:3000',
        'http://localhost:5173',
        'https://oauth.casso.vn',
        `${process.env.DOMAIN}`,
        'https://ban-sach-truc-tuyen.vercel.app',
        'https://abookvn.vercel.app'
    ];
    app.use((0, cors_1.default)({
        // origin: function (origin: any, callback: any) {
        //    if (whiteList.indexOf(origin) !== -1) {
        //       callback(null, true);
        //    } else {
        //       callback(new Error('Not allowed by CORS'));
        //    }
        // },
        origin: whiteList,
        credentials: true,
        allowedHeaders: [
            'Authorization',
            'Content-Type',
            'Access-Control-Request-Method',
            'X-Requested-With',
            'Accept',
            'Access-Control-Request-Headers',
            'Origin',
            'Access-Control-Allow-Headers',
        ],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
        exposedHeaders: ['Access-Control-Allow-Origin', 'x-auth-token'],
        preflightContinue: true,
        // optionSuccessStatus: 200,
    }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, morgan_1.default)('dev'));
    (0, index_1.routes)(app);
    app.listen(port, () => {
        console.log(`Server running on port ${port}: http://localhost:${port}`);
    });
};
