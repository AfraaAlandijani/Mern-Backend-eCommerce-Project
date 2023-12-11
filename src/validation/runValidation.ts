import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const runValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let errorList = errors.array().map((error) => error.msg);
    return res.status(400).send({ message: errorList[0] });
  }
  next();
};
