import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ParcelServices } from "./parcel.service";

const createParcel = catchAsync(async (req, res) => {
  const senderId = req.user.userId;
  const result = await ParcelServices.createParcel(senderId, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Parcel created successfully",
    data: result,
  });
});

const getMyParcels = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await ParcelServices.getMyParcels(userId, role);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Parcels retrieved successfully",
    data: result,
  });
});

const getAllParcels = catchAsync(async (req, res) => {
  const result = await ParcelServices.getAllParcels();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All parcels retrieved successfully",
    data: result,
  });
});

const cancelParcel = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await ParcelServices.cancelParcel(id, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Parcel cancelled successfully",
    data: result,
  });
});

const updateParcelStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const adminId = req.user.userId;
  const result = await ParcelServices.updateParcelStatus(id, status, adminId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Parcel status updated successfully",
    data: result,
  });
});

const confirmDelivery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await ParcelServices.confirmDelivery(id, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Parcel delivery confirmed",
    data: result,
  });
});

export const ParcelControllers = {
  createParcel,
  getMyParcels,
  getAllParcels,
  cancelParcel,
  updateParcelStatus,
  confirmDelivery,
};
