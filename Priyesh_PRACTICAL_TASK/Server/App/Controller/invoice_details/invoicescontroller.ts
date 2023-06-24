import { Request, Response } from "express";
import postInvoicerepositary from "../../Repositary/invoicerepositary/postInvoicerepositary";

import { invoiceModel } from "../../Models/interface";
import { responseModel } from "../../Models/responseModel";
import nodemailer from "nodemailer";
import axios from "axios";
import { stringify } from "querystring";

const postinvoices = async (req: Request, res: Response) => {
  try {
    const postDataArray = req.body.data;

    const invoiceData = [];
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
        status: Boolean(postData.status),
      };
      console.log("TEMP_____", temp);
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
    console.log("month", month);
    const InvoiceResponse = await postInvoicerepositary.getInvoiceAllData(
      month ? String(month) : ""
    );
    console.log("InvoiceResponse--", InvoiceResponse);
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

    console.log("UpdatepostDataArray______", UpdatepostDataArray);

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
  console.log("Selected Rows Data:", data);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "priyeshpoptani1611@gmail.com",
      pass: "bejwvowrcimqfzpv",
    },
  });

  var mailOptions = {
    from: "priyeshpoptani1611@gmail.com",
    to: "p3poptani@gmail.com",
    subject: "Invoice Details",
    text: JSON.stringify(data),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

const detaPdfData = async (req: Request, res: Response) => {
  const selectedData = req.body.data;
  const Month = req.body.month;

  for (let i = 0; i < selectedData.length; i++) {
    const data = selectedData[i];
    let html = `<table style="border-collapse: collapse; width: 100%;">`;

    html += `<h1>Name:${data.name}</h1>`;
    html += `<h1>Month:${Month}</h1>`;

    html += `<tr>`;
    html += `<th>Invoice Description</th>`;
    html += `<th>Col1</th>`;
    html += `<th>Col2</th>`;
    html += `<th>Col3</th>`;
    html += `<th>Col4</th>`;
    html += `<th>Col5</th>`;
    html += `<th>Col6</th>`;
    html += `<th>Col7</th>`;
    html += `<th>Col8</th>`;
    html += `<th>Col9</th>`;
    html += `<th>Col10</th>`;
    html += `<th >Col11</th>`;
    html += `<th >Col12</th>`;
    html += `<th>Net</th>`;
    html += `<th >VAT</th>`;
    html += `<th>Advance</th>`;
    html += `<th>Balance</th>`;
    html += `</tr>`;

    html += `<tr>`;
    html += `<th>Amount(GBP)</th>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col1}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col2}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col3}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col4}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col5}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col6}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col7}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col8}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col9}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col10}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col11}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Col12}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Net}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.VAT}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Advance}</td>`;
    html += `<td style="padding: 8px; border: 1px solid #ddd;">${data.Balance}</td>`;
    html += `</tr>`;

    html += `</table>`;

    console.log("HTML",html);
    console.log("HTML",typeof(html));
    const encodedHtmlTable = Buffer.from(html).toString("base64");
    //let encodedHtmlTable = html.map((item: any) => btoa(item))



    const fileName = `InvoiceDetails_${data.name}.pdf`;

    const pdfData = {
      FileName: fileName,
      HtmlData: [encodedHtmlTable],
    };

    try {
      const response = await axios.post(
        "https://pdf.satvasolutions.com/api/ConvertHtmlToPdf",
        pdfData
      );
  
      // Send the response back to the frontend
      res.send(response.data);
    } catch (error: any) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};


export default {
  postinvoices,
  getinvoices,
  updateinvoices,
  sendEmail,
  detaPdfData,
};
