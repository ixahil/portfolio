import { configDotenv } from "dotenv";
import { Redis } from "ioredis";
configDotenv();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log(`Redis connected`);
    return process.env.REDIS_URL;
  }

  throw new Error(
    "Redis connection failed: REDIS_URL environment variable is not defined."
  );
};

export const redis = new Redis(redisClient());
