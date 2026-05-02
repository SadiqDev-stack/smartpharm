import { Request, Response, NextFunction } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  
  return res.status(statusCode).json({
    success: false,
    message: message,
    data: {
      isValid: false
    }
  });
}