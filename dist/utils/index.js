"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  logError: () => logError,
  mapNotificationType: () => mapNotificationType,
  transformDniToNumber: () => transformDniToNumber,
  transformDniToString: () => transformDniToString
});
module.exports = __toCommonJS(utils_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  logError,
  mapNotificationType,
  transformDniToNumber,
  transformDniToString
});
//# sourceMappingURL=index.js.map