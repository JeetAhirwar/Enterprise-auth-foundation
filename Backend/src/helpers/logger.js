const formatLog = (level, message, meta = {}) => {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  });
};

const logger = {
  info(message, meta = {}) {
    console.log(formatLog("info", message, meta));
  },

  warn(message, meta = {}) {
    console.warn(formatLog("warn", message, meta));
  },

  error(message, meta = {}) {
    console.error(formatLog("error", message, meta));
  },

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === "development") {
      console.debug(formatLog("debug", message, meta));
    }
  },
};

module.exports = logger;