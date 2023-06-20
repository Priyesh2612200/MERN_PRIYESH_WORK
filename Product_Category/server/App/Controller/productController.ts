import {Request, Response} from 'express'
import { ProductModel } from '../Model/interface'
import productRepositary from '../Repositary/productRepositary'
import { responseModel } from '../Model/responseModel'


const productSave =  async (req: Request, res: Response) => {
    console.log('Request Body___: ',req.body)


    const form : ProductModel = {
        title:req.body.title,
        description:req.body.description,
        file: (req.file) ? req.file.filename : `${req.body.title}_file`,
        categoryId:req.body.categoryId
        
    }
    console.log('Form Req', form)
    try {
        const formResponse = await productRepositary.createProduct(form)
        console.log("FORM RESPONSE___",formResponse)
        let response : responseModel = {
            status: 201,
            message: "Form save successfully",
            data: formResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
        let response : responseModel = {
            status: 400,
            message: "Form save failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}


const getFillterData = async (req: Request, res: Response) => {
    const search = req.query.search as string
    const sort = req.query.sort as string
    const sortFieldName = req.query.sortFieldName as string
    const pageNumber = Number(req.query.pageNumber);

    console.log("REQ QUERY",req.query)
    console.log("SEARCH VALUE__",search)
    console.log("sort VALUE__",sort)
    console.log("sortFieldName VALUE__",sortFieldName)
    console.log("pageNumber VALUE__", pageNumber);

  try {
      const userResponse = await productRepositary.getsortdata(search,sort,sortFieldName,pageNumber)     
      let response : responseModel = {
          status: 201,
          message: "Products Get successfully",
          data: userResponse,
          error: null
      }
      res.status(201).json(response);
  } catch (e) {
      let response : responseModel = {
          status: 400,
          message: "Products Get to failed",
          data: null,
          error: e as string
      }
      res.status(400).json(response);
  }
}

// const getFillterData = async (req: Request, res: Response) => {
//   try {
//       const userResponse = await productRepositary.getsortdata()     
//       let response : responseModel = {
//           status: 201,
//           message: "Products Get successfully",
//           data: userResponse,
//           error: null
//       }
//       res.status(201).json(response);
//   } catch (e) {
//       let response : responseModel = {
//           status: 400,
//           message: "Products Get to failed",
//           data: null,
//           error: e as string
//       }
//       res.status(400).json(response);
//   }
// }


const deleteFillterData = async (req: Request, res: Response) => {
 
    try {
      console.log(req.params)

      const deletedProduct = await productRepositary.delete(req.params.id);
  
      if (deletedProduct) {
        let response: responseModel = {
          status: 200,
          message: "Products deleted successfully",
          data: null,
          error: null,
        };
        console.log("deleteresponse",response)
        res.status(200).json(response);
      } else {
        let response: responseModel = {
          status: 404,
          message: "Products not found",
          data: null,
          error: null,
        };
        res.status(404).json(response);
      }
    } catch (e) {
      console.log("deleteerror",e)
      let response: responseModel = {
        status: 500,
        message: "Product delete failed",
        data: null,
        error: e as string,
      };
      res.status(500).json(response);
    }
  };


export default {
    productSave,
    getFillterData,
    deleteFillterData
}