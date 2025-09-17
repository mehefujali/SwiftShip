import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import config from "../../config";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.SENDER,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(
      this.password as string,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

export const User = model<IUser>("User", userSchema);
