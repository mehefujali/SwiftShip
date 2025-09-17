import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "../user/user.model";
import config from "../../config";
import { IUser } from "../user/user.interface";
import AppError from "../../errorhelpers/AppError";

const loginUser = async (payload: Partial<IUser>) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
  }

  if (!user.isActive) {
    throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked!");
  }

  const isPasswordMatched = await bcryptjs.compare(
    payload.password as string,
    user.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, "Password do not match");
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_exp,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_exp,
    }
  );

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
};

const getNewAccessToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  if (!user.isActive) {
    throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked!");
  }

  const jwtPayload: JwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_exp,
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  getNewAccessToken,
};
