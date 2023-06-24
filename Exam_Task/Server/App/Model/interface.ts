export interface StockModel {
    id?: any;
    name?: any;
    qty?: any;
    orders?: OrderModel[];
  }
  
  export interface OrderModel {
    id?: string;
    customerName?: string;
    orderQty?: number;
    stockId?: string;
    stock?: StockModel;
  }
  