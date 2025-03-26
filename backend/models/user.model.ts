import bcrypt from "bcryptjs";
import { model, Model, Schema } from "mongoose";
import { addressDocument, userDocument } from "../interfaces/user.interface";

const addressSchema = new Schema<addressDocument>({
  recipientName: { type: String },
  recipientLastName: { type: String },
  recipientPhoneNumber: { type: String },
  streetAddress: { type: String },
  apartment: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
});

const userSchema = new Schema<userDocument>(
  {
    firstName: { type: String, required: [true, "Please enter name"] },
    lastName: { type: String, required: [true, "Please enter last name"] },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter cellphone number"],
      trim: true,
    },
    password: { type: String, required: [true, "Enter Password"] },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    shipToAddress: [addressSchema],
    isActive: { type: Boolean, default: true },
    jwt_secret: { type: String, required: true },
    refreshToken: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ isActive: -1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    //bcrypt.genSalt(10): Generates a salt (a random string) with 10 rounds of complexity.
    //await: Since genSalt() returns a Promise, await ensures the function waits for it to complete.
    //✅ Why? Salt ensures that even if two users have the same password, their hashes will be different.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
  } catch (error: any) {
    next(error as Error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.omitField = function (fields: string[] | string) {
  const user = this.toObject();
  const fieldsToOmit = Array.isArray(fields) ? fields : [fields];

  fieldsToOmit.forEach((field) => {
    delete user[field];
  });

  return user;
};

const User: Model<userDocument> = model<userDocument>("User", userSchema);

export default User;
