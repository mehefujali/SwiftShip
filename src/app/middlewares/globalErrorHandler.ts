/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../errorhelpers/AppError";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req,
  res,
  next
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};
