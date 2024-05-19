import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AutoIncrement = require('mongoose-sequence')(mongoose);

const collectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title field can not be empty']
    },
    text: {
      type: String,
      required: [true, 'Text field can not be empty']
    },
    category: {
      type: String,
      enum: {
        values: ['cat1', 'cat2', 'cat3', 'other'],
        message: 'Provide one of allowed categories'
      },
      required: [true, 'Category field can not be empty']
    },
    image: {
      type: String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Author field can not be empty'],
      ref: 'User'
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }]
  },
  {
    timestamps: true
  }
);

collectionSchema.plugin(AutoIncrement, {
  id: 'collection_seq',
  inc_field: 'seq_no',
  start_seq: 0
});

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
