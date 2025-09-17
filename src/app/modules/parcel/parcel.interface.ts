import { Types } from "mongoose";

export type TParcelStatus =
  | "REQUESTED"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED";

export interface IStatusLog {
  status: TParcelStatus;
  timestamp: Date;
  updatedBy?: Types.ObjectId;
}

export interface IParcel {
  trackingId: string;
  sender: Types.ObjectId;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  weight: number;
  type: string;
  fee: number;
  statusHistory: IStatusLog[];
  isBlocked: boolean;
}
