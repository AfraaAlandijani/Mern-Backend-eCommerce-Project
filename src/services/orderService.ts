import { Order } from '../models/orderSchema'
import { OrdersInput } from '../types/orderTypes'
import { createHttpError } from '../util/createHTTPError'

export const findAllOrders = async (page = 1, limit = 3, userId: string) => {
  const count = await Order.countDocuments()
  const totalPage = Math.ceil(count / limit)

  if (page > totalPage) {
    page = totalPage
  }

  const skip = (page - 1) * limit
  const orders = await Order.find({ user: userId })
    .populate('products.product', 'title price')
    .populate('user', 'name email')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
  if (orders.length == 0) {
    throw createHttpError(404, 'There are no orders for this user yet')
  }
  return { orders, totalPage, currentPage: page }
}

export const findAllOrdersForAdmin = async (page = 1, limit = 3) => {
  const count = await Order.countDocuments()
  const totalPage = Math.ceil(count / limit)

  if (page > totalPage) {
    page = totalPage
  }

  const skip = (page - 1) * limit
  const orders = await Order.find()
    .populate('products.product', 'title price')
    .populate('user', 'name email')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
  if (orders.length == 0) {
    throw createHttpError(404, 'There are no orders yet')
  }
  return { orders, totalPage, currentPage: page }
}

export const placeOrder = async (cartItems: OrdersInput, payment: OrdersInput, userId: string) => {
  const newOrder = new Order({
    products: cartItems.products,
    payment: cartItems.payment,
    user: userId,
  })
  await newOrder.save()
  return newOrder
}

export const deleteOrderById = async (id: string) => {
  const order = await Order.findByIdAndDelete(id)
  if (!order) {
    const error = createHttpError(404, 'Order not found')
    throw error
  }
  return order
}
