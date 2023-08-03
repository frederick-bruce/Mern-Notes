"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("../dist"));
const validateEnv_1 = __importDefault(require("../dist/util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = validateEnv_1.default.PORT;
mongoose_1.default
  .connect(validateEnv_1.default.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    _1.default.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .catch(console.error);
