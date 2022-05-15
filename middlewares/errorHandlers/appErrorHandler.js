const appError = (httpStatus,errMessage,next)=>{
  const error = new Error(errMessage);
  error.statusCode = httpStatus;
  error.isOperational = true;
  return next(error);
}

module.exports = appError;
