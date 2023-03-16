// import { Request, Response } from "express";
import { config } from 'dotenv';
config();

import OrderService from '../services/order.service';

export default new (class OrderController {
   getAllOrder = async (req, res) => {
      try {
         const result = await OrderService.getAllOrder();

         return res.status(200).json(result);
      } catch (err) {
         return res.status(500).json(err.message);
      }
   };

   createOrder = async (req, res) => {
      try {
         const result = await OrderService.createOrder(req.cookies, req.body);

         res.clearCookie('cart');
         return res.status(200).json(result);
      } catch (err) {
         console.log({ errOrder: err.message });
         return res.status(500).json({ message: err.message });
      }
   };

   updateOrder = async (req, res) => {
      try {
         const result = await OrderService.updateOrder(req.body);
         return res.status(200).json(result);
      } catch (err) {
         console.log({ errOrder: err.message });
         return res.status(500).json({ message: err.message });
      }
   };

   deleteOrder = async (req, res) => {
      try {
         const result = await OrderService.deleteOder(req.body);
         return res.status(200).json(result);
      } catch (err) {
         console.log({ errOrder: err.message });
         return res.status(500).json({ message: err.message });
      }
   };

   getAOrder = async (req, res) => {
      try {
         const result = await OrderService.getAOrder(req.body);
         return res.status(200).json(result);
      } catch (err) {
         console.log({ errOrder: err.message });
         return res.status(500).json({ message: err.message });
      }
   };
})();