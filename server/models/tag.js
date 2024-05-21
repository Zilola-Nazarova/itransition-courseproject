import mongoose from 'mongoose';

const tagSchema = mongoose.Schema(
  {
    tagname: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
