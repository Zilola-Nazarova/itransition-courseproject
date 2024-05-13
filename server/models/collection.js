import mongoose from 'mongoose';

const collectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    category: [{
      type: String,
      enum: ['cat1', 'cat2', 'cat3', 'other'],
      required: true
    }],
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
