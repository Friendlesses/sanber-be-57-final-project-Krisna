import mongoose from "mongoose";
import User from "@/models/user.model";
import email from "@/utils/email";

const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Products',
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const OrderSchema = new Schema(
  {
    grandTotal: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [OrderItemSchema],
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.post("save", async function (doc, next) {
    const order = doc;
    const user = await User.findById(order.createdBy);
    if(!user){
        return next(new Error("User not found"));
    }

    console.log("Send email to", user.email)
    
    const content = await email.render('invoice.ejs', {
      customerName: user.fullName,
      orderItems: order.orderItems,
      grandTotal: order.grandTotal,
      contactEmail: "krisnasanbercode@zohomail.com",
      companyName: "PT Selamet",
      year: 2024,
    })
    
    await email.send({
      to: user.email,
      subject: "Invoice",
      content,
    });
  
    next();
  });

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;