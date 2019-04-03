import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  place: {
    type: Schema.ObjectId,
    ref: 'Place',
    required: true,
    index: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  comment: {
    type: String,
    maxLength: 500,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

reviewSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      place: this.place.view(full),
      rating: this.rating,
      comment: this.comment,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('review', reviewSchema)

export const schema = model.schema
export default model
