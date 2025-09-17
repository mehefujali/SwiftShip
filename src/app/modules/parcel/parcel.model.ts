import { model, Schema } from "mongoose";
import { IParcel, IStatusLog } from "./parcel.interface";

const statusLogSchema = new Schema<IStatusLog>(
  {
    status: {
      type: String,
      enum: ["REQUESTED", "DISPATCHED", "IN_TRANSIT", "DELIVERED", "CANCELLED"],
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { _id: false }
);

const parcelSchema = new Schema<IParcel>(
  {
    trackingId: { type: String, unique: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverName: { type: String, required: true },
    receiverPhone: { type: String, required: true },
    receiverAddress: { type: String, required: true },
    weight: { type: Number, required: true },
    type: { type: String, required: true },
    fee: { type: Number, required: true },
    statusHistory: [statusLogSchema],
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

parcelSchema.pre("save", function (next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const randomChars = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    this.trackingId = `TRK-${year}${month}${day}-${randomChars}`;
  }
  next();
});

export const Parcel = model<IParcel>("Parcel", parcelSchema);
