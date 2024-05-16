import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
