import { StatusCodes } from "http-status-codes";
import AppError from "../../errorhelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const result = await User.create(payload);
  const userResponse = await User.findById(result._id);

  return userResponse;
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const blockUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const newStatus = !user.isActive;

  const result = await User.findByIdAndUpdate(
    id,
    { isActive: newStatus },
    { new: true }
  );
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  blockUser,
};
