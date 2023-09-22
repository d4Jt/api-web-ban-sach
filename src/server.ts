import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import { createStream } from 'rotating-file-stream';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// Config path for import modules
import path from 'path';

import { routes } from './routes/index';
import { connectDB } from './config/connectDB';

const app = express();
const port = process.env.PORT;

connectDB().then(() => bootServer());

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
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   let whiteList = [
      'http://localhost:4090',
      'http://localhost:3000',
      'http://localhost:5173',
      'https://oauth.casso.vn',
      `${process.env.DOMAIN}`,
      'https://ban-sach-truc-tuyen.vercel.app',
      'https://abookvn.vercel.app'
   ];
   app.use(
      cors({
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
      })
   );
   app.use(cookieParser());
   app.use(morgan('dev'));
   routes(app);

   app.listen(port, () => {
      console.log(`Server running on port ${port}: http://localhost:${port}`);
   });
};
