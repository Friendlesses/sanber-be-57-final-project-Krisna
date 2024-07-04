import { Request, Response } from "express";
import OrdersModel from "../models/order.model";
import ProductsModel from "../models/products.model";
import { IReqUser } from "../utils/interfaces";

export default {
  async create(req: Request, res: Response) {
    try {
      const { orderItems } = req.body;
      const createdBy = (req as IReqUser).user.id; 

      let grandTotal = 0;
      for (const item of orderItems) {
        const product = await ProductsModel.findById(item.productId);
        if (!product) {
          return res.status(400).json({
            message: `Product with ID ${item.productId} not found`,
          });
        }
        if (item.quantity < 1 || item.quantity > 5) {
          return res.status(400).json({
            message: "Quantity must be between 1 and 5",
          });
        }
        if (item.quantity > product.qty) {
          return res.status(400).json({
            message: `Not enough stock for product ${product.name}`,
          });
        }

        item.name = product.name;
        item.price = product.price;
        grandTotal += item.price * item.quantity;
      }

      for (const item of orderItems) {
        await ProductsModel.findByIdAndUpdate(item.productId, {
          $inc: { qty: -item.quantity },
        });
      }

      const newOrder = await OrdersModel.create({
        grandTotal,
        orderItems,
        createdBy,
        status: "pending",
      });

      res.status(201).json({
        data: newOrder,
        message: "Order created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to create order",
      });
    }
  },

  async findAllByUser(req: Request, res: Response) {
    try {
      const createdBy = (req as IReqUser).user.id; 
      const { page = 1, limit = 10 } = req.query;

      const options = {
        limit: +limit,
        skip: (+page - 1) * +limit,
        sort: { createdAt: -1 },
      };

      const orders = await OrdersModel.find({ createdBy }, {}, options);

      res.status(200).json({
        data: orders,
        message: "Success get orders",
        page: +page,
        limit: +limit,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to get orders",
      });
    }
  },
};
