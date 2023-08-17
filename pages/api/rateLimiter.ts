import { NextApiRequest, NextApiResponse } from "next";

let requests: { [key: string]: { lastRequest: number; count: number } } = {};

const RATE_LIMIT_COUNT = 3; // Number of requests
const RATE_LIMIT_TIME = 10000; // Time window in ms (10 seconds)

export const rateLimiter = (req: NextApiRequest, res: NextApiResponse) => {
  const now = Date.now();
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // If ip is an array, use the first address
  if (Array.isArray(ip)) {
    ip = ip[0];
  }

  // If ip is undefined or not a string, handle the error
  if (typeof ip !== "string") {
    res.status(500).send("Error processing request IP.");
    return false;
  }

  if (!requests[ip]) {
    requests[ip] = { lastRequest: now, count: 1 };
  } else {
    if (now - requests[ip].lastRequest < RATE_LIMIT_TIME) {
      if (requests[ip].count >= RATE_LIMIT_COUNT) {
        res.status(429).send("Too many requests. Please wait and try again.");
        return false;
      } else {
        requests[ip].count += 1;
      }
    } else {
      requests[ip] = { lastRequest: now, count: 1 };
    }
  }

  return true;
};
