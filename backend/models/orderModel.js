import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userModel",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "productModel",
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date
  },
  itemPrice: {
    type: Number,
    required: true,
    default:0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default:0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default:0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default:0.0
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'processing'
  },
  deliveredAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const orderModel = mongoose.model("orderModel", orderSchema);
export default orderModel;
