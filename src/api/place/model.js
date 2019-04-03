import mongoose, { Schema } from 'mongoose'

const categories = ['N/A', 'Bar', 'Cafe', 'Restaurant', 'Hotel']

const placeSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: categories,
    default: 'N/A',
    index: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

placeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      address: this.address,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('place', placeSchema)

export const schema = model.schema
export default model
