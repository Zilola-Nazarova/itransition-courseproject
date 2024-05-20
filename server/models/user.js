import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username field can not be empty']
    },
    email: {
      type: String,
      required: [true, 'Email field can not be empty']
    },
    password: {
      type: String,
      required: [true, 'Password field can not be empty']
    },
    role: {
      type: String,
      enum: {
        values: ['User', 'Admin'],
        message: "Role can be only 'User' or 'Admin'"
      },
      default: 'User'
    },
    active: {
      type: Boolean,
      default: true
    },
    colls: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection'
    }],
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }],
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

userSchema.plugin(AutoIncrement, {
  id: 'user_seq',
  inc_field: 'seq_no',
  start_seq: 0
});

const User = mongoose.model('User', userSchema);

export default User;
