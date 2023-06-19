import {Request, Response} from 'express'
import { allCategoryModel } from '../Model/interface'
import { responseModel } from '../Model/responseModel'
import getAllCAtegoryRepositary from '../Repositary/getAllCAtegoryRepositary'


const getAllCategory = async (req: Request, res: Response) => {
    
    try {
        const categoryResponse = await getAllCAtegoryRepositary.getCatagory()
       
        let response : responseModel = {
            status: 201,
            message: "Category Get successfully",
            data: categoryResponse,
            error: null
        }
        res.status(201).json(response);
    } catch (e) {
        let response : responseModel = {
            status: 400,
            message: "Category Get to failed",
            data: null,
            error: e as string
        }
        res.status(400).json(response);
    }
}
export default {
    getAllCategory,
}