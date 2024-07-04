import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less than 1"],
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  },
  {
    timestamps: true,
  }
);

ProductsSchema.pre("save", function (next) {
  const product = this;

  if (!product.slug) {
    product.slug = product.name.toLowerCase().split(" ").join("-");
  }

  next();
});

const ProductsModel = mongoose.model("Products", ProductsSchema);

export default ProductsModel;
