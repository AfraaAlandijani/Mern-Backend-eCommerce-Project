import "dotenv/config";

export const dev = {
  app: {
    port: Number(process.env.PORT) || 3003,
    defaultImagePath: process.env.DEFAULT_IMAGE_PATH || 'public/images/users/default.png',
    jwtUserActivationKey: process.env.JWT_USER_ACTIVATION_KEY || 'shhhhh',
    jwtResetPasswordKey: process.env.JWT_REST_PASSWORD_KEY || 'shhhhh',
    jwtAccessKey: process.env.JWT_ACCESS_KEY || 'shhhhh',
    stmpUsername: process.env.STMP_USERNAME || 'almalki.sultana@gmail.com',
    stmpPassword: process.env.STMP_PASSWORD || 'soiuuoiu',
  },
  db: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/DB-Ecommerce-backendProject',
  },
}