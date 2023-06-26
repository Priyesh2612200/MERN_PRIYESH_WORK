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

const deleteOrder = async (req: Request, res: Response) => {
 
  try {
    console.log(req.params)

    const deleteOrder = await orderRepositary.deleteOrder(req.params.id);

    if (deleteOrder) {
      let response: responseModel = {
        status: 200,
        message: "Order deleted successfully",
        data: null,
        error: null,
      };
      res.status(200).json(response);
    } else {
      let response: responseModel = {
        status: 404,
        message: "Order not found",
        data: null,
        error: null,
      };
      res.status(404).json(response);
    }
  } catch (e) {
    console.log("deleteerror",e)
    let response: responseModel = {
      status: 500,
      message: "Order delete failed",
      data: null,
      error: e as string,
    };
    res.status(500).json(response);
  }
};

export default {
    createOrder,
    getOrder,
    deleteOrder
}