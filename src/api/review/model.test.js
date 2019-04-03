import { Review } from '.'
import { User } from '../user'

let user, review

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  review = await Review.create({ user, rating: 'test', comment: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = review.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(review.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.rating).toBe(review.rating)
    expect(view.comment).toBe(review.comment)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = review.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(review.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.rating).toBe(review.rating)
    expect(view.comment).toBe(review.comment)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
