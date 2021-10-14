import {Product} from "../models/product";

export interface CartModelServer {
  total: Number;
  data: [{
    product: Product,
    numInCart: Number
  }];
}

export interface CartModelPublic {
  total: Number;
  prodData: [{
    id: Number,
    incart: Number
  }]
}