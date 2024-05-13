import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AutoIncrement = require('mongoose-sequence')(mongoose);

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

itemSchema.plugin(AutoIncrement, {
  id: 'item_seq',
  inc_field: 'seq_no',
  start_seq: 0
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
