import { Request, Response } from "express";
import postInvoicerepositary from "../../Repositary/invoicerepositary/postInvoicerepositary";

import { invoiceModel } from "../../Models/interface";
import { responseModel } from "../../Models/responseModel";



const postinvoices = async (req: Request, res: Response) => {
  try {
    const postDataArray = req.body.data;

    console.log("POST DATA___", postDataArray.length);
    const invoiceData = []
    for (let i = 0; i < postDataArray.length; i++) {
      const postData = postDataArray[i];

      console.log("POST DATA_______",postData)
      const temp = {
        Col1: parseFloat(postData.Col1),
        Col2: parseFloat(postData.Col2),
        Col3: parseFloat(postData.Col3),
        Col4: parseFloat(postData.Col4),
        Col5: parseFloat(postData.Col5),
        Col6: parseFloat(postData.Col6),
        Col7: parseFloat(postData.Col7),
        Col8: parseFloat(postData.Col8),
        Col9: parseFloat(postData.Col9),
        Col10: parseFloat(postData.Col10),
        Col11: parseFloat(postData.Col11),
        Col12: parseFloat(postData.Col12),
        Net: parseFloat(postData.Net),
        VAT: parseFloat(postData.VAT),
        Advance: parseFloat(postData.Advance),
        Balance: parseFloat(postData.Balance),
        supplierId: String(postData.supplierId),
        month: String(postData.month),
      };
      // invoiceData.push(temp)
      await postInvoicerepositary.createInvoice(temp);
    }
    
    let response: responseModel = {
      status: 201,
      message: "Invoices saved successfully",
      data: null,
      error: null,
    };

    res.status(201).json(response);

    
  } catch (e) {
    console.error("Invoice save failed:", e);

    let response: responseModel = {
      status: 400,
      message: "Invoice save failed",
      data: null,
      error: e instanceof Error ? e.message : "Unknown error",
    };

    res.status(400).json(response);
  }
};
  




const getinvoices = async (req: Request, res: Response) => {
  try {
    const { month } = req.query;
    console.log("month",month)
    const InvoiceResponse = await postInvoicerepositary.getInvoiceAllData(month ? String(month) : "");
    console.log("InvoiceResponse--",InvoiceResponse)
    let response: responseModel = {
      status: 201,
      message: "Invoice Details Get save successfully",
      data: InvoiceResponse,
      error: null,
    };
    res.status(201).json(response);
  } catch (e) {
    let response: responseModel = {
      status: 400,
      message: "Get Invoive Details failed",
      data: null,
      error: e as string,
    };
    res.status(400).json(response);
  }
};


const updateinvoices = async (req: Request, res: Response) => {
 
 
  try {
    const UpdatepostDataArray = req.body.data; 

    console.log("UpdatepostDataArray______",UpdatepostDataArray)
    

    for (let i = 0; i < UpdatepostDataArray.length; i++) {

      const updateData = UpdatepostDataArray[i];
     
      
      const invoiceData = {
        Col1: parseFloat(updateData.Col1),
        Col2: parseFloat(updateData.Col2),
        Col3: parseFloat(updateData.Col3),
        Col4: parseFloat(updateData.Col4),
        Col5: parseFloat(updateData.Col5),
        Col6: parseFloat(updateData.Col6),
        Col7: parseFloat(updateData.Col7),
        Col8: parseFloat(updateData.Col8),
        Col9: parseFloat(updateData.Col9),
        Col10: parseFloat(updateData.Col10),
        Col11: parseFloat(updateData.Col11),
        Col12: parseFloat(updateData.Col12),
        Net: parseFloat(updateData.Net),
        VAT: parseFloat(updateData.VAT),
        Advance: parseFloat(updateData.Advance),
        Balance: parseFloat(updateData.Balance),
        supplierId: String(updateData.id),
        month: String(updateData.month),
      };
    
      const invoiceResponse = await postInvoicerepositary.update(invoiceData);
     
      // console.log(`Invoice ${i + 1} saved successfully`);
    }

    let response: responseModel = {
      status: 201,
      message: "Invoices Update successfully",
      data: null,
      error: null,
    };
    res.status(201).json(response);


  } catch (e) {
    let response: responseModel = {
      status: 500,
      message: "Invoice update failed",
      data: null,
      error: e as string,
    };
    res.status(500).json(response);
  }
};

export default {
  postinvoices,
  getinvoices,
  updateinvoices
};
