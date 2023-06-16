import { PrismaClient } from "@prisma/client";
import { FormModel } from "../Model/interface";

const prisma = new PrismaClient();

class FormRepository {
  async createForm(formCheck:FormModel) {
    try {
      console.log("EMAIL", formCheck.email);
      const responseForm = await prisma.formData.create({
        data: {
          email: formCheck.email,
          text: formCheck.text,
          password: formCheck.password,
          radio: formCheck.radio,
          checkbox: Boolean( formCheck.checkbox),
          color: formCheck.color,
          date: formCheck.date,
          number: parseInt(formCheck.number),
          range: parseInt(formCheck.range),
          time: formCheck.time,
           file: String(formCheck.file),
        },
      });
      console.log("responseForm", responseForm);
      return responseForm;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


export default new FormRepository();
