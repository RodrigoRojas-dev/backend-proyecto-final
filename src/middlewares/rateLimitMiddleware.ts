import rateLimit from "express-rate-limit"

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,// 1 minutos,
  max: 30,
  handler: (req, res, next, options) => {
    res.status(429).json({
      success: false,
      error: `Limite alcanzado ${options.max} solicitudes cada ${options.windowMs / 1000 / 60} minutos.`
    })
  }
})

export { limiter }