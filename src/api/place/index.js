import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Place, { schema } from './model'

const router = new Router()
const { name, address, category } = schema.tree

/**
 * @api {post} /Places Create place
 * @apiName CreatePlace
 * @apiGroup place
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name place's name.
 * @apiParam address place's address.
 * @apiParam category place's category.
 * @apiParam reviews place's reviews.
 * @apiSuccess {Object} place place's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 place not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, address, category }),
  create)

/**
 * @api {get} /Places Retrieve places
 * @apiName RetrievePlaces
 * @apiGroup place
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of places.
 * @apiSuccess {Object[]} rows List of places.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true }),
  query({category: category}),
  index)

/**
 * @api {get} /Places/:id Retrieve place
 * @apiName RetrievePlace
 * @apiGroup place
 * @apiSuccess {Object} place place's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 place not found.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /Places/:id Update place
 * @apiName UpdatePlace
 * @apiGroup place
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name place's name.
 * @apiParam address place's address.
 * @apiParam category place's category.
 * @apiParam reviews place's reviews.
 * @apiSuccess {Object} place place's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 place not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, address, category }),
  update)

/**
 * @api {delete} /Places/:id Delete place
 * @apiName DeletePlace
 * @apiGroup place
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 place not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
