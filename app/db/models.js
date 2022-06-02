import { mongoose } from "mongoose";

const { Schema } = mongoose;

const loginSchema = new Schema({
  username: String,
  email: String,
  password: String,
});
const compSchema = new Schema(
  {
    name: String,
    mainPicks: Array,
    altPicks: Array,
    bans: Array,
    Objective: String,
    Strengths: String,
    Weaknesses: String,
    upvotes: Number,
    patch: String,
    loginId: { type: Schema.Types.ObjectId, ref: "Login" },
  },
  {
    timestamps: true,
  }
);

export const models = [
  {
    name: "Login",
    schema: loginSchema,
    collection: "login",
  },
  {
    name: "Comp",
    schema: compSchema,
    collection: "comp",
  },
];
