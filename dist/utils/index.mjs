// src/utils/errorLogger.ts
var isDevelopment = () => {
  if (typeof __DEV__ !== "undefined") return __DEV__;
  if (typeof process !== "undefined" && process.env?.NODE_ENV) {
    return process.env.NODE_ENV !== "production";
  }
  return true;
};
var logError = ({ message, error, context }) => {
  if (isDevelopment()) {
    console.error("Error:", message);
    console.error("Details:", error);
    if (context) {
      console.error("Context:", context);
    }
  }
};

// src/utils/notificationMapper.ts
var mapNotificationType = (apiType) => {
  switch (apiType.toLowerCase()) {
    case "info":
    case "information":
      return "info";
    case "warning":
    case "warn":
      return "warning";
    case "error":
    case "danger":
      return "error";
    case "success":
      return "success";
    default:
      return "info";
  }
};

// src/utils/transformations.ts
var transformDniToNumber = (dni) => {
  return Number(dni.replace(/\./g, ""));
};
var transformDniToString = (dni) => {
  const dniStr = dni.toString().padStart(8, "0");
  return `${dniStr.slice(0, 2)}.${dniStr.slice(2, 5)}.${dniStr.slice(5)}`;
};
export {
  logError,
  mapNotificationType,
  transformDniToNumber,
  transformDniToString
};
//# sourceMappingURL=index.mjs.map