import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

import { createHttpError } from '../util/createHTTPError'

import { deleteImage } from '../helper/deleteImageHelper'
import {
  processRegisterUserService,
  findAllUsers,
  findUserById,
  updateBanStatusById,
  updateUser,
  deleteUser,
  forgetPasswordAction,
  resstPasswordAction,
  activeUser,
} from '../services/userService'
import { UsersInput } from '../types/userTypes'
import { handleCastError } from '../util/handelMongoID'

export const processRegisterUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, address, phone, isAdmin } = req.body
    const imagePath = req.file?.path

    const token = await processRegisterUserService(
      name,
      email,
      password,
      address,
      phone,
      imagePath,
      isAdmin
    )

    res.status(200).json({
      message: 'Check your email to activate your account',
      token,
    })
  } catch (error) {
    next(error)
  }
}

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token
    const user = await activeUser(token)

    res.status(200).json({
      message: 'User registration successfully',
    })
  } catch (error) {
    if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
      const errorMessage = error instanceof TokenExpiredError ? 'expired token' : 'Invalid token'
      next(createHttpError(401, errorMessage))
    } else {
      next(error)
    }
  }
}

export const banUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateBanStatusById(req.params.id, true)

    res.status(200).send({
      message: 'banned the user',
    })
  } catch (error) {
    handleCastError(error, next)
  }
}

export const unbanUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateBanStatusById(req.params.id, false)

    res.status(200).send({
      message: 'unbanned the user',
    })
  } catch (error) {
    handleCastError(error, next)
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const search = req.query.search as string

    const { users, totalPage, currentPage } = await findAllUsers(page, limit, search)
    res.status(200).send({
      message: 'return all users',
      payload: { users, totalPage, currentPage },
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById(req.params.id)

    res.status(200).send({
      message: 'return single user',
      payload: user,
    })
  } catch (error) {
    handleCastError(error, next)
  }
}

export const updateSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateUserData: UsersInput = req.body
    const file = req.file
    const imge = file?.path

    const updatedProduct = await updateUser(req.params.id, updateUserData, imge)
    res.status(200).send({
      message: 'The user has been updated successfully',
      payload: updatedProduct,
    })
  } catch (error) {
    handleCastError(error, next)
  }
}

export const deleteSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await deleteUser(req.params.id)

    if (user && user.image) {
      await deleteImage(user.image)
    }
    res.status(200).send({
      message: ' user is deleted ',
    })
  } catch (error) {
    handleCastError(error, next)
  }
}
export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const token = await forgetPasswordAction(email)
    res.status(200).json({
      message: 'Check your email to rest your pawword',
      token,
    })
  } catch (error) {
    next(error)
  }
}
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token
    const password = req.body.password

    const user = await resstPasswordAction(token, password)

    res.status(200).json({
      message: 'The password has been reset successfully',
    })
  } catch (error) {
    next(error)
  }
}
