import logger from "../Utils/logger.js";

function logRequest(request, response, next) {
  logger.logActivity(
    `Request Method: ${request.method}, Request Route: ${request.originalUrl}`
  );
  next();
}

export default logRequest;
