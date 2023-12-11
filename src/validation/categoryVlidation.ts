import { check } from "express-validator";

export const createCategoryValidation = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Category Name should be at least 3-200 characters long'),
]

