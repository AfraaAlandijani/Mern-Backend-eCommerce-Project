import mongoose from 'mongoose'
import { createHttpError } from './createHTTPError'
import { NextFunction } from 'express'

export const handleCastError = (error: any, next: NextFunction) => {
  if (error instanceof mongoose.Error.CastError) {
    const castError = createHttpError(400, 'ID format is not valid')
    next(castError)
  } else {
    next(error)
  }
}
