import {Request, Response} from 'express'
import { ProductModel } from '../Model/interface'
import productRepositary from '../Repositary/productRepositary'
import { responseModel } from '../Model/responseModel'


const productSave =  async (req: Request, res: Response) => {
    console.log('Request Body___: ',req.body)


    const form : ProductModel = {
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
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

export default {
    productSave
}