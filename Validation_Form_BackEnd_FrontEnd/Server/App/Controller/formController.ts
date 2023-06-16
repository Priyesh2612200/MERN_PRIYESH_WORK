import {Request, Response} from 'express'
import { FormModel } from '../Model/interface'
import formRepositary from '../Repositary/formRepositary'
import { responseModel } from '../Model/responseModel'
import bcrypt from 'bcrypt';


const saveForm =  async (req: Request, res: Response) => {
    console.log('Request Body___: ',req.body)


    const form : FormModel = {
        email :  req.body.email,
        text : req.body.text,
        password: await bcrypt.hash(req.body.password, 10),
        radio : req.body.radio,
        checkbox : Boolean (req.body.checkbox),
        color : req.body.color,
        date : req.body.date,
        number : parseInt( req.body.number),
        range : parseInt(req.body.range),
        time : req.body.time,
        file: (req.file) ? req.file.filename : `${req.body.email}_file`
        
    }
    console.log('Form Req', form)
    try {
        const formResponse = await formRepositary.createForm(form)
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
    saveForm
}