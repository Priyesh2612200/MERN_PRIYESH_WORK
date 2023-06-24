import {Request, Response} from 'express'
import { StockModel } from '../../Model/interface'
import stockRepositary from '../../Repositary/Stock/stockRepositary'
import { responseModel } from '../../Model/commanResponse'

const createStock = async (req: Request, res: Response) => {
    const { name, qty } = req.body;
  
    try {
      // Check if stock with the same name already exists
      const existingStock = await stockRepositary.findByName(name);
      if (existingStock) {
        return res.status(400).json({ message: 'Stock with the same name already exists' });
      }
  
      const stock: StockModel = {
        name,
        qty,
      };
  
      const postResponse = await stockRepositary.create(stock);
  
      let response: responseModel = {
        status: 201,
        message: 'Stock saved successfully',
        data: postResponse,
        error: null,
      };
  
      return res.status(201).json(response);
    } catch (e) {
      let response: responseModel = {
        status: 400,
        message: 'Stock save failed',
        data: null,
        error: e as string,
      };
  
      return res.status(400).json(response);
    }
  };
  

const getStock = async (req: Request, res: Response) => {
    
    try {
        const getResponse = await stockRepositary.getStock()
        let response : responseModel = {
            status: 201,
            message: "Stock Get successfully",
            data: getResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
        let response : responseModel = {
            status: 400,
            message: "Stock Get failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}

const deleteStock = async (req: Request, res: Response) => {
 
    try {
      console.log(req.params)

      const deleteStock = await stockRepositary.deleteStock(req.params.id);
  
      if (deleteStock) {
        let response: responseModel = {
          status: 200,
          message: "Stock deleted successfully",
          data: null,
          error: null,
        };
        res.status(200).json(response);
      } else {
        let response: responseModel = {
          status: 404,
          message: "Stock not found",
          data: null,
          error: null,
        };
        res.status(404).json(response);
      }
    } catch (e) {
      console.log("deleteerror",e)
      let response: responseModel = {
        status: 500,
        message: "Stock delete failed",
        data: null,
        error: e as string,
      };
      res.status(500).json(response);
    }
  };

export default {
    createStock,
    getStock,
    deleteStock
}