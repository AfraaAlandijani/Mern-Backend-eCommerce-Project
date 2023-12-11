import { Document } from 'mongoose'

import { OrdersType } from './orderTypes'

export interface IUsers extends Document {
    _id: string
    name: string
    email: string
    password: string
    image: string
    address: string
    phone: string
    isAdmin: boolean
    isBanned: boolean
    orders: OrdersType['_id'][]
    createdAt?: string
    updatedAt?: string
  }

export type UserType = {
    name: string
    email: string
    password: string
    address: string
    phone: string
    image?: string
    isAdmin?: boolean
    isBanned?: boolean
  }

  export type EmailDataType = {
    email: string
    subjeect: string
    html: string
  }

  export type UsersInput = Omit<IUsers, '_id'>
