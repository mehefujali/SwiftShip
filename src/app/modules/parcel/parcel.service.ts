import { StatusCodes } from "http-status-codes";
import AppError from "../../errorhelpers/AppError";
import { User } from "../user/user.model";
import { IParcel, TParcelStatus } from "./parcel.interface";
import { Parcel } from "./parcel.model";

const createParcel = async (senderId: string, payload: Partial<IParcel>) => {
  const newParcelData = {
    ...payload,
    sender: senderId,
    statusHistory: [
      { status: "REQUESTED" as TParcelStatus, timestamp: new Date() },
    ],
  };
  const result = await Parcel.create(newParcelData);
  return result;
};

const getMyParcels = async (userId: string, role: string) => {
  if (role === "SENDER") {
    return await Parcel.find({ sender: userId });
  }
  if (role === "RECEIVER") {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "Receiver not found");
    }
    return await Parcel.find({ receiverPhone: user.phone });
  }
  return [];
};

const getAllParcels = async () => {
  return await Parcel.find().populate("sender", "name email phone");
};

const cancelParcel = async (parcelId: string, senderId: string) => {
  const parcel = await Parcel.findById(parcelId);

  if (!parcel) {
    throw new AppError(StatusCodes.NOT_FOUND, "Parcel not found");
  }

  if (parcel.sender.toString() !== senderId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to cancel this parcel"
    );
  }

  const currentStatus =
    parcel.statusHistory[parcel.statusHistory.length - 1].status;
  if (
    currentStatus === "DISPATCHED" ||
    currentStatus === "IN_TRANSIT" ||
    currentStatus === "DELIVERED"
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Cannot cancel a parcel that is already ${currentStatus.toLowerCase()}`
    );
  }

  parcel.statusHistory.push({ status: "CANCELLED", timestamp: new Date() });
  await parcel.save();
  return parcel;
};

const updateParcelStatus = async (
  parcelId: string,
  newStatus: TParcelStatus,
  adminId: string
) => {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    throw new AppError(StatusCodes.NOT_FOUND, "Parcel not found");
  }

  parcel.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    updatedBy: adminId as any,
  });
  await parcel.save();
  return parcel;
};

const confirmDelivery = async (parcelId: string, receiverId: string) => {
  const parcel = await Parcel.findById(parcelId);
  const receiver = await User.findById(receiverId);

  if (!parcel || !receiver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Parcel or receiver not found");
  }

  if (parcel.receiverPhone !== receiver.phone) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "You are not the intended receiver of this parcel"
    );
  }

  parcel.statusHistory.push({ status: "DELIVERED", timestamp: new Date() });
  await parcel.save();
  return parcel;
};

export const ParcelServices = {
  createParcel,
  getMyParcels,
  getAllParcels,
  cancelParcel,
  updateParcelStatus,
  confirmDelivery,
};
