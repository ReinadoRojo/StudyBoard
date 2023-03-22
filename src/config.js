require('dotenv').config();

module.exports = {
  "mongoURI": process.env.MONGO_URI || 'mongodb://localhost:27017/edunline',
  "sessions_secret": process.env.SESSION_SECRET || '":eDwuNTNW9Cq]kD0U+NDPT#I<7V;H1mz:x${$5S8rOAszf+qDr9L`~7UQ/ee[f',
  "jwtSecret": process.env.JWT_SECRET || ":47AD=tfk0`+2M~|O;72!k)JyV%bwX*!V#lJOd@V(y[OF7&~;s(qgq!d:Wa6J>P",
  "port": process.env.PORT || 3000,
  "jwtExpiration": process.env.JWT_EXPIRATION || 1000 * 60 * 60 * 24 * 90,
  "sessionsMaxAge": process.env.SESSIONS_MAX_AGE || 1000 * 60 * 60 * 24 * 30 * 12 * 10,
}