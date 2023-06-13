import { Request, Response } from "express";
import postInvoicerepositary from "../../Repositary/invoicerepositary/postInvoicerepositary";

import { invoiceModel } from "../../Models/interface";
import { responseModel } from "../../Models/responseModel";
import nodemailer from 'nodemailer';



const postinvoices = async (req: Request, res: Response) => {
  try {
    const postDataArray = req.body.data;

    const invoiceData = []
    for (let i = 0; i < postDataArray.length; i++) {
      const postData = postDataArray[i];

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
        status :Boolean(postData.status)
      };
      console.log("TEMP_____",temp)
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
    const {month} =  req.query;
    console.log("month",month)
    const InvoiceResponse = await postInvoicerepositary.getInvoiceAllData(month? String(month) : "");
    console.log("InvoiceResponse--",InvoiceResponse)
    let response: responseModel = {
      status: 201,
      message: "Invoice Details Get successfully",
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



const sendEmail = async (req: Request, res: Response) => {
  const { data } = req.body;
  console.log('Selected Rows Data:', data);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'priyeshpoptani1611@gmail.com',
      pass: 'bejwvowrcimqfzpv'
    }
  });
  
  var mailOptions = {
    from: 'priyeshpoptani1611@gmail.com',
    to: 'p3poptani@gmail.com',
    subject: 'Invoice Details',
    text: JSON.stringify(data),
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }

};


export default {
  postinvoices,
  getinvoices,
  updateinvoices,
  sendEmail
};
