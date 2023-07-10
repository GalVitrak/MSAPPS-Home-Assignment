import logger from "../Utils/logger.js";
import appConfig from "../Utils/app-config.js";

function catchAll(err, request, response, next) {
  logger.logError(err);

  const status = err.status || 500;

  // Always log server errors:
  if (status === 500) {
    logger.logError("Catch All error", err);
  }

  // Return original error only on development:
  const message =
    appConfig.isDevelopment || status !== 500
      ? err.message
      : "Some error occurred, please try again later";
  logger.logError(err);

  response.status(status).send(message);
}

export default catchAll;
