const ApiResponse = require("./ApiResponse");
const HTTP_STATUS = require("../constants/httpStatus");

class Response {
  static success(res, message = "Success", data = null) {
    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, message, data));
  }

  static created(res, message = "Created successfully", data = null) {
    return res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(HTTP_STATUS.CREATED, message, data));
  }

  static noContent(res) {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }
}

module.exports = Response;