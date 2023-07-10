import fs from "fs/promises";

// Log error:
function logError(message, err) {
  const now = new Date();
  let msgToLog = now.toUTCString() + "\n";
  msgToLog += message + "\n";
  if (typeof err === "string") msgToLog += err + "\n"; // E.g. throw new "Blah..." in some internal library.
  if (err?.stack) msgToLog += `Stack: ${err.stack}\n`;
  msgToLog +=
    "----------------------------------------------------------------------------------------------------\n";
  fs.appendFile("./logger.txt", msgToLog, () => {}); // Do nothing if fail to log.
}

// Log activity:
function logActivity(message) {
  const now = new Date();
  let msgToLog = now.toUTCString() + "\n";
  msgToLog += message + "\n";
  msgToLog +=
    "----------------------------------------------------------------------------------------------------\n";
  fs.appendFile("./activitiesLogger.txt", msgToLog, () => {}); // Do nothing if fail to log.
}

export default {
  logError,
  logActivity,
};
