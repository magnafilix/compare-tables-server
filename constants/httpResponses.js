//---> 2xx
const OK = { code: 200, message: 'OK' }
const Created = { code: 201, message: 'Created' }
const NoContent = { code: 204, message: 'No Content' }

//---> 4xx
const BadRequest = { code: 400, message: 'Bad Request' }
const NotFound = { code: 404, message: 'NotFound' }
const UnprocessableEntity = { code: 422, message: 'Unprocessable Entity' }

//---> 5xx
const InternalServerError = { code: 500, message: 'Internal Server Error' }

module.exports = {
  OK,
  Created,
  NoContent,
  BadRequest,
  NotFound,
  UnprocessableEntity,
  InternalServerError
}