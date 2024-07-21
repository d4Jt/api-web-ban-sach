"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connectDB = async () => {
    try {
        const isConnect = await mongoose_1.default.connect(process.env.MONGO_URI);
        if (isConnect) {
            console.log('MongoDB connected');
        }
        else {
            console.log('MongoDB not connected');
            process.exit(1);
        }
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
