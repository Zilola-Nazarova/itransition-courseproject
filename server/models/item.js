import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AutoIncrement = require('mongoose-sequence')(mongoose);

const itemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title field can not be empty']
    },
    text: {
      type: String,
      required: [true, 'Text field can not be empty']
    },
    coll: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Collection field can not be empty'],
      ref: 'Collection'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Author field can not be empty'],
      ref: 'User'
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like'
    }]
  },
  {
    timestamps: true
  }
);

itemSchema.plugin(AutoIncrement, {
  id: 'item_seq',
  inc_field: 'seq_no',
  start_seq: 0
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
