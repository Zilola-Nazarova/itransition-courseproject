import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;
