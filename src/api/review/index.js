import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Review, { schema } from './model'

const router = new Router()
const { place, rating, comment } = schema.tree

/**
 * @api {post} /Reviews Create review
 * @apiName CreateReview
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rating review's rating.
 * @apiParam comment review's comment.
 * @apiSuccess {Object} review review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 review not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ place, rating, comment }),
  create)

/**
 * @api {get} /Reviews Retrieve reviews
 * @apiName RetrieveReviews
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} reviews List of reviews.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /Reviews/:id Retrieve review
 * @apiName RetrieveReview
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} review review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 review not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /Reviews/:id Update review
 * @apiName UpdateReview
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam rating review's rating.
 * @apiParam comment review's comment.
 * @apiSuccess {Object} review review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 review not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ place, rating, comment }),
  update)

/**
 * @api {delete} /Reviews/:id Delete review
 * @apiName DeleteReview
 * @apiGroup review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 review not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
