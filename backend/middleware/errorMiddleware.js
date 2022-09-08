// this is not found handler middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
// this is error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
// middleware is function that has access to request & response objects
//this is example of a custom middleware, it runs prints everytime we made a request & get response
// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   console.log("wwe")
//   next()
// });
