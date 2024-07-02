const corsOptions = require('./CorsOptions');
const allowedCors = {
  origin: (origin, callback) => {
    if (corsOptions.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
};


module.exports = allowedCors;
