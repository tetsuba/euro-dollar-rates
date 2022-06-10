// middleware.js

/* Note:
 * Removing the next argument breaks middleware from running
 *  */
export function errorHandler (error, request, response, next) {
  const { name, statusCode, message } = error
  let json = {name, statusCode, message}
  response.status(statusCode).json(json)
}


// const errorLogger = (err, req, res, next) => {
//   console.error('\x1b[31m', err) // adding some color to our logs
//   next(err) // calling next middleware
// }
//
// export const errorResponder = (err, req, res, next) => {
//   console.log('errorResponder')
//
//   res.header("Content-Type", 'application/json')
//   res.status(err.statusCode).send(JSON.stringify(err, null, 4)) // pretty print
// }
// const invalidPathHandler = (req, res, next) => {
//   res.redirect('/error')
// }