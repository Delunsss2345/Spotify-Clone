class ResponseHelper {
  static success(res, statusCode = 200, data = null, message = 'Success') {
    return res.status(statusCode).json({
      success: true,
      data , 
      message
    });
  }

  static error(res, statusCode = 400, message = 'Bad Request', errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors })
    });
  }
} // Tạo lớp kế thừa 


const extendResponse = (req, res, next) => {
  res.success = (statusCode, data, message) => 
    ResponseHelper.success(res, statusCode, data, message);
  
  res.error = (statusCode, message, errors) => 
    ResponseHelper.error(res, statusCode, message, errors);
  
  next();
}; // Middleware thêm success 


module.exports = { ResponseHelper, extendResponse };