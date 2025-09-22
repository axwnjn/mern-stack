import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-list-key");
    if (!success) {
      return res.status(429).json({
        message: "too many requests, please try again later",
      });
    }
    next();
  } catch (error) {
    res.status(500).json("Rate limit error", error);
    next(error);
  }
};

export default ratelimiter;
