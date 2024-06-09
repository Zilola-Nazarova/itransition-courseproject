import mongoose from 'mongoose';

const itemTagSchema = mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Item'
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Tag'
    }
  },
  {
    timestamps: true
  }
);

itemTagSchema.index({ item: 1, tag: 1 }, { unique: true });

const ItemTag = mongoose.model('ItemTag', itemTagSchema);

export default ItemTag;
