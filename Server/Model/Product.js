const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    imgURL: {
      type: String,
      required: [true, "enter image url"],
    },
    title: {
      type: String,
      required: [true, "enter product title"],
    },
    desc: {
      type: String,
      required: [true, "enter product description"],
    },
    price: {
      type: Number,
      required: [true, "enter product price"],
    },
    categories: {
      type: Array,
      required: [true, "enter product categories"],
    },
    size: {
      type: Array,
      required: [true, "enter product size"],
    },
    color: {
      type: Array,
      required: [true, "enter product color"],
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
