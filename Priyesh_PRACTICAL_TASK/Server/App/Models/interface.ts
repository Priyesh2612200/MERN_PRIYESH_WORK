export interface userModel{
    id? :string,
    name?:any,
    email?:any,
    password?:any
    phone?:any
}

export interface supplerModel{
    id? :string,
    name?:any,
    email?:any,
}

export interface invoiceModel{
    id? :string,
    Col1?:number,
    Col2?:number,
    Col3?:number,
    Col4?:number,
    Col5?:number,
    Col6?:number,
    Col7?:number,
    Col8?:number,
    Col9?:number,
    Col10?:number,
    Col11?:number,
    Col12?:number,
    Net?:number,
    VAT?:number,
    Advance?:number,
    Balance?:number,
    supplierId?:string
    month?:string
}