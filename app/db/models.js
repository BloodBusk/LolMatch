import { mongoose } from "mongoose";

const { Schema } = mongoose;

const snippetSchema = new Schema({
  name: String,
  language: Array

});

export const models = [
  {
    name: "Champion",
    schema: snippetSchema,
    collection: "champions",
  },
];