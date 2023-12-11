import mongoose, { Schema, model } from 'mongoose'

import { dev } from '../config'
import { IUsers } from '../types/userTypes'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please Enter the name'],
      trim: true,
      minlength: [3, ' name at least 3 character'],
      maxlength: [30, ' name at most 30 charchter'],
    },
    email: {
      type: String,
      required: [true, 'please Enter the email'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        message: 'Please Enter valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'please Enter the password'],
      trim: true,
      minlength: [6, 'password at least 6 character'],
    },
    image: {
      type: String,
      default: dev.app.defaultImagePath,
    },
    address: {
      type: String,
      required: [true, 'please Enter the address'],
      trim: true,
      minlength: [3, ' address at least 3 character'],
    },
    phone: {
      type: String,
      required: [true, 'please Enter the phone'],
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

//name of schema in mongo (products , users)
export const User = model<IUsers>('users', userSchema)
