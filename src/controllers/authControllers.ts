import { Request, Response, NextFunction } from 'express'

import { handleLoginService } from '../services/athServices'

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const { accessToken } = await handleLoginService(email, password)
    res.cookie('access_token', accessToken, {
      maxAge: 15 * 60 * 1000, // 15 mintues
      httpOnly: true, // prevent from store in browser
      sameSite: 'none', // can be different port
    })
    res.status(200).send({
      message: 'user is logged in',
    })
  } catch (error) {
    next(error)
  }
}

export const handleLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token')
    res.status(200).send({
      message: 'user is logged out',
    })
  } catch (error) {
    next(error)
  }
}
