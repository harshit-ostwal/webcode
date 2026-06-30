import mongoose from "mongoose";
import { zString } from "../utils/zod.utils.js";

const objectIdSchema = zString().refine(
  (value) => mongoose.Types.ObjectId.isValid(value),
  {
    error: "Invalid ObjectId, Please try again later.",
  },
);

export { objectIdSchema };
