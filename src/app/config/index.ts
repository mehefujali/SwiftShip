import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  frontend_url: process.env.FRONTEND_URL,
  mongo_uri: process.env.MONGO_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_exp: process.env.JWT_ACCESS_EXP,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_exp: process.env.JWT_REFRESH_EXP,
};
