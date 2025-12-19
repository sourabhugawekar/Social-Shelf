import mongoose, { models, model, Schema } from "mongoose";

export interface IOTP {
  _id?: mongoose.Types.ObjectId;
  email: string;
  otp: string;
  expiredIn?: Date;
  isUsed: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userContact = new Schema<IOTP>(
  {
    email: {
      type: String,
      required: [true, "Name cannot be Null for DB"],
    },
    otp: {
      type: String,
      required: [true, "Email is null for DB"],
    },
    expiredIn: {
      type: Date,
    },
    isUsed: {
      type: Boolean,
      default:false
    },
  },
  { timestamps: true }
);

const Otp = models?.otps || model<IOTP>("otps", userContact);

export default Otp;
