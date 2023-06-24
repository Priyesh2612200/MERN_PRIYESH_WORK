import {Request, Response} from 'express'
import { OrderModel } from '../../Model/interface'
import orderRepositary from '../../Repositary/Order/orderRepositary'
import { responseModel } from '../../Model/commanResponse'

const createOrder = async (req: Request, res: Response) => {
    
    const post: OrderModel = {
      customerName: req.body.customerName,
      orderQty: req.body.orderQty,
      stockId: req.body.stockId,
      stock: req.body.stock,
    };

    try {
      const postResponse = await orderRepositary.create(post);
      let response: responseModel = {
        status: 201,
        message: "Order saved successfully",
        data: postResponse,
        error: null,
      };
      res.status(201).json(response);
    } catch (e) {
      let response: responseModel = {
        status: 400,
        message: "Failed to save order",
        data: null,
        error: e as string,
      };
      res.status(400).json(response);
    }
  };


  const getOrder = async (req: Request, res: Response) => {
    
    try {
        const getResponse = await orderRepositary.getorder()
        let response : responseModel = {
            status: 201,
            message: "order Get successfully",
            data: getResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
        let response : responseModel = {
            status: 400,
            message: "order Get failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}

export default {
    createOrder,
    getOrder
}