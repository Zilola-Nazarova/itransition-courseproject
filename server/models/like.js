import mongoose from 'mongoose';

const likeSchema = mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Item field can not be empty'],
      ref: 'Item'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Author field can not be empty'],
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Like = mongoose.model('Like', likeSchema);

export default Like;
