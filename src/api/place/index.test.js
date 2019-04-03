import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Place } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, place

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  place = await Place.create({})
})

test('POST /Places 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', address: 'test', category: 'test', reviews: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.reviews).toEqual('test')
})

test('POST /Places 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /Places 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /Places 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /Places/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${place.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(place.id)
})

test('GET /Places/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /Places/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${place.id}`)
    .send({ access_token: adminSession, name: 'test', address: 'test', category: 'test', reviews: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(place.id)
  expect(body.name).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.reviews).toEqual('test')
})

test('PUT /Places/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${place.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /Places/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${place.id}`)
  expect(status).toBe(401)
})

test('PUT /Places/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', address: 'test', category: 'test', reviews: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Places/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${place.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /Places/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${place.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /Places/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${place.id}`)
  expect(status).toBe(401)
})

test('DELETE /Places/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
