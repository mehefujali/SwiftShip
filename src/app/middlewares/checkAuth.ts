import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload, verify } from "jsonwebtoken";
import AppError from "../errorhelpers/AppError";
import config from "../config";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";

export const checkAuth =
  (...requiredRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }

      const token = authHeader.split(" ")[1];

      const decoded = verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const { role, email } = decoded;

      const user = await User.findOne({ email });

      if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
      }

      if (!user.isActive) {
        throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked!");
      }

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          "You have no access to this route"
        );
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (err) {
      next(err);
    }
  };
