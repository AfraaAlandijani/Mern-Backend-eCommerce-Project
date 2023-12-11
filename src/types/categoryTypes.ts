import { Document } from 'mongoose'

export interface CategoryType extends Document {
  _id: string
  name: string
  slug?: string
  createdAt: string
  updatedAt: string
}

export type CategoryInput = Omit<CategoryType, '_id'>
