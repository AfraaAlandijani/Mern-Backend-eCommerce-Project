import { Router } from 'express'

import {
  deleteSingleOrderById,
  getAllOrdersForUser,
  getAllOrdersForAdmin,
  handleProcessPayment,
} from '../controllers/orderControllers'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

const orderRoutes = Router()

orderRoutes.post('/process-payment', isLoggedIn, handleProcessPayment)
orderRoutes.get('/:id([0-9a-fA-F]{24})', isLoggedIn, getAllOrdersForUser)
orderRoutes.get('/all-orders', isLoggedIn, isAdmin, getAllOrdersForAdmin)
orderRoutes.delete('/:id', deleteSingleOrderById)

export default orderRoutes
