import { Router } from 'express'

import { handleLogin, handleLogout } from '../controllers/authControllers'
import { isLoggedIn, isLoggedOut } from '../middlewares/auth'
import { userLoginValidator } from '../validation/userValidation'
import { runValidation } from '../validation/runValidation'

const authRoutes = Router()

authRoutes.post('/login', isLoggedOut, handleLogin, userLoginValidator, runValidation)
authRoutes.post('/logout', isLoggedIn, handleLogout)

export default authRoutes
