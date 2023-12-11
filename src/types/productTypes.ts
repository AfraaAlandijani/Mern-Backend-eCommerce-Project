import { Document } from 'mongoose'

import { CategoryType } from './categoryTypes'

export interface ProductsType extends Document {
  _id: string
  title: string
  slug?: string
  price: number
  image: string
  category: CategoryType['_id']
  description: String
  quantity: number
  sold: number
  shipping?: number
  createdAt: string
  updatedAt: string
}

export type ProductsInput = Omit<ProductsType, '_id'>
