const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); //Ôm quanh hàm có async
};

module.exports = asyncHandler ;