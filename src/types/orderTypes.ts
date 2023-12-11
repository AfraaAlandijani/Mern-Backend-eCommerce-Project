import { Document } from 'mongoose'
import { ProductsType } from './productTypes'
import { IUsers } from './userTypes'

export interface OrderProducts {
  product: ProductsType['_id']
  quantity: number
}

export interface OrderPayment {
  method:'Credit Card' | 'Apple Pay' | 'PayPal'
  amount:number
}

export interface OrdersType extends Document {
  _id: string
  products: OrderProducts[]
  payment: OrderProducts
  user: IUsers['_id']
  status: 'Not Proccess' | 'Proccessing' | 'Shipped' | 'Delivered' | 'Cancelled'
}

export type OrdersInput = Omit<OrdersType, '_id'>

