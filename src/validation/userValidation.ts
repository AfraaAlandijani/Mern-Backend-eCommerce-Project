import { check } from 'express-validator'

export const userRegistrationValidator = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is missing')
    .isLength({ min: 5, max: 31 })
    .withMessage('name must have at least 5 characters')
    .isLength({ max: 31 })
    .withMessage('name can have maximum 31characters'),
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is missing')
    .isEmail()
    .withMessage('Not a valid email'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is missing')
    .isLength({ min: 6 })
    .withMessage('password must have at least 6 characters'),
  check('image').optional().isString().withMessage('User image must be a string'),
  check('address')
    .trim()
    .notEmpty()
    .withMessage('address is missing')
    .isLength({ min: 3 })
    .withMessage('address must have at least 3 characters'),
  check('phone')
    .trim()
    .notEmpty()
    .withMessage('phone is missing')
    .isLength({ min: 10 })
    .withMessage('phone must have 10 numbers'),
]

export const userLoginValidator = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is missing')
    .isEmail()
    .withMessage('Not a valid email'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is missing')
    .isLength({ min: 5 })
    .withMessage('password must have at least 5 characters'),
]
