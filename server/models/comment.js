import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
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
    },
    text: {
      type: String,
      required: [true, 'Text field can not be empty']
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
