import { Place } from '.'

let place

beforeEach(async () => {
  place = await Place.create({ name: 'test', address: 'test', category: 'test', reviews: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = place.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(place.id)
    expect(view.name).toBe(place.name)
    expect(view.address).toBe(place.address)
    expect(view.category).toBe(place.category)
    expect(view.reviews).toBe(place.reviews)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = place.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(place.id)
    expect(view.name).toBe(place.name)
    expect(view.address).toBe(place.address)
    expect(view.category).toBe(place.category)
    expect(view.reviews).toBe(place.reviews)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
